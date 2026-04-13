import { takeEvery, put } from "redux-saga/effects"
import {
    CREATE_CONTACT_US,
    CREATE_CONTACT_US_RED,
    GET_CONTACT_US,
    GET_CONTACT_US_RED,
    UPDATE_CONTACT_US,
    UPDATE_CONTACT_US_RED,
    DELETE_CONTACT_US,
    DELETE_CONTACT_US_RED
} from "../Constant"

import {
    createRecord,
    deleteRecord,
    getRecord,
    updateRecord
} from "./Services/index"

// -------------------- CONTACT_US Sagas --------------------
function* createSaga(action) {
    let response = yield createRecord("contactus", action.payload)
    yield put({ type: CREATE_CONTACT_US_RED, payload: response })
}

function* getSaga(action) {
    let response = yield getRecord("contactus", action.payload)
    yield put({ type: GET_CONTACT_US_RED, payload: response })
}

function* updateSaga(action) {
    yield updateRecord("contactus", action.payload)
    yield put({ type: UPDATE_CONTACT_US_RED, payload: action.payload })
}

function* deleteSaga(action) {
    yield deleteRecord("contactus", action.payload)
    yield put({ type: DELETE_CONTACT_US_RED, payload: action.payload })
}

export default function* ContactUsSagas() {
    yield takeEvery(CREATE_CONTACT_US, createSaga)
    yield takeEvery(GET_CONTACT_US, getSaga)
    yield takeEvery(UPDATE_CONTACT_US, updateSaga)
    yield takeEvery(DELETE_CONTACT_US, deleteSaga)
}
