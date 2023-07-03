import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Sorting } from '../../constants/sorting';

import { SearchParams } from './types';

export const initialState: SearchParams = {
    filter: '',
    sortCriteria: [],
    bookingFree: false,
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
        setBookingFree: (state, action: PayloadAction<boolean>) => {
            state.bookingFree = action.payload;
        },
    },
});

export const { searchbookList, setSortCriterion, setBookingFree } = searchSlice.actions;
