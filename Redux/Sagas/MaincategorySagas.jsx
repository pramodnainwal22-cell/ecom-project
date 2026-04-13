import { takeEvery, put } from "redux-saga/effects"
import {
    CREATE_MAINCATEGORY,
    CREATE_MAINCATEGORY_RED,
    GET_MAINCATEGORY,
    GET_MAINCATEGORY_RED,
    UPDATE_MAINCATEGORY,
    UPDATE_MAINCATEGORY_RED,
    DELETE_MAINCATEGORY,
    DELETE_MAINCATEGORY_RED
} from "../Constant"

import {
    createRecord,
    deleteRecord,
    getRecord,
    updateRecord
} from "./Services/index"

// import { createMultipartRecord,
// deleteRecord,
// getRecord,
// updateMultipartRecord } 
// from "./Services/index"


function* createSaga(action) {
    let response = yield createRecord("maincategory", action.payload)
    // let response=yield createMultipartRecord("maincategory",action.payload)
    yield put({ type: CREATE_MAINCATEGORY_RED, payload: response })
}

function* getSaga(action) {
    let response = yield getRecord("maincategory", action.payload)
    yield put({ type: GET_MAINCATEGORY_RED, payload: response })
}

function* updateSaga(action) {
    yield updateRecord("maincategory", action.payload)
    // yield updateMultipartRecord("maincategory",action.payload)
    yield put({ type: UPDATE_MAINCATEGORY_RED, payload: action.payload })

    // in case of real backend
    // let response=yield updateRecord("maincategory",action.payload)
    // let response=yield updateMultipartRecord("maincategory",action,payload)
    // yield put({UPDATE_MAINCATEGORY_RED,payload:response})
}

function* deleteSaga(action) {
    yield deleteRecord("maincategory", action.payload)
    yield put({ type: DELETE_MAINCATEGORY_RED, payload: action.payload })
}

export default function* MaincategorySagas() {
    yield takeEvery(CREATE_MAINCATEGORY, createSaga)
    yield takeEvery(GET_MAINCATEGORY, getSaga)
    yield takeEvery(UPDATE_MAINCATEGORY, updateSaga)
    yield takeEvery(DELETE_MAINCATEGORY, deleteSaga)
}
