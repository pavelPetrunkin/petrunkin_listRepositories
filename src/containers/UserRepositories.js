import React from 'react';
import { connect } from 'react-redux';
import paginationFilter from "../helpers/paginationFilter";
import RepositoriesPage from "../components/RepositoriesPage";

const UserRepositories = (props) => {
        let renderRepositories = paginationFilter(
            props.repositories,
            props.filterType,
            props.searchText,
            props.currentPage,
            props.pageItems,
        );
    return (
        <RepositoriesPage renderRepositories={renderRepositories} userName={props.userName} />
    );
};

const mapStateToProps = state => {
    return {
        repositories: state.data.repositories,
        searchText: state.data.searchText,
        userName: state.data.userName,
        filterType: state.data.filterType,
        currentPage: state.data.currentPage,
        pageItems: state.data.pageItems,
    };
};

export default connect(
    mapStateToProps,
    null,
)(UserRepositories);
