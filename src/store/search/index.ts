import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Sorting } from '../../constants/sorting';

import { SearchParams } from './types';

export const initialState: SearchParams = {
    filter: '',
    sortCriteria: [],
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchbookList: (state, action: PayloadAction<string>) => {
            state.filter = action.payload;
        },
        setSortCriterion: (state, action: PayloadAction<Sorting[]>) => {
            state.sortCriteria = action.payload;
        },
    },
});

export const { searchbookList, setSortCriterion } = searchSlice.actions;
