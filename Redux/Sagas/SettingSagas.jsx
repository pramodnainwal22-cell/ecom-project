import { takeEvery, put } from "redux-saga/effects"
import {
    CREATE_SETTING,
    CREATE_SETTING_RED,
    GET_SETTING,
    GET_SETTING_RED,
    UPDATE_SETTING,
    UPDATE_SETTING_RED,
    DELETE_SETTING,
    DELETE_SETTING_RED
} from "../Constant"

import {
    createRecord,
    deleteRecord,
    getRecord,
    updateRecord
} from "./Services/index"

function* createSaga(action) {
    let response = yield createRecord("setting", action.payload)
    yield put({ type: CREATE_SETTING_RED, payload: response })
}

function* getSaga(action) {
    let response = yield getRecord("setting", action.payload)
    yield put({ type: GET_SETTING_RED, payload: response })
}

function* updateSaga(action) {
    yield updateRecord("setting", action.payload)
    yield put({ type: UPDATE_SETTING_RED, payload: action.payload })
}

function* deleteSaga(action) {
    yield deleteRecord("setting", action.payload)
    yield put({ type: DELETE_SETTING_RED, payload: action.payload })
}

export default function* SettingSagas() {
    yield takeEvery(CREATE_SETTING, createSaga)
    yield takeEvery(GET_SETTING, getSaga)
    yield takeEvery(UPDATE_SETTING, updateSaga)
    yield takeEvery(DELETE_SETTING, deleteSaga)
}
