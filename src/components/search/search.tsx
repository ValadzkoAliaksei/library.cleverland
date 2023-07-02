import { useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch } from '../../store/hooks';
import { searchbookList } from '../../store/search';
import { Button } from '../button';

import iconClose from './assets/icon-close.svg';
import iconSearch from './assets/icon-search.svg';

import styles from './search.module.scss';

type SearchProps = {
    isSearchExpanded: boolean;
    setIsSearchExpanded: (onChangeText: boolean) => void;
    menuVisible: boolean;
};

export const Search = ({ isSearchExpanded, setIsSearchExpanded, menuVisible }: SearchProps) => {
    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setValue(target.value.trimStart());
        dispatch(searchbookList(target.value.trimStart().toLowerCase()));
    };

    return (
        <div className={classNames(styles.search, menuVisible && styles.noDisplayWhen370)}>
            <Button
                classButton={classNames(
                    styles.searchButton,
                    isSearchExpanded && styles.buttonHidden,
                )}
                onClick={() => setIsSearchExpanded(true)}
                dataTestId='button-search-open'
            >
                <img src={iconSearch} alt='icon-search' />
            </Button>
            <input
                className={classNames(styles.input, isSearchExpanded && styles.elementShow)}
                placeholder='Поиск книги или автора…'
                value={value}
                onChange={handleChange}
                data-test-id='input-search'
            />
            <Button
                classButton={classNames(
                    styles.searchButtonClose,
                    !isSearchExpanded && styles.buttonHidden,
                )}
                onClick={() => setIsSearchExpanded(false)}
                dataTestId='button-search-close'
            >
                <img src={iconClose} alt='icon-close' />
            </Button>
        </div>
    );
};
