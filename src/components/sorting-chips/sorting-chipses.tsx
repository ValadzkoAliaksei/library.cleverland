import { Sorting } from '../../constants/sorting';
import { useAppSelector } from '../../store/hooks';
import { searchSelector } from '../../store/search/selectors';

import { Chips } from './chips';

import styles from './sorting-chipses.module.scss';

export type ChipProps = {
    criterion: Sorting;
};

export const SortingChipses = () => {
    const { sortCriteria } = useAppSelector(searchSelector);

    return (
        <div className={styles.root}>
            {sortCriteria.map((criterion) => (
                <Chips key={criterion.description} criterion={criterion} />
            ))}
        </div>
    );
};
