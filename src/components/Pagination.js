import React from 'react';
import { connect } from 'react-redux';
import {changePage} from "../actions";

const Pagination = (props) => {

    const [state, setState] = React.useState({
        currentPage: props.currentPage,
    });

    const handlePress = e => {
        setState({...state,
            currentPage:e.target.value
        });
    };

    React.useEffect(() => props.ChangePage(state.currentPage));

        const countPages = Math.ceil(props.pages.length / props.pageItems);
        const pageLinks = [...Array(countPages).keys()].map( (item,i) =>
            <input key={i+1} type="submit" value={i+1} onClick={handlePress}/>);
        return (
            <div style={{display:'flex',width:'100%',justifyContent:'center'}}>
                {pageLinks}
            </div>
        );
    };

const mapDispatchToProps = dispatch => {
    return {
        ChangePage: currentPage => {
            dispatch(changePage(currentPage));
        },
    };
};

const mapStateToProps = state => {
    return {
        currentPage: state.data.currentPage,
        pageItems: state.data.pageItems,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pagination);
