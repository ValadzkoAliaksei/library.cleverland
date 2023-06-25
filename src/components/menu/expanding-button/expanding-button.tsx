import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { SORTING } from '../../../constants/sorting';
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
    // const dispatch = useAppDispatch();

    const [menuVisible, setMenuVisible] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);

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
                    <div className={styles.sortingMenuHeader}>
                        <span className={styles.buttonSortText}>Сортировка</span>
                        <img src={chevronDesc} alt='icon-open' />
                    </div>
                    <hr />
                    <ul>
                        {SORTING.map((sortingCriterion) => (
                            <li>
                                <span>{sortingCriterion.title}</span>
                                <img
                                    src={sortingCriterion.direction === 'asc' ? sortAsc : sortDesc}
                                    alt='icon-sort'
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Button>
    );
};
