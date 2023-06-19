import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '..';

export const getBookList = (state: RootState) => state.books.bookList.data;
export const getBookData = (state: RootState) => state.books.book.data;
export const getBookDataState = (state: RootState) => state.books.book;
export const getLoadingBooksList = (state: RootState) => state.books.bookList.isLoading;
export const getIsAllBooksListDownloaded = (state: RootState) =>
    state.books.bookList.isAllDownloaded;
export const getLoadingBook = (state: RootState) => state.books.book.isLoading;
export const getLoadingBookCategories = (state: RootState) => state.books.bookCategories.isLoading;
export const getIsLoadingBooksRequests = createSelector(
    getLoadingBooksList,
    getLoadingBook,
    getLoadingBookCategories,
    (loadingBooksList, loadingBook, loadingBookCategories) =>
        loadingBooksList || loadingBook || loadingBookCategories,
);

export const getBookDetails = (state: RootState) => ({
    publisher: state.books.book.data?.publish,
    year: state.books.book.data?.issueYear,
    pages: state.books.book.data?.pages,
    binding: state.books.book.data?.cover,
    size: state.books.book.data?.format,
    categories: state.books.book.data?.categories,
    weight: state.books.book.data?.weight,
    ISBN: state.books.book.data?.ISBN,
    manufacturer: state.books.book.data?.producer,
});

export const getBookCategories = (state: RootState) => state.books.bookCategories.data;

export const booksSelector = (state: RootState) => state.books;

export const bookingSelector = (state: RootState) => state.books.booking;

export const bookReviewSelector = (state: RootState) => state.books.bookReview;
