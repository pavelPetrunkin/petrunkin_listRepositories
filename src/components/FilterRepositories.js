import React from 'react';
import { connect } from 'react-redux';
import { filters } from '../actions';
import Select from 'react-select';

const groupedOptions = [
    { value: 'All', label: 'All', color: '#00B8D9'},
    { value: 'URL', label: 'URL', color: '#00B8D9'},
    { value: 'Repository', label: 'Repository', color: '#00B8D9'},

];


const formatGroupLabel = data => (
    <div className='group-style'>
        <span>{data.label}</span>
        <span className='group-badge-styles' >{data.options.length}</span>
    </div>
);

const FilterRepositories = (props) => {
    const [state, setState] = React.useState({
        sortType: 'All',
    });



    const handleChange = e => {
        setState({...state,
            sortType: e.value,
        });
    };

    React.useEffect(() => props.changeFilter(state.sortType));


        return (
            <Select
                defaultValue='All'
                options={groupedOptions}
                formatGroupLabel={formatGroupLabel}
                onChange={handleChange}
            />
        );
    };

const mapDispatchToProps = dispatch => {
    return {
        changeFilter: filterType => {
            dispatch(filters(filterType));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(FilterRepositories);

