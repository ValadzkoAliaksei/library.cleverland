import { MouseEvent, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { SORTING, Sorting } from '../../../constants/sorting';
import { useAppDispatch } from '../../../store/hooks';
import { setSortCriterion } from '../../../store/search';
import { searchSelector } from '../../../store/search/selectors';
import { Button } from '../../button';
import chevronAsc from '../assets/icon-chevron-asc.svg';
import chevronDesc from '../assets/icon-chevron-desc.svg';
import iconClose from '../assets/icon-close.svg';
import sortAsc from '../assets/sort-asc.svg';
import sortDesc from '../assets/sort-desc.svg';

import styles from './expanding-button.module.scss';

type ExpandingButtonProps = {
    menuVisible: boolean;
    setMenuVisible: (onChangeText: boolean) => void;
};

export const ExpandingButton = ({ menuVisible, setMenuVisible }: ExpandingButtonProps) => {
    const dispatch = useAppDispatch();
    const menuRef = useRef<HTMLDivElement | null>(null);
    const { sortCriteria } = useSelector(searchSelector);

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

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const closeMenu = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setMenuVisible(false);
    };

    const onOpenMenu = () => {
        setMenuVisible(true);
    };

    const onChooseSortCriterion = (event: MouseEvent, sortingCriterion: Sorting) => {
        if (sortCriteria.indexOf(sortingCriterion) === -1) {
            dispatch(setSortCriterion([...sortCriteria, sortingCriterion]));
        }
        closeMenu(event);
    };

    return (
        <div className={styles.root}>
            <Button
                classButton={classNames(styles.buttonSort)}
                dataTestId='sort-rating-button'
                onClick={onOpenMenu}
            >
                <span>Сортировка</span>
                <img src={chevronAsc} alt='icon-open' />
            </Button>
            <Button
                classButton={classNames(styles.buttonSortSmall)}
                onClick={onOpenMenu}
                dataTestId='sort-rating-button'
            >
                <img src={sortDesc} alt='icon-open' />
            </Button>

            {menuVisible && (
                <div className={styles.sortingMenu} ref={menuRef}>
                    <a
                        href=''
                        className={styles.sortingMenuHeader}
                        onClick={(event) => closeMenu(event)}
                    >
                        <span>Сортировка</span>
                        <img
                            src={chevronDesc}
                            alt='icon-open'
                            className={styles.noDisplayWhen370}
                        />
                        <img src={iconClose} alt='icon-close' className={styles.displayWhen370} />
                    </a>
                    <hr className={styles.devider} />
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
                                <hr className={styles.smallScreenDevider} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
