import React from "react";
import s from './Pagination.module.css'

export default function Pagination({recipesPerPage, Recipes, pagination}) {
    const pageNumbers = [];

    for (let i = 1; i<= Math.ceil(Recipes/recipesPerPage); i++) {
        pageNumbers.push(i);
    };

    return (
        <nav>
            <ul className={s.paginado}>
                { pageNumbers &&
                pageNumbers.map(number => {
                    return(
                    <li className={s.number} key={number}>
                        <button onClick={() => pagination(number)}>{number}</button>
                    </li>
                    )
                })}
            </ul>
        </nav>  
    )
}