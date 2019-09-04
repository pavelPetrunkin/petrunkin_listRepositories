import {call, put, takeEvery} from 'redux-saga/effects'
import {GET_USER_REPOSITORIES_SUCCESS} from "../actions/types";
import axios from 'axios';

function* getUserRepositories(action) {
    const userUrl = `https://api.github.com/users/${action.payload.userName}`;
    const payload = {};

    try {
        payload.userInfo = yield call(axios.get,userUrl);
        if(payload.userInfo.status === 200) {
            const orgUrl = payload.userInfo.data.organizations_url;
            const reposUrl = payload.userInfo.data.repos_url;
            payload.userRepositories = yield call(axios.get,reposUrl);
            payload.orgRepositories = yield call(axios.get,orgUrl);
        }

        yield put({type: GET_USER_REPOSITORIES_SUCCESS, payload});
    } catch (e) {
        yield put({type: "GET_USER_REPOSITORIES_FAILED", e});
    }
}

function* searchingRepositories (action) {
    try {
        const payload = action.payload;
        yield put({type: "SEARCH_REPOSITORIES_SUCCESS", payload});
    } catch (e) {
        yield put({type: "SEARCH_REPOSITORIES_FAILED", message: e.message});
    }
}

function* filterRepositories (action) {
    try {
        const payload = action.payload;
        yield put({type: "FILTER_REPOSITORIES_SUCCESS", payload});
    } catch (e) {
        yield put({type: "FILTER_REPOSITORIES_FAILED", message: e.message});
    }
}

function* changePages (action) {
    try {
        const payload = action.payload;
        yield put({type: "CHANGE_PAGE_SUCCESS", payload});
    } catch (e) {
        yield put({type: "CHANGE_PAGE_FAILED", message: e.message});
    }
}

function* RepositorySagas() {
    yield takeEvery("SEARCH_REPOSITORIES", searchingRepositories);
    yield takeEvery("FILTER_REPOSITORIES", filterRepositories);
    yield takeEvery("CHANGE_PAGE", changePages);
    yield takeEvery("GET_USER_REQUEST", getUserRepositories);

}

export default RepositorySagas;
