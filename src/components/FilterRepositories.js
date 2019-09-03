import React from 'react';
import { connect } from 'react-redux';
import { filters } from '../actions';
import Select from 'react-select';

const groupedOptions = [
    { value: 'All', label: 'All', color: '#00B8D9'},
    { value: 'Tag', label: 'Tag', color: '#00B8D9'},
    { value: 'Username', label: 'Username', color: '#00B8D9'},

];
const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};
const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};

const formatGroupLabel = data => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);

const FilterRepositories = (props) => {
    const [state, setState] = React.useState({
        sortType: 'All',
    });

    const handleChange = e => {
        setState({...state,
            sortType: e.value,
        }, () => props.onChangeFilter(e.value))
    };


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
        onChangeFilter: filterType => {
            dispatch(filters(filterType));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(FilterRepositories);

