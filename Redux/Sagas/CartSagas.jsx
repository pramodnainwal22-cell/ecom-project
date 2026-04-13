import { takeEvery, put } from "redux-saga/effects"
import {
    CREATE_CART,
    CREATE_CART_RED,
    GET_CART,
    GET_CART_RED,
    UPDATE_CART,
    UPDATE_CART_RED,
    DELETE_CART,
    DELETE_CART_RED
} from "../Constant"

import {
    createRecord,
    deleteRecord,
    getRecord,
    updateRecord
} from "./Services/index"

function* createSaga(action) {
    let response = yield createRecord("cart", action.payload)
    yield put({ type: CREATE_CART_RED, payload: response })
}

function* getSaga(action) {
    let response = yield getRecord("cart", action.payload)
    yield put({ type: GET_CART_RED, payload: response })
}

function* updateSaga(action) {
    yield updateRecord("cart", action.payload)
    yield put({ type: UPDATE_CART_RED, payload: action.payload })
}

function* deleteSaga(action) {
    yield deleteRecord("cart", action.payload)
    yield put({ type: DELETE_CART_RED, payload: action.payload })
}

export default function* CartSagas() {
    yield takeEvery(CREATE_CART, createSaga)
    yield takeEvery(GET_CART, getSaga)
    yield takeEvery(UPDATE_CART, updateSaga)
    yield takeEvery(DELETE_CART, deleteSaga)
}
