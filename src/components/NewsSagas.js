import {call, put, takeEvery} from 'redux-saga/effects'
import axios from 'axios';

function* getUserRepositories(action) {
    const userUrl = `https://api.github.com/users/${action.payload}`;
    const payload = {
        repositories: [],
        userData:{
            success:'',
            userName:'',
            userEmail:'',
            statusText:'',
            reposUrl:'',
        }
    };

    try {
        payload.repositories = yield call(async () => {
            try {
                const response = await axios.get(userUrl);
                return response.data;
            }
            catch (error) {
                throw (error);
            }
        });
        if(!!payload.userData.success) {
            const reposUrl = payload.userData.repos_url;
            payload.userData = yield call(async () => {
                try {
                    const response = await axios.post(reposUrl);
                    return response.data;
                }
                catch (error) {
                    throw (error);
                }
            });
        }
        yield put({type: "GET_USER_NEWS_SUCCESS", payload});
    } catch (e) {
        console.log(e);
        yield put({type: "GET_USER_NEWS_FAILED", message: e.message});
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
    yield takeEvery("GET_USER_REPOSITORIES_REQUEST", getUserRepositories);

}

export default NewsSagas;
