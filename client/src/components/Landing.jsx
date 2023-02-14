import React from "react";
import {Link} from 'react-router-dom';
import s from './Landing.module.css';


export default function Landing() {
    
    
    return (
        <div className={s.container}>
            <button>
                <Link to= '/home'>Entrar a home</Link>
            </button>
            <h1>Hola, estas en la Landing</h1>
        </div>
    );
};