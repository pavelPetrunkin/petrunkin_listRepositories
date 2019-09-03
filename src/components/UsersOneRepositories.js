import React from 'react';

const styles = {
    borderBottom: '2px solid #eee',
    background: '#fafafa',
    margin: '.75rem auto',
    padding: '.6rem 1rem',
    maxWidth: '500px',
    borderRadius: '7px'
};

export default ({props}) => {
    console.log(props);
    return (
        <div style={ styles }>
            <h2>Hello</h2>
            <button className="btn btn-danger" type="button">
                Remove
            </button>
        </div>
    );
};
