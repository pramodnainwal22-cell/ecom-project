import { takeEvery, put } from "redux-saga/effects"
import {
    CREATE_FEATURE,
    CREATE_FEATURE_RED,
    GET_FEATURE,
    GET_FEATURE_RED,
    UPDATE_FEATURE,
    UPDATE_FEATURE_RED,
    DELETE_FEATURE,
    DELETE_FEATURE_RED
} from "../Constant"

import {
    createRecord,
    deleteRecord,
    getRecord,
    updateRecord
} from "./Services/index"
  
function* createSaga(action) {
    let response = yield createRecord("feature", action.payload)
    yield put({ type: CREATE_FEATURE_RED, payload: response })
}

function* getSaga(action) {
    let response = yield getRecord("feature", action.payload)
    yield put({ type: GET_FEATURE_RED, payload: response })
}

function* updateSaga(action) {
    yield updateRecord("feature", action.payload)
    yield put({ type: UPDATE_FEATURE_RED, payload: action.payload })
}

function* deleteSaga(action) {
    yield deleteRecord("feature", action.payload)
    yield put({ type: DELETE_FEATURE_RED, payload: action.payload })
}

export default function* FeatureSagas() {
    yield takeEvery(CREATE_FEATURE, createSaga)
    yield takeEvery(GET_FEATURE, getSaga)
    yield takeEvery(UPDATE_FEATURE, updateSaga)
    yield takeEvery(DELETE_FEATURE, deleteSaga)
}
