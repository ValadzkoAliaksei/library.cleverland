import { all, fork } from 'redux-saga/effects';

import {
    watchAuthRequest,
    watchForgotPasswordRequest,
    watchRegistrationRequest,
    watchResetPasswordRequest,
} from './auth/sagas';
import {
    watchBookCategoriesRequest,
    watchBookingDeleteRequest,
    watchBookingRequest,
    watchBookingUpdateRequest,
    watchBookListRequest,
    watchBookListRequestWithPagination,
    watchBookRequest,
    watchBookReviewRequest,
    watchBookReviewUpdate,
} from './books/sagas';
import { watchUserRequest } from './user/sagas';

export function* rootSaga() {
    yield all([
        fork(watchBookListRequest),
        fork(watchBookListRequestWithPagination),
        fork(watchBookRequest),
        fork(watchUserRequest),
        fork(watchBookCategoriesRequest),
        fork(watchAuthRequest),
        fork(watchRegistrationRequest),
        fork(watchForgotPasswordRequest),
        fork(watchResetPasswordRequest),
        fork(watchBookingRequest),
        fork(watchBookingUpdateRequest),
        fork(watchBookingDeleteRequest),
        fork(watchBookReviewRequest),
        fork(watchBookReviewUpdate),
    ]);
}
