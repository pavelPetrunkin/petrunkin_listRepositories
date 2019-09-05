import {
    GET_USER_REPOSITORIES_REQUEST,
    FILTER_REPOSITORIES,
    SEARCH_REPOSITORIES,
    GET_USER_REQUEST,
    CHANGE_PAGE,
} from './types';

export const findUser = (userName) => {
    return {
        type: GET_USER_REQUEST,
        payload: userName,
    }
};

export const filters = (filterType) => {
    return {
        type: FILTER_REPOSITORIES,
        payload: filterType,
    }
};



export const searchRepositories = (text) => {
    return {
        type: SEARCH_REPOSITORIES,
        payload: text,
    }
};

export const changePage = (currentPage) => {
    return {
        type: CHANGE_PAGE,
        payload: currentPage,
    }
};
