import { useState } from 'react';

import { Content } from '../../components/content';
import { Menu } from '../../components/menu';
import { SortingChipses } from '../../components/sorting-chips';
import { MenuViewEnum } from '../../constants/menu-view';

import styles from './main-page.module.scss';

export const MainPage = () => {
    const [menuView, setMenuView] = useState(MenuViewEnum.window);

    return (
        <section className={styles.mainPage} data-test-id='main-page'>
            <Menu menuView={menuView} setMenuView={setMenuView} />
            <SortingChipses />
            <Content menuView={menuView} />
        </section>
    );
};
