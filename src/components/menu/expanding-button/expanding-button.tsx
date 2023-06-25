import { MouseEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { SORTING, Sorting } from '../../../constants/sorting';
import { useAppDispatch } from '../../../store/hooks';
import { setSortCriterion } from '../../../store/search';
import { searchSelector } from '../../../store/search/selectors';
import { Button } from '../../button';
import chevronAsc from '../assets/icon-chevron-asc.svg';
import chevronDesc from '../assets/icon-chevron-desc.svg';
import sortAsc from '../assets/sort-asc.svg';
import sortDesc from '../assets/sort-desc.svg';

import styles from './expanding-button.module.scss';

type ExpandingButtonProps = {
    isSearhView: boolean;
};

export const ExpandingButton = ({ isSearhView }: ExpandingButtonProps) => {
    const dispatch = useAppDispatch();
    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const { sortCriteria } = useSelector(searchSelector);

    const closeMenu = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setMenuVisible(false);
    };

    const onChooseSortCriterion = (event: MouseEvent, sortingCriterion: Sorting) => {
        if (sortCriteria.indexOf(sortingCriterion) === -1) {
            dispatch(setSortCriterion([...sortCriteria, sortingCriterion]));
        }
        closeMenu(event);
    };

    useEffect(() => {
        function handleClickOutside(event: any) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Button
            classButton={classNames(styles.buttonSort, !isSearhView && styles.buttonHidden)}
            onClick={() => setMenuVisible(true)}
            dataTestId='sort-rating-button'
        >
            <span className={styles.buttonSortText}>Сортировка</span>
            <img src={chevronAsc} alt='icon-open' />
            {menuVisible && (
                <div className={styles.sortingMenu} ref={menuRef}>
                    <a
                        href=''
                        className={styles.sortingMenuHeader}
                        onClick={(event) => closeMenu(event)}
                    >
                        <span className={styles.buttonSortText}>Сортировка</span>
                        <img src={chevronDesc} alt='icon-open' />
                    </a>
                    <hr />
                    <ul>
                        {SORTING.map((sortingCriterion) => (
                            <li key={sortingCriterion.description}>
                                <a
                                    href=''
                                    onClick={(event) =>
                                        onChooseSortCriterion(event, sortingCriterion)
                                    }
                                >
                                    <span>{sortingCriterion.title}</span>
                                    <img
                                        src={
                                            sortingCriterion.direction === 'asc'
                                                ? sortAsc
                                                : sortDesc
                                        }
                                        alt='icon-sort'
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Button>
    );
};
