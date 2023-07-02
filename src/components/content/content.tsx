import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { MenuViewEnum } from '../../constants/menu-view';
import { Sorting } from '../../constants/sorting';
import { bookListRequestClean, bookListRequestWithPagination } from '../../store/books';
import {
    getBookCategories,
    getBookList,
    getIsAllBooksListDownloaded,
    getLoadingBooksList,
} from '../../store/books/selectors';
import { BookListItem } from '../../store/books/types';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchSelector } from '../../store/search/selectors';
import { Card } from '../card';

import styles from './content.module.scss';

type ContentProps = {
    menuView: string;
};

export const Content = ({ menuView }: ContentProps) => {
    const [data, setData] = useState<BookListItem[] | null>(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [pageNumber, setPageNumber] = useState(1);

    const dispatch = useAppDispatch();
    const { category } = useParams();

    const bookList = useAppSelector(getBookList);
    const isLoading = useAppSelector(getLoadingBooksList);
    const isAllDownloaded = useAppSelector(getIsAllBooksListDownloaded);
    const bookCategories = useAppSelector(getBookCategories);
    const { filter, sortCriteria } = useAppSelector(searchSelector);

    console.log(sortCriteria);

    const listClassName = classNames(
        menuView === MenuViewEnum.window ? styles.viewWindow : styles.viewList,
    );

    const createCriteriaString = (sortCriteria: Sorting[]) =>
        sortCriteria.reduce(
            (accum, criterion, index) =>
                `${accum}&sort[${index}]=${criterion.value}%3A${criterion.direction}`,
            '',
        );

    const getBooksByPagination = () => {
        console.log('Download');
        dispatch(
            bookListRequestWithPagination({
                pageNumber,
                category: category as string,
                sortingCriteria: createCriteriaString(sortCriteria),
            }),
        );
    };

    useEffect(() => {
        if (sortCriteria.length) {
            dispatch(bookListRequestClean());

            if (pageNumber === 1) {
                getBooksByPagination();
            } else {
                setPageNumber(1);
            }
            //

            /* setPageNumber(1) */
            // dispatch(bookListRequestWithPagination({ pageNumber: 1, category: category as string, sortingCriteria }));
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortCriteria]);

    useEffect(() => {
        dispatch(bookListRequestClean());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const scrollHandler = (event: any) => {
            const { innerHeight } = window;
            const { scrollTop } = event.target.documentElement;
            const { offsetHeight } = event.target.documentElement;

            if (scrollTop + innerHeight >= offsetHeight - 100 && !isLoading && !isAllDownloaded) {
                setPageNumber((currentPage) => currentPage + 1);
            }
        };

        document.addEventListener('scroll', scrollHandler);

        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    useEffect(() => {
        getBooksByPagination();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber]);

    useEffect(() => {
        if (category !== activeCategory) {
            dispatch(bookListRequestClean());

            if (pageNumber === 1) {
                getBooksByPagination();
            } else {
                setPageNumber(1);
            }
        }

        setActiveCategory(category as string);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, activeCategory]);

    useEffect(() => {
        if (bookList) {
            const searchResult =
                filter.length > 0
                    ? bookList.filter(({ title }) => title.toLowerCase().includes(filter))
                    : bookList;

            setData(searchResult);
        }
    }, [filter, bookList, activeCategory]);

    return (
        <main data-test-id='content'>
            {bookList &&
                bookCategories &&
                (data && data.length === 0 ? (
                    filter ? (
                        <div
                            className={styles.emptyDataText}
                            data-test-id='search-result-not-found'
                        >
                            По запросу ничего не найдено
                        </div>
                    ) : (
                        <div className={styles.emptyDataText} data-test-id='empty-category'>
                            В этой категории книг ещё нет
                        </div>
                    )
                ) : (
                    <ul
                        className={classNames(
                            menuView === MenuViewEnum.window ? styles.viewWindow : styles.viewList,
                            listClassName,
                        )}
                        data-test-id='cards-list'
                    >
                        {data?.map((book) => (
                            <Card data={book} key={book.id} menuView={menuView} />
                        ))}
                    </ul>
                ))}
        </main>
    );
};
