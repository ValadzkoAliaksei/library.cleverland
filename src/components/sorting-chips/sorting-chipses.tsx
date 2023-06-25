import { useSelector } from 'react-redux';

import { Sorting } from '../../constants/sorting';
import { searchSelector } from '../../store/search/selectors';

import { Chips } from './chips';

import styles from './sorting-chipses.module.scss';

export type ChipProps = {
    criterion: Sorting;
};

export const SortingChipses = () => {
    const { sortCriteria } = useSelector(searchSelector);

    return (
        <div className={styles.root}>
            {sortCriteria.map((criterion) => (
                <Chips key={criterion.description} criterion={criterion} />
            ))}
        </div>
    );
};
