import React from 'react';
import '../styles/Title.css';

function Title({text}) {
    return(
        <div className="container-title">
            <h2 className="title">
                {text}
            </h2>
        </div>
    )
}

export default Title;