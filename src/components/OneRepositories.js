import React from 'react';

const styles = {
    borderBottom: '2px solid #eee',
    background: '#fafafa',
    margin: '.75rem auto',
    padding: '.6rem 1rem',
    maxWidth: '500px',
    borderRadius: '7px'
};

 const OneRepositories = ({oneRepositories}) => {

     console.log(oneRepositories);
        return (
            <div style={styles}>
                <h2>Title: {oneRepositories.name}</h2>
                <p>Url: <a href={oneRepositories.html_url}>{oneRepositories.html_url}</a></p>
            </div>
        );
    };

export default OneRepositories;
