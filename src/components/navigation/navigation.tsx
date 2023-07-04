import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';

import { NAV_MENU_ALL, NAV_MENU_MAIN } from '../../constants/nav-menu-list';
import { getBookCategories, getBookList, getLoadingBooksList } from '../../store/books/selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchbookList } from '../../store/search';

import arrowBottomBlack from './assets/arrow-bottom-black.svg';
import arrowTopColor from './assets/arrow-top-color.svg';
import arrowTopColorCollapse from './assets/arrow-top-color-сollapse.svg';

import styles from './navigation.module.scss';

type NavigationProps = {
    children?: ReactNode;
    setButtonState?: Dispatch<SetStateAction<boolean>>;
    burgerMenuNavigation?: boolean;
    dataTestid?: string;
};

export const Navigation = ({
    children,
    setButtonState,
    burgerMenuNavigation = false,
    dataTestid,
}: NavigationProps) => {
    const { pathname } = useLocation();
    const { category } = useParams();
    const dispatch = useAppDispatch();

    const bookCategories = useAppSelector(getBookCategories);
    const isLoading = useAppSelector(getLoadingBooksList);

    const bookList = useAppSelector(getBookList);

    const [isMenuBook, setMenuBook] = useState(true);

    const booksCount = (cat: string) => {
        let result = 0;

        bookList?.forEach(({ categories }) => {
            if (categories.includes(cat)) {
                result += 1;
            }
        });

        return result;
    };

    useEffect(() => {
        setMenuBook(!!bookCategories && !!bookList);
    }, [bookCategories, bookList]);

    return (
        <nav className={styles.navigation} data-test-id={dataTestid}>
            <NavLink
                to={
                    category === NAV_MENU_ALL.category || !category
                        ? `/${NAV_MENU_MAIN.books.path}/${NAV_MENU_ALL.category}`
                        : `/${NAV_MENU_MAIN.books.path}/${category}`
                }
                onClick={() => bookCategories && setMenuBook(!isMenuBook)}
                className={({ isActive }) =>
                    isActive || pathname.includes(NAV_MENU_MAIN.books.path)
                        ? classNames(styles.navLink, styles.navLinkActive)
                        : styles.navLink
                }
                data-test-id={`${dataTestid}-showcase`}
            >
                {NAV_MENU_MAIN.books.name}
                {isMenuBook && (
                    <img
                        src={
                            pathname.includes(NAV_MENU_MAIN.books.path)
                                ? isMenuBook
                                    ? arrowTopColor
                                    : arrowTopColorCollapse
                                : arrowBottomBlack
                        }
                        alt='icon Arrow'
                        className={styles.navImg}
                    />
                )}
            </NavLink>
            <div
                className={classNames(
                    styles.books,
                    burgerMenuNavigation && styles.booksBurgerMenu,
                    burgerMenuNavigation && !isMenuBook && styles.booksBurgerMenuHide,
                )}
            >
                <ul
                    className={classNames(
                        burgerMenuNavigation ? styles.navBurgerMenuNavList : styles.navList,
                        !isMenuBook && styles.navListHide,
                    )}
                >
                    <li>
                        <NavLink
                            to={`/${NAV_MENU_MAIN.books.path}/${NAV_MENU_ALL.category}`}
                            className={({ isActive }) =>
                                isActive
                                    ? classNames(styles.navItem, styles.navItemActive)
                                    : styles.navItem
                            }
                            onClick={() => {
                                setButtonState?.(false);
                                dispatch(searchbookList(''));
                            }}
                            data-test-id={`${dataTestid}-books`}
                        >
                            Все книги
                        </NavLink>
                    </li>
                    {isMenuBook &&
                        bookCategories?.map(({ name, path, id, booksCount }) => (
                            <li key={id}>
                                <NavLink
                                    to={`${NAV_MENU_MAIN.books.path}/${path}`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? classNames(styles.navItem, styles.navItemActive)
                                            : styles.navItem
                                    }
                                    onClick={() => {
                                        setButtonState?.(false);
                                        dispatch(searchbookList(''));
                                    }}
                                    data-test-id={`${dataTestid}-${path}`}
                                >
                                    {name}
                                </NavLink>
                                <span
                                    className={classNames(
                                        category === pathname.split('/')[2]
                                            ? styles.textQuantityActive
                                            : styles.textQuantity,
                                    )}
                                    data-test-id={`${dataTestid}-book-count-for-${path}`}
                                >
                                    {booksCount}
                                </span>
                            </li>
                        ))}
                </ul>
            </div>

            <div
                className={classNames(
                    burgerMenuNavigation ? styles.navBurgerMenuTerms : styles.terms,
                    !isMenuBook &&
                        (burgerMenuNavigation ? styles.navBurgerMenuTermsTop : styles.termsTop),
                )}
            >
                <NavLink
                    data-test-id={`${dataTestid}-terms`}
                    to={`/${NAV_MENU_MAIN.terms.path}`}
                    onClick={() => {
                        setMenuBook(false);
                        setButtonState?.(false);
                        dispatch(searchbookList(''));
                    }}
                    className={({ isActive }) =>
                        isActive ? classNames(styles.navLink, styles.navLinkActive) : styles.navLink
                    }
                >
                    {NAV_MENU_MAIN.terms.name}
                </NavLink>
                <NavLink
                    to={`/${NAV_MENU_MAIN.contract.path}`}
                    onClick={() => {
                        setMenuBook(false);
                        setButtonState?.(false);
                        dispatch(searchbookList(''));
                    }}
                    className={({ isActive }) =>
                        isActive ? classNames(styles.navLink, styles.navLinkActive) : styles.navLink
                    }
                >
                    {NAV_MENU_MAIN.contract.name}
                </NavLink>
                {children}
            </div>
        </nav>
    );
};
