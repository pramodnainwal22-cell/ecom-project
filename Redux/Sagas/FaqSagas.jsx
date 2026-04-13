import { takeEvery, put } from "redux-saga/effects"
import {
    CREATE_FAQ,
    CREATE_FAQ_RED,
    GET_FAQ,
    GET_FAQ_RED,
    UPDATE_FAQ,
    UPDATE_FAQ_RED,
    DELETE_FAQ,
    DELETE_FAQ_RED
} from "../Constant"

import {
    createRecord,
    deleteRecord,
    getRecord,
    updateRecord
} from "./Services/index"


function* createSaga(action) {
    let response = yield createRecord("faq", action.payload)
    yield put({ type: CREATE_FAQ_RED, payload: response })
}

function* getSaga(action) {
    let response = yield getRecord("faq", action.payload)
    yield put({ type: GET_FAQ_RED, payload: response })
}

function* updateSaga(action) {
    yield updateRecord("faq", action.payload)
    yield put({ type: UPDATE_FAQ_RED, payload: action.payload })
}

function* deleteSaga(action) {
    yield deleteRecord("faq", action.payload)
    yield put({ type: DELETE_FAQ_RED, payload: action.payload })
}

export default function* FaqSagas() {
    yield takeEvery(CREATE_FAQ, createSaga)
    yield takeEvery(GET_FAQ, getSaga)
    yield takeEvery(UPDATE_FAQ, updateSaga)
    yield takeEvery(DELETE_FAQ, deleteSaga)
}
