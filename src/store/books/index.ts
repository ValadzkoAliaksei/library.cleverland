import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
    DefaultValuesType,
    UpdateCommentPayloadType,
} from '../../components/modal-rate-book/modal-rate-book';

import {
    BookCategoriesDataType,
    BookDataType,
    BookingModalPayload,
    BookingPayload,
    BookingResponseSuccess,
    BookingUpdatePayload,
    BookListItem,
    BooksType,
} from './types';

export const initialState: BooksType = {
    bookList: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
        isAllDownloaded: false,
    },
    book: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
    },
    bookCategories: {
        isLoading: false,
        isSuccess: false,
        isError: false,
        data: null,
    },
    booking: {
        id: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        isOpenBookingModal: false,
        data: null,
        bookId: null,
        isEdit: false,
        bookingDate: null,
        message: null,
        isOnBookInfoPage: undefined,
    },
    bookReview: {
        bookId: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
        isOpenReviewModal: false,
        data: null,
        message: null,
        userId: undefined,
    },
};

export const booksSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        bookListRequest: (state) => {
            state.bookList.isLoading = true;
        },
        bookListRequestAllDownloaded: (state, action: PayloadAction<boolean>) => {
            state.bookList.isAllDownloaded = action.payload;
        },
        bookListRequestWithPagination: (state, action: PayloadAction<string>) => {
            state.bookList.isLoading = true;
        },
        bookListRequestSuccess: (state, action: PayloadAction<BookListItem[]>) => {
            state.bookList.isLoading = false;
            state.bookList.isError = false;
            state.bookList.isSuccess = true;
            state.bookList.data = action.payload;
        },
        bookListRequestWithPaginationSuccess: (state, action: PayloadAction<BookListItem[]>) => {
            state.bookList.isLoading = false;
            state.bookList.isError = false;
            state.bookList.isSuccess = true;
            state.bookList.data = state.bookList.data
                ? [...state.bookList.data, ...action.payload]
                : action.payload;
        },
        bookListRequestFailure: (state) => {
            state.bookList.isLoading = false;
            state.bookList.isError = true;
            state.bookList.isSuccess = false;
            state.bookList.data = null;
        },
        bookListRequestClean: (state) => {
            state.bookList.data = null;
        },

        bookRequest: (state, action: PayloadAction<string | number>) => {
            state.book.isLoading = true;
        },
        bookRequestSuccess: (state, action: PayloadAction<BookDataType>) => {
            state.book.isLoading = false;
            state.book.isError = false;
            state.book.isSuccess = true;
            state.book.data = action.payload;
        },
        bookRequestFailure: (state) => {
            state.book.isLoading = false;
            state.book.isError = true;
            state.book.isSuccess = false;
            state.book.data = null;
        },
        resetBookData: (state) => {
            state.book.data = null;
        },

        bookCategoriesRequest: (state) => {
            state.bookCategories.isLoading = true;
        },
        bookCategoriesSuccess: (state, action: PayloadAction<BookCategoriesDataType>) => {
            state.bookCategories.isLoading = false;
            state.bookCategories.isError = false;
            state.bookCategories.isSuccess = true;
            state.bookCategories.data = action.payload;
        },
        bookCategoriesFailure: (state) => {
            state.bookCategories.isLoading = false;
            state.bookCategories.isError = true;
            state.bookCategories.isSuccess = false;
            state.bookCategories.data = null;
        },
        toggleBookingModal: (state, { payload }: PayloadAction<BookingModalPayload>) => {
            state.booking.isOpenBookingModal = payload.showModal;
            state.booking.bookId = payload.bookId;
            state.booking.isEdit = payload.isEdit || false;
            state.booking.id = payload.bookingId || null;
            state.booking.bookingDate = payload.bookingDate || null;
            state.booking.isOnBookInfoPage = payload.isOnBookInfoPage;
        },
        bookingRequest: (state, { payload }: PayloadAction<BookingPayload>) => {
            state.booking.isLoading = true;
        },
        bookingUpdateRequest: (state, { payload }: PayloadAction<BookingUpdatePayload>) => {
            state.booking.isLoading = true;
        },
        bookingDeleteRequest: (state, action: PayloadAction<BooksType['booking']['id']>) => {
            state.booking.isLoading = true;
        },
        bookingRequestSuccess: (
            state,
            { payload }: PayloadAction<{ data: BookingResponseSuccess; message: string | null }>,
        ) => {
            state.booking.data = payload.data;
            state.booking.isLoading = false;
            state.booking.isSuccess = true;
            state.booking.isOpenBookingModal = false;
            state.booking.message = payload.message;
        },
        bookingRequestFailure: (state, action: PayloadAction<string | null>) => {
            state.booking.isLoading = false;
            state.booking.isError = true;
            state.booking.isSuccess = false;
            state.booking.data = null;
            state.booking.isOpenBookingModal = false;
            state.booking.message = action.payload;
        },
        bookingReset: (state) => {
            state.booking.id = null;
            state.booking.isLoading = false;
            state.booking.isSuccess = false;
            state.booking.isError = false;
            state.booking.data = null;
            state.booking.bookId = null;
            state.booking.isEdit = false;
            state.booking.bookingDate = null;
            state.booking.message = null;
        },
        bookReviewRequest: (state, action: PayloadAction<DefaultValuesType>) => {
            state.bookReview.isLoading = true;
            state.bookReview.isError = false;
            state.bookReview.isSuccess = false;
            state.bookReview.message = null;
        },
        bookReviewRequestSuccess: (state, { payload }) => {
            state.bookReview.isLoading = false;
            state.bookReview.isError = false;
            state.bookReview.isSuccess = true;
            state.bookReview.message = payload.message;
            state.bookReview.data = payload.data;
            state.bookReview.isOpenReviewModal = false;
        },
        bookReviewRequestFailure: (state, { payload }) => {
            state.bookReview.isLoading = false;
            state.bookReview.isError = true;
            state.bookReview.isSuccess = false;
            state.bookReview.message = payload.message;
            state.bookReview.data = null;
            state.bookReview.isOpenReviewModal = false;
        },
        bookReviewUpdateRequest: (state, action: PayloadAction<UpdateCommentPayloadType>) => {
            state.bookReview.isLoading = true;
            state.bookReview.isError = false;
            state.bookReview.isSuccess = false;
            state.bookReview.message = null;
        },
        bookReviewUpdateSuccess: (state, { payload }) => {
            state.bookReview.isLoading = false;
            state.bookReview.isError = false;
            state.bookReview.isSuccess = true;
            state.bookReview.message = payload.message;
            state.bookReview.data = payload.data;
            state.bookReview.isOpenReviewModal = false;
        },
        bookReviewUpdateFailure: (state, { payload }) => {
            state.bookReview.isLoading = false;
            state.bookReview.isError = true;
            state.bookReview.isSuccess = false;
            state.bookReview.message = payload.message;
            state.bookReview.data = null;
            state.bookReview.isOpenReviewModal = false;
        },
        toggleBookReviewModal: (
            state,
            {
                payload,
            }: PayloadAction<{ bookId: string | number | null; isOpen: boolean; userId?: number }>,
        ) => {
            state.bookReview.isOpenReviewModal = payload.isOpen;
            state.bookReview.bookId = payload.bookId;
            state.bookReview.userId = payload.userId;
        },
        alertsReset: (state) => {
            state.booking.message = null;
            state.bookReview.message = null;
            state.booking.isSuccess = false;
            state.booking.isError = false;
            state.bookReview.isError = false;
            state.bookReview.isSuccess = false;
        },
    },
});

export const {
    bookListRequest,
    bookListRequestSuccess,
    bookListRequestFailure,
    bookListRequestWithPagination,
    bookListRequestWithPaginationSuccess,
    bookListRequestAllDownloaded,
    bookListRequestClean,
    bookRequest,
    bookRequestSuccess,
    bookRequestFailure,
    resetBookData,
    bookCategoriesRequest,
    bookCategoriesSuccess,
    bookCategoriesFailure,
    toggleBookingModal,
    bookingRequest,
    bookingRequestSuccess,
    bookingRequestFailure,
    bookingUpdateRequest,
    bookingDeleteRequest,
    bookingReset,
    bookReviewRequestSuccess,
    bookReviewRequestFailure,
    bookReviewRequest,
    toggleBookReviewModal,
    alertsReset,
    bookReviewUpdateRequest,
    bookReviewUpdateSuccess,
    bookReviewUpdateFailure,
} = booksSlice.actions;
