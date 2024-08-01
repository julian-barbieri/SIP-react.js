import React from 'react';
import {useNavigate} from 'react-router-dom';
import './BackButton.css';
import { BsArrowLeftCircle } from "react-icons/bs";

function BackButton({to}) {
    let navigation = useNavigate();
    return(
        <div className="container-back-link">
            <BsArrowLeftCircle 
                className="back-link"
                onClick={() =>  navigation(to)} 
                size={32} 
            />
        </div>
    )
}

export default BackButton;