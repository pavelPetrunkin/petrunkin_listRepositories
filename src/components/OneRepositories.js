import React from 'react';

 const OneRepositories = ({oneRepositories,organization}) => {
        return (
            <div className='one-repository'>
                <h2>Repository name: {oneRepositories.name}</h2>
                <p>Url: <a className='link-repositories' href={oneRepositories.html_url}>{oneRepositories.html_url}</a></p>
            </div>
        );
    };

export default OneRepositories;
