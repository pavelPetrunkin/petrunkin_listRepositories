import React from 'react'

const Banner = function({children,title,subtitle}) {
    return (
        <div className="banner">
            <h1>{title}</h1>
            <p>{subtitle}</p>
            {children}
        </div>
    )
};

export default Banner;
