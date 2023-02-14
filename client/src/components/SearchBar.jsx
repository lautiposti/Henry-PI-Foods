import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import {getDiets, filterRecipesbyDiet, alphabeticalSort, refresh, healthSort, searchRecipe} from '../actions/index.js'

export default function SearchBar ({setCurrentPage}) {
    const dispatch = useDispatch();
    const Diets = useSelector((state) => state.diets);
    const cb = () => null;

    useEffect(() => {
        !Diets.length ?
        dispatch(getDiets())
        : cb()
    }, [dispatch]);


    const [inputState, setInputState] = useState('');

    const dietHandler = (e) => {
        e.preventDefault();
        dispatch(filterRecipesbyDiet(e.target.value));
        setCurrentPage(1);
        e.target.value = 'default'
    }

    const handleAlphabeticalSort = (e) => {
        e.preventDefault();
        dispatch(alphabeticalSort(e.target.value));
        e.target.value = 'default';
    }

    const handleRefresh = (e) => {
        e.preventDefault();
        dispatch(refresh());
    }

    const handleHealthscore = (e) => {
        e.preventDefault();
        dispatch(healthSort(e.target.value));
        e.target.value = 'default';
    };

    const inputHandler = (e) => {
        e.preventDefault();
        setInputState(e.target.value);
        // console.log(inputState);
    }

    const searchHandler = (e) => {
        e.preventDefault();
        dispatch(searchRecipe(inputState));
        setInputState('');
    }

    return (
    <div className="container">
        <select className='dietSelect' onChange={(e) => dietHandler(e)} name="diets" id="diets">
        <option value="default">Dietas</option>
            { Diets.map(diet => {
                return (
                    <option value={diet.name}>{diet.name[0].toUpperCase() + diet.name.slice(1) }</option>
                )
            })
            };
        </select>

        <select onChange={(e) => handleAlphabeticalSort(e)} name="alphabetic" id="alphabetic">
            <option value="default">Orden alfabetico</option>
            <option value="ascendent">A-Z</option>
            <option value="descendent">Z-A</option>
        </select>

        <select onChange={(e) => handleHealthscore(e)} name="healthscore" id="healthscore">
            <option value="default">Healthscore</option>
            <option value="ascendent">Asc</option>
            <option value="descendent">Desc</option>
        </select>

        <nav>
            <Link to='/createRecipe'>
            <button>Crea tu receta</button>
            </Link>
        </nav>

        <div>
        <input onChange={(e) => inputHandler(e)} type="text" placeholder="Buscá tu receta..."/>
        <button onClick={(e) => searchHandler(e)}>Buscar</button>
        </div>

        <button onClick={(e) => handleRefresh(e)}>Refresh</button>
    </div>
    )
}