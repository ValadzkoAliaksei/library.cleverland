import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { searchbookList } from '../../store/search';
import { searchSelector } from '../../store/search/selectors';
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
    const dispatch = useAppDispatch();
    const { filter } = useAppSelector(searchSelector);
    const [value, setValue] = useState('');

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        setValue(target.value.trimStart());
    };

    const handleSearch = () => {
        dispatch(searchbookList(value.toLowerCase()));
    };

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(event);
        if (event.key === 'Enter') {
            dispatch(searchbookList(value.toLowerCase()));
        }
    };

    useEffect(() => {
        setValue(filter);
    }, [filter]);

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
                onKeyDown={handleEnterPress}
                data-test-id='input-search'
            />
            <Button
                classButton={classNames(
                    styles.searchButtonSend,
                    isSearchExpanded && styles.searchButtonSendShow,
                )}
                onClick={handleSearch}
            >
                &nbsp;
            </Button>
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
