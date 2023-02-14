import React from "react";
import Card from "./Card";
import s from './Cards.module.css';

export default function Cards ({recipes}) {
    // console.log(recipes);

    return (
        <div className={s.recipesContainer}>
            {recipes.map((e) => {
                return (
                <Card name={e.name} image={e.image} diets={e.diets} createdInDB={e.createdInDb} id={e.id}
                healthScore={e.healthScore}/>
                )
            })}
        </div>
    );
};