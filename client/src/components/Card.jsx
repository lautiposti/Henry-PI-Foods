import React, { useEffect } from "react";
import s from './Card.module.css';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRecipeDetail } from "../actions";

export default function Card ({name, image, diets, id, healthScore}) {

    const dispatch = useDispatch();

    // useEffect(() =>{
    //     dispatch(getRecipeDetail(id));
    // }, [])

    // const clickHandler = () => {
    //     dispatch(getRecipeDetail(id));
    // };
    
// let str = '';
// let str2 = str.slice(0,-2) 

// console.log(createdInDB);

// if(typeof id === 'string' ) {
//     // diets = [{name: "vegan"}, {name: "whole 30"}]
//     diets.map(element => {
//         str += element.name + ', ' 
//     });
//     // var str2 = str.slice(0,-2) 
    
// } else {
//     diets.map(e => {
//         return str += e + ', '
        
//     });
// }

return (
        
            <div className={s.cardContainer2}>
        <div className={s.cardContainer}>
            <div>
            <img src={image} alt="foto receta" />
            </div>
            <p>{name}</p>
            <div className={s.cardContainer3}>
            {typeof id === "string" ? diets.map((d)=>  <p className={s.diet}>{d.name}</p>) : diets.map((d)=> <p className={s.diet}>{d}</p> )} 
            </div>
            <Link to={`/detail/${id}`}>
            <button onClick={() => dispatch(getRecipeDetail(id))}>Details</button>
            </Link>
        </div>
            </div>
    );
};