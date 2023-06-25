import React, { useState } from 'react';
import classNames from 'classnames';

import { MenuViewEnum } from '../../constants/menu-view';
import { getBookList } from '../../store/books/selectors';
import { useAppSelector } from '../../store/hooks';
import { Button } from '../button';
import { Search } from '../search';

import displayList from './assets/icon-line.svg';
import displayListActive from './assets/icon-line-active.svg';
import displayWindow from './assets/icon-square.svg';
import displayWindowActive from './assets/icon-square-active.svg';
import { ExpandingButton } from './expanding-button';

import styles from './menu.module.scss';

export type MenyProps = {
    menuView: MenuViewEnum;
    setMenuView: (onChangeText: MenuViewEnum) => void;
};

export const Menu = ({ menuView, setMenuView }: MenyProps) => {
    const [isSearhView, setSearhView] = useState(true);
    const bookList = useAppSelector(getBookList);

    return (
        <div className={classNames(styles.menu, !isSearhView && styles.menuSearh)}>
            {bookList && (
                <React.Fragment>
                    <div
                        className={classNames(
                            styles.searchSortBlock,
                            !isSearhView && styles.searchSortBlockNoGap,
                        )}
                    >
                        <Search isSearhView={isSearhView} setSearhView={setSearhView} />

                        <ExpandingButton isSearhView={isSearhView} />
                    </div>
                    {isSearhView && (
                        <div className={styles.display}>
                            <Button
                                classButton={classNames(
                                    styles.buttonDisplay,
                                    menuView === MenuViewEnum.window && styles.buttonDisplayActive,
                                )}
                                onClick={() => {
                                    setMenuView(MenuViewEnum.window);
                                }}
                                dataTestId='button-menu-view-window'
                            >
                                <img
                                    src={
                                        menuView === MenuViewEnum.window
                                            ? displayWindowActive
                                            : displayWindow
                                    }
                                    alt='icon-window'
                                />
                            </Button>
                            <Button
                                classButton={classNames(
                                    styles.buttonDisplay,
                                    menuView === MenuViewEnum.list && styles.buttonDisplayActive,
                                )}
                                onClick={() => {
                                    setMenuView(MenuViewEnum.list);
                                }}
                                dataTestId='button-menu-view-list'
                            >
                                <img
                                    src={
                                        menuView === MenuViewEnum.list
                                            ? displayListActive
                                            : displayList
                                    }
                                    alt='icon-list'
                                />
                            </Button>
                        </div>
                    )}
                </React.Fragment>
            )}
        </div>
    );
};
