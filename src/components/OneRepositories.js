import React from 'react';

const styles = {
    borderBottom: '2px solid #eee',
    background: '#fafafa',
    margin: '.75rem auto',
    padding: '.6rem 1rem',
    maxWidth: '500px',
    borderRadius: '7px'
};

 const OneRepositories = (props) => {

        return (
            <div style={styles}>
                <h2>Title: {props.oneRepositories.name}</h2>
                <p>Author: {props.oneRepositories.userName}</p>
                <p>Text: {props.oneRepositories.text}</p>
                <p><img
                    style={{maxWidth: '78%'}}
                    alt='No image'/></p>
                <p>Tag: {props.oneRepositories.tag} </p>
            </div>
        );
    };

export default OneRepositories;
