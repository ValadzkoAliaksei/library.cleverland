import { Comment } from '../user/types';

export type BooksType = {
    bookList: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        data: null | BookListItem[];
        isAllDownloaded: boolean;
    };
    book: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        data: null | BookDataType;
    };
    bookCategories: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        data: null | BookCategoriesDataType;
    };
    booking: {
        id: string | null | number;
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        isOpenBookingModal: boolean;
        data: BookingResponseSuccess | null;
        bookId: null | string | number;
        isEdit: boolean;
        bookingDate: null | string;
        message: string | null;
        isOnBookInfoPage?: boolean;
    };
    bookReview: {
        bookId: string | null | number;
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        isOpenReviewModal: boolean;
        data: BookRateSuccess | null;
        message: string | null;
        userId?: number;
    };
};

export type BookListItem = {
    issueYear: string;
    rating: number;
    title: string;
    authors: string[];
    image: {
        url: string;
    };
    categories: string[];
    id: number;
    booking: {
        id: number;
        order: boolean;
        dateOrder: string;
        customerId: number;
    };
    delivery: {
        id: number;
        handed: boolean;
        dateHandedFrom: string;
        dateHandedTo: string;
        recipientId: number;
    };
    histories: [
        {
            id: number;
            userId: number;
        },
    ];
};

export type BookDataType = {
    id: number;
    title: string;
    rating: number;
    issueYear: string;
    description: string;
    publish: string;
    pages: string;
    cover: string;
    weight: string;
    format: string;
    ISBN: string;
    producer: string;
    authors: string[];
    images: [
        {
            url: string;
        },
    ];
    categories: string[];
    comments: Comment[];

    booking: {
        id: number;
        order: boolean;
        dateOrder: string;
        customerId: number;
    };
    delivery: {
        id: number;
        handed: boolean;
        dateHandedFrom: string;
        dateHandedTo: string;
        recipientId: number;
    };
    histories: [
        {
            id: number;
            userId: number;
        },
    ];
};

export type BookCategoriesItem = {
    name: string;
    path: string;
    id: number;
    booksCount: number;
};

export type BookingModalPayload = {
    showModal: boolean;
    bookId: string | null | number;
    isEdit?: boolean;
    bookingId?: string | null | number;
    bookingDate?: string | null;
    isOnBookInfoPage?: boolean;
};

export type BookCategoriesDataType = BookCategoriesItem[];

export type BookingResponseSuccess = {
    id: number | string;
    attributes: {
        order: true;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        dateOrder: string;
    };
};

export type BookingPayload = { dateOrder: string | Date; bookId: string | number | null };

export type BookingUpdatePayload = BookingPayload & { bookingId: string | number | null };

export type BookRateSuccess = {
    id: number | string;
    attributes: {
        rating: number | string;
        text: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
};
