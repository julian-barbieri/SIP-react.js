import React from 'react';
import '../styles/Input.css';
import { Field } from 'formik';

function Input({id, name, placeholder, type}) {
    return(
        <div className="container-input">
            <Field id={id} name={name} placeholder={placeholder} type={type} className="inputField" >
            
            </Field>
        </div>
    )
}

export default Input;