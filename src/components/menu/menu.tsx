import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { MenuViewEnum } from '../../constants/menu-view';
import { getBookList } from '../../store/books/selectors';
import { useAppSelector } from '../../store/hooks';
import { Button } from '../button';
import { Search } from '../search';

import displayList from './assets/icon-line.svg';
import displayWindow from './assets/icon-square.svg';
import { ExpandingButton } from './expanding-button';

import styles from './menu.module.scss';

export type MenyProps = {
    menuView: MenuViewEnum;
    setMenuView: (onChangeText: MenuViewEnum) => void;
};

export const Menu = ({ menuView, setMenuView }: MenyProps) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isFilteringExpanded, setIsFilteringExpanded] = useState(false);
    const bookList = useAppSelector(getBookList);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 550) {
                if (isSearchExpanded) {
                    setIsSearchExpanded(false);
                }

                if (isFilteringExpanded) {
                    setIsFilteringExpanded(false);
                }
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={classNames(styles.menu)}>
            {bookList && (
                <React.Fragment>
                    <div className={classNames(styles.searchSortBlock)}>
                        <Search
                            isSearchExpanded={isSearchExpanded}
                            setIsSearchExpanded={setIsSearchExpanded}
                            menuVisible={menuVisible}
                        />

                        {!isSearchExpanded && (
                            <ExpandingButton
                                menuVisible={menuVisible}
                                setMenuVisible={setMenuVisible}
                            />
                        )}
                    </div>
                    {!isSearchExpanded && (
                        <div
                            className={classNames(
                                styles.display,
                                menuVisible && styles.noDisplayWhen640,
                            )}
                        >
                            <label className={styles.bookingContainer}>
                                <input type='checkbox' className={styles.bookingCheckbox} />
                                <span className={styles.bookingLabel}>Скрыть бронь</span>
                            </label>
                            <Button
                                classButton={styles.buttonDisplay}
                                onClick={() => {
                                    setMenuView(
                                        menuView === MenuViewEnum.list
                                            ? MenuViewEnum.window
                                            : MenuViewEnum.list,
                                    );
                                }}
                                dataTestId='button-menu-view-list'
                            >
                                <img
                                    src={
                                        menuView === MenuViewEnum.list ? displayWindow : displayList
                                    }
                                    alt='icon-view'
                                />
                            </Button>
                        </div>
                    )}
                </React.Fragment>
            )}
        </div>
    );
};
