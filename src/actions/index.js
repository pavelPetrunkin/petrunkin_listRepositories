import {
    GET_USER_REPOSITORIES_REQUEST,
    FILTER_REPOSITORIES,
    SEARCH_REPOSITORIES,
    CHANGE_PAGE,
} from './types';

export const getUserRepositories = id => {
    return {
        type: GET_USER_REPOSITORIES_REQUEST,
        payload: id
    }
};

export const filters = (filterType) => {
    return {
        type: FILTER_REPOSITORIES,
        payload: filterType,
    }
};

export const findUser = (userName) => {
    return {
        type: FILTER_REPOSITORIES,
        payload: userName,
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
