import React from 'react';
import '../styles/Label.css';

function Label({text}) {
    return(
        <div className="container-label">
            <label className="label">
                {text}
            </label>
        </div>
    )
}

export default Label;