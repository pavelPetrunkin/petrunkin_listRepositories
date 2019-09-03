import {call, put, takeEvery} from 'redux-saga/effects'
import {GET_USER_REPOSITORIES_SUCCESS} from "../actions/types";
import axios from 'axios';

function* getUserRepositories(action) {
    const userUrl = `https://api.github.com/users/${action.payload.userName}`;
    let payload;

    try {
        payload = yield call(async () => {
                return await axios.get(userUrl);
        });
        if(payload.status === 200) {
            const reposUrl = payload.data.repos_url;
            payload = yield call(async () => {
                    return await axios.get(reposUrl);
            });
        }

        yield put({type: GET_USER_REPOSITORIES_SUCCESS, payload});
    } catch (e) {
        console.log(e);
        yield put({type: "GET_USER_REPOSITORY_FAILED", message: e.message});
    }
}

function* searchingNews (action) {
    try {
        const payload = action.payload;
        yield put({type: "SEARCH_NEWS_SUCCESS", payload});
    } catch (e) {
        yield put({type: "SEARCH_NEWS_FAILED", message: e.message});
    }
}

function* filterNews (action) {
    try {
        const payload = action.payload;
        yield put({type: "FILTER_NEWS_SUCCESS", payload});
    } catch (e) {
        yield put({type: "FILTER_NEWS_FAILED", message: e.message});
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

function* NewsSagas() {
    yield takeEvery("SEARCH_NEWS", searchingNews);
    yield takeEvery("FILTER_NEWS", filterNews);
    yield takeEvery("CHANGE_PAGE", changePages);
    yield takeEvery("GET_USER_REQUEST", getUserRepositories);

}

export default NewsSagas;
