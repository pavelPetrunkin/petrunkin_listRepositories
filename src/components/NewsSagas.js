import {call, put, takeEvery} from 'redux-saga/effects'
import axios from 'axios';

const serverUrl = 'http://192.168.2.135:3000/';

function* getAllNews() {
    const newsUrl = serverUrl + 'news';
    const userUrl = serverUrl+'users';
    const payload = {};
    try {
        payload.news = yield call(async () => {
            try {
                const response = await axios.get(newsUrl);
                return response.data;
            }
            catch (error) {
                throw (error);
            }
        });
        const token = localStorage.getItem('token');
        if(!!token) {
            payload.userData = yield call(async () => {
                try {
                    const response = await axios.post(userUrl, { token: token });
                    return response.data;
                }
                catch (error) {
                    throw (error);
                }
            });
        } else {
            payload.userData = {
                requestSuccess: '',
                userName: '',
                userEmail: '',
                avatar: '',
                password: '',
                userId: '',
            }
        }


        yield put({type: "GET_NEWS_SUCCESS", payload});

    } catch (e) {
        yield put({type: "GET_NEWS_FAILED", message: e.message});
    }
}

function* getUserNews(action) {
    const userUrl = serverUrl+'users';
    const newsUrl = serverUrl+`news/${action.payload}`;
    const payload = {
        news: [],
        userData:{
            userName:'',
            userEmail:'',
            statusText:'',
            password:'',
            avatar: '',
            userId:''

        }
    };

    try {
        payload.news = yield call(async () => {
            try {
                const response = await axios.get(newsUrl);
                return response.data;
            }
            catch (error) {
                throw (error);
            }
        });
        const token = localStorage.getItem('token');
        if(!!token) {
            payload.userData = yield call(async () => {
                try {
                    const response = await axios.post(userUrl, { token: token,  });
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

function* addNews(action) {
    const newsUrl = serverUrl+'news';

    try {
        const freshNews = yield call(async () => {
            try {
                const response = await axios.post(newsUrl, action.body);
                return response.data;
            }
            catch (error) {
                throw (error);
            }
        });

        const uploadUrl = serverUrl+`news/${freshNews.id}`;
        if(!!action.file){
            freshNews.image = yield call(async () => {
                try {
                    const response = await axios.post(uploadUrl, action.file, action.config);
                    return response.data;
                } catch (error) {
                    throw(error);
                }
            });
        }

        yield call(async () => {
            try {
                const response = await axios.put(uploadUrl, freshNews);
                return response.data;
            } catch (error) {
                throw(error);
            }
        });

        const payload = {};
        payload.status = freshNews.status;
        action.payload.unshift(freshNews);
        payload.news = action.payload;
        yield put({type: "ADD_NEWS_SUCCESS", payload});
    } catch (e) {
        yield put({type: "ADD_NEWS_FAILED", message: e.message});
    }
}

function* registerUserGoogle(action) {
    let apiUrl = serverUrl+'users/registrationgoogle';
    try {

        let payload = yield call(async () => {
            try {
                const response = await axios.post(apiUrl, action.payload);
                return response.data;
            }
            catch (error) {
                throw (error);
            }
        });
        if(payload.status === 'Success'){
            apiUrl = serverUrl+'users/authorizationGoogle';
            payload = yield call(async () => {
                try {
                    const response = await axios.post(apiUrl, payload);
                    return response.data;
                }
                catch (error) {
                    throw (error);
                }
            });
            if(payload.status === 'Success'){
                localStorage.setItem('token', payload.token); // INFO: Set token in local storage
            } else {
                payload = {
                    status: payload.status,
                    userName: '',
                    userEmail: '',
                    avatar: '',
                    userId: '',
                    searchText: '',
                    provider:'',
                    token:'',
                };
            }
        } else {
            payload = {
                status: payload.status,
                userName: '',
                userEmail: '',
                avatar: '',
                userId: '',
                searchText: '',
                provider:'',
                token:'',
            };
        }
        yield put({type: "REGISTER_USER_SUCCESS", payload});

    } catch (e) {
        yield put({type: "REGISTER_USER_FAILED", message: e.message});
    }
}

function* registerUser(action) {
    let apiUrl = serverUrl+'users/registrationgoogle';
    try {

        let payload = yield call(async () => {
            try {
                const response = await axios.post(apiUrl, action.payload);
                return response.data;
            }
            catch (error) {
                throw (error);
            }
        });
            if(payload.status === 'Success'){
            apiUrl = serverUrl+'users/authorization';
            payload = yield call(async () => {
                try {
                    const response = await axios.post(apiUrl, action.payload);
                    return response.data;
                }
                catch (error) {
                    throw (error);
                }
            });
            if(payload.status === 'Success'){
                localStorage.setItem('token', payload.token); // INFO: Set token in local storage
            } else {
                payload = {
                    status: payload.status,
                    userName: '',
                    userEmail: '',
                    avatar: '',
                    password: '',
                    userId: '',
                    searchText: '',
                    provider:'',
                };
            }
        } else {
            payload = {
                status: payload.status,
                userName: '',
                userEmail: '',
                avatar: '',
                password: '',
                userId: '',
                searchText: '',
                provider:'',
            };
        }
        yield put({type: "REGISTER_USER_GOOGLE_SUCCESS", payload});

    } catch (e) {
        yield put({type: "REGISTER_USER_GOOGLE_FAILED", message: e.message});
    }
}

function* logout() {
    try {
        localStorage.setItem('token', '');
        yield put({type: "LOGOUT_USER_SUCCESS"});

    } catch (e) {
        yield put({type: "LOGOUT_USER_FAILED", message: e.message});
    }
}

function* editProfile(action) {
    const newsUrl = serverUrl+'news';
    const editUserUrl = serverUrl+`users/${action.payload.userId}`;
    const userUrl = serverUrl+'users';
    try {
        if(!!action.file || action.payload.userName !== action.payload.oldName){
            if(!!action.file){
                const imageUrl = yield call(async () => {
                    try {
                        const response = await axios.post(editUserUrl, action.file,action.config);
                        return response.data;
                    }
                    catch (error) {
                        throw(error);
                    }
                });

                action.payload.avatar = imageUrl;
            }

            yield call(async () => {
                try {
                    const response = await axios.put(editUserUrl, action.payload);
                    return response.data;
                }
                catch (error) {
                    throw(error);
                }
            });

            yield call(async () => {
                try {
                    const response = await axios.put(newsUrl,action.payload);
                    return response.data;
                }
                catch (error) {
                    throw (error);
                }
            });

            const payload = {};
            payload.news = yield call(async () => {
                try {
                    const response = await axios.get(newsUrl);
                    return response.data;
                }
                catch (error) {
                    throw (error);
                }
            });

            const token = localStorage.getItem('token');
            payload.userData = yield call(async () => {
                try {
                    const response = await axios.post(userUrl, { token: token });
                    return response.data;
                }
                catch (error) {
                    throw (error);
                }
            });
            yield put({type: "EDIT_PROFILE_SUCCESS", payload});
        } else{
            const payload = {
                status: 'No changes',
            };
            yield put({type: "EDIT_PROFILE_NOCHANGES", payload});
        }



    } catch (e) {
        console.log(e);
        yield put({type: "EDIT_PROFILE_FAILED", message: e.message});
    }
}

function* authorizeUser(action) {
    const apiUrl = serverUrl+'users/authorization';
    try {
        let payload = yield call(async () => {
            try {
                const response = await axios.post(apiUrl, action.payload);
                return response.data;
            }
            catch (error) {
                throw (error);
            }
        });
        if(payload.status === 'Success'){
            localStorage.setItem('token', payload.token); // INFO: Set token in local storage
        } else {
            payload = {status: payload};
        }
        yield put({type: "AUTHORIZE_USER_SUCCESS", payload});

    } catch (e) {
        yield put({type: "AUTHORIZE_USER_FAILED", message: e.message});
    }
}

function* authorizeUserGoogle(action) {
    const apiUrl = serverUrl+'users/authorizationgoogle';
    try {
        let payload = yield call(async () => {
            try {
                const response = await axios.post(apiUrl, action.payload);
                return response.data;
            }
            catch (error) {
                throw (error);
            }
        });
        if(payload.status === 'Success'){
            localStorage.setItem('token', payload.token); // INFO: Set token in local storage
        } else {
            payload = {
                status: payload,
                userName: '',
                userEmail: '',
                avatar: '',
                userId: '',
                searchText: '',
                provider:'',
            };
        }
        yield put({type: "AUTHORIZE_USER_GOOGLE_SUCCESS", payload});

    } catch (e) {
        yield put({type: "AUTHORIZE_USER_GOOGLE_FAILED", message: e.message});
    }
}

function* NewsSagas() {
    yield takeEvery("SEARCH_NEWS", searchingNews);
    yield takeEvery("GET_NEWS_REQUEST", getAllNews);
    yield takeEvery("REGISTER_USER_REQUEST", registerUser);
    yield takeEvery("AUTHORIZE_USER_REQUEST", authorizeUser);
    yield takeEvery("GET_USER_NEWS_REQUEST",getUserNews);
    yield takeEvery("FILTER_NEWS", filterNews);
    yield takeEvery("CHANGE_PAGE", changePages);
    yield takeEvery("LOGOUT_USER", logout);
    yield takeEvery("ADD_NEWS_REQUEST", addNews);
    yield takeEvery("EDIT_PROFILE_REQUEST", editProfile);
    yield takeEvery("REGISTER_USER_GOOGLE_REQUEST", registerUserGoogle);
    yield takeEvery("AUTHORIZE_USER_GOOGLE_REQUEST", authorizeUserGoogle);

}

// function* mySaga() {
//     yield takeLatest("NEWS_FETCH_REQUEST", fetchNews);
// }

export default NewsSagas;
