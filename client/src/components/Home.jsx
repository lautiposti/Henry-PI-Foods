import SearchBar from './SearchBar';
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getAllRecipes } from '../actions';
import Cards from './Cards';
import Pagination from './Pagination';


export default function Home() {

    const dispatch = useDispatch();
    const Recipes = useSelector((state) => state.recipes);

    
    useEffect(() => {
        dispatch(getAllRecipes())
    }, [dispatch]) 



   const [currentPage, setCurrentPage] = useState(1);
   const [recipesPerPage, setRecipesPerPage] = useState(9);
   const lastRecipeIndex = currentPage * recipesPerPage;
   const firstRecipeIndex = lastRecipeIndex - recipesPerPage;
   const currentRecipes = Recipes.slice(firstRecipeIndex, lastRecipeIndex);

   const pagination = (pageNumber) => {setCurrentPage(pageNumber)};
    return (
        <div className='homeContainer'>
            <SearchBar setCurrentPage={setCurrentPage}/>
            <Pagination
            recipesPerPage = {recipesPerPage}
            Recipes = {Recipes.length}
            pagination = {pagination}
            />
            <Cards recipes={currentRecipes}/>
        </div>
    )
}