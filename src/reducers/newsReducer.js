// postReducer.js

import {
    GET_USER_REPOSITORIES_SUCCESS,
    SEARCH_REPOSITORIES_SUCCESS,
    FILTER_REPOSITORIES_SUCCESS,
    GET_USER_REPOSITORES_FAILED,
    CHANGE_PAGE_SUCCESS,
} from '../actions/types';

const initialState = {
    repositories: [],
    filterType:'All',
    searchText: '',
    currentPage: 1,
    pageItems: 3,
    userName:'',
    userEmail:'',
    requestSuccess:'',
};

export default function repositoriesReducer(state = initialState, action) {
    const {payload} = action;

    switch (action.type) {
        case GET_USER_REPOSITORIES_SUCCESS:
            return {...state,
                repositories: payload.data,
                requestSuccess: payload.status,
                userName: payload.request.username,
                userEmail: payload.request.email,
                searchText: '',
            };
        case GET_USER_REPOSITORES_FAILED:
            return {...state,
                requestSuccess: payload.status,
                searchText: '',
            };
        case SEARCH_REPOSITORIES_SUCCESS:
            return {...state, searchText: payload};
        case FILTER_REPOSITORIES_SUCCESS:
            return {...state, filterType: payload};
        case CHANGE_PAGE_SUCCESS:
            return {...state, currentPage: payload};
        default:
            return state;
    }
}
