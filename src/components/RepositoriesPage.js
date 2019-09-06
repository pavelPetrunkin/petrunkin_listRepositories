import FilterRepositories from "./FilterRepositories";
import SearchRepositories from "./SearchRepositories";
import OneRepositories from "./OneRepositories";
import Pagination from "./Pagination";
import React from "react";

const RepositoriesPage = (props) => {
    return <div>
        <div className='organization-repositories'>
            {props.userName ?
                <>
                    <p>Organization repositories</p>
                    <p>User: {props.userName}</p>
                    <p>Organization:{props.organization}</p>
                </>
                : <p>No user</p>}
        </div>
        <div className='filter-panel'>
            <FilterRepositories />
        </div>
        <SearchRepositories />
        <p>Repositories count: {props.renderRepositories.filters.length}</p>
        {!!props.renderRepositories.fullFilter.length ? props.renderRepositories.fullFilter.map(oneRepositories => {
            return (
                <OneRepositories oneRepositories={ oneRepositories }
                                 key={ oneRepositories.id } />
            );
        }) : <p>No repositories</p>}
        <Pagination pages={props.renderRepositories.filters}/>
    </div>
};

export default RepositoriesPage;
