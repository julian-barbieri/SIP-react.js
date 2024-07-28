import React from 'react';
import '../styles/CompleteField.css';
import Input from '../componentes/Input.js';
import ErrorMsg from '../componentes/ErrorMsg.js';
import Label from '../componentes/Label.js';

function CompleteField({text, id, name, placeholder, type}) {
    return(
        <div className="form-item">
            <Label text={text} />
            <Input id={id} name={name} placeholder={placeholder} type={type} />
            <ErrorMsg name={name} component="div" />
        </div>
    )
}

export default CompleteField;