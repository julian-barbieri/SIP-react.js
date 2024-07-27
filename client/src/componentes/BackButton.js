import React from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/BackButton.css';
import { BsArrowLeftCircle } from "react-icons/bs";

function BackButton() {
    let navigation = useNavigate();
    return(
        <div className="container-back-link">
            <BsArrowLeftCircle 
                className="back-link"
                onClick={() =>  navigation(-1)} 
                size={32} 
            />
        </div>
    )
}

export default BackButton;