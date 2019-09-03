import React from 'react';
import { connect } from 'react-redux';
import FilterRepositories from "../components/FilterRepositories";
import SearchRepositories from "../components/SearchRepositories";
import Pagination from "../components/Pagination";
import paginationFilter from "../helpers/paginationFilter";
import ModalFindUser from "../modals/ModalFindUser";
import OneRepositories from "../components/OneRepositories";

const UsersRepositories = (props) => {
        let renderRepositories = paginationFilter(
            props.repositories,
            props.filterType,
            props.searchText,
            props.currentPage,
            props.pageItems,
        );
        return (
            <div>
                <div style={{margin:'0 auto',maxWidth:'150px',textAlign: 'center'}}>
                    <ModalFindUser/>
                    {props.userName ? <p>User repositories</p> : <p>No user</p>}
                </div>
                <div style={{margin:'0 auto',maxWidth:'300px',textAlign: 'center'}}>
                    <FilterRepositories />
                </div>
                <SearchRepositories />
                {renderRepositories.fullFilter.map(oneRepositories => {
                    return (
                        <OneRepositories oneRepositories={ props.repositories[oneRepositories] }
                                         key={ props.repositories[oneRepositories].id } />
                    );
                })}
                <Pagination pages={renderRepositories.filters}/>
            </div>
        );
};

const mapStateToProps = state => {
    return {
        repositories: state.data.repositories,
        searchText: state.data.searchText,
        userName: state.data.userName,
        userEmail: state.data.userEmail,
    };
};

export default connect(
    mapStateToProps,
    null,
)(UsersRepositories);
