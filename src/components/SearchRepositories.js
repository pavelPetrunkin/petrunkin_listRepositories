import React from 'react';
import { connect } from 'react-redux';
import {searchRepositories} from "../actions";

const SearchRepositories = (props) => {

    const [state, setState] = React.useState({
        text: '',
    });

    const handleInputChange = e => {
        setState({...state,
            text: e.target.value,
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (state.text.trim()) {
            props.changeSearch(state.text);
        }
    };

    const handleReset = () => {
        setState({...state,
            text:''
        });
    };

    React.useEffect(() => props.changeSearch(state.text));

        return (
            <div>
                <form  className='modal-form' onSubmit={handleSubmit}>
                    <div  className="form-group">
                        <input
                            type="text"
                            placeholder="Name"
                            className="form-control"
                            name="name"
                            onChange={handleInputChange}
                            value={state.text }
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary">Search</button>
                        <button type="button" className="btn btn-warning" onClick={handleReset}>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        );
    };

const mapDispatchToProps = dispatch => {
    return {
        changeSearch: searchText => {
            dispatch(searchRepositories(searchText));
        },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(SearchRepositories);
