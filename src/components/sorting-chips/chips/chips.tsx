import { useSelector } from 'react-redux';

import { Sorting } from '../../../constants/sorting';
import { useAppDispatch } from '../../../store/hooks';
import { setSortCriterion } from '../../../store/search';
import { searchSelector } from '../../../store/search/selectors';
import closeIcon from '../assets/icon-close.svg';

import styles from './chips.module.scss';

export type ChipProps = {
    criterion: Sorting;
};

export const Chips = ({ criterion }: ChipProps) => {
    const dispatch = useAppDispatch();
    const { sortCriteria } = useSelector(searchSelector);

    const removeCriteria = () => {
        const index = sortCriteria.indexOf(criterion);
        const newStack = [...sortCriteria];

        newStack.splice(index, 1);
        dispatch(setSortCriterion(newStack));
    };

    return (
        <div className={styles.chips}>
            <span>{criterion.description}</span>
            <button type='button' onClick={removeCriteria}>
                <img src={closeIcon} alt='icon-close' />
            </button>
        </div>
    );
};
