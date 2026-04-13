import { takeEvery, put } from "redux-saga/effects"
import {
    CREATE_WISHLIST,
    CREATE_WISHLIST_RED,
    GET_WISHLIST,
    GET_WISHLIST_RED,
    UPDATE_WISHLIST,
    UPDATE_WISHLIST_RED,
    DELETE_WISHLIST,
    DELETE_WISHLIST_RED
} from "../Constant"

import {
    createRecord,
    deleteRecord,
    getRecord,
    updateRecord
} from "./Services/index"

// -------------------- WISHLIST Sagas --------------------
function* createSaga(action) {
    let response = yield createRecord("wishlist", action.payload)
    yield put({ type: CREATE_WISHLIST_RED, payload: response })
}

function* getSaga(action) {
    let response = yield getRecord("wishlist", action.payload)
    yield put({ type: GET_WISHLIST_RED, payload: response })
}

function* updateSaga(action) {
    yield updateRecord("wishlist", action.payload)
    yield put({ type: UPDATE_WISHLIST_RED, payload: action.payload })
}

function* deleteSaga(action) {
    yield deleteRecord("wishlist", action.payload)
    yield put({ type: DELETE_WISHLIST_RED, payload: action.payload })
}

export default function* WishlistSagas() {
    yield takeEvery(CREATE_WISHLIST, createSaga)
    yield takeEvery(GET_WISHLIST, getSaga)
    yield takeEvery(UPDATE_WISHLIST, updateSaga)
    yield takeEvery(DELETE_WISHLIST, deleteSaga)
}
