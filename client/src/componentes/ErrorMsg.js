import React from 'react';
import '../styles/ErrorMessage.css';
import { ErrorMessage } from 'formik';

function ErrorMsg({name, component}) {
    return(
        <div className="container-errorMessage">
            <ErrorMessage name={name} component={component} className="error-message" />
        </div>
    )
}

export default ErrorMsg;