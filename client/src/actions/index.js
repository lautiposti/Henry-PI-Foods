import axios from "axios";

export const getAllRecipes = () => {
    return async function (dispatch) {
        return axios.get("http://localhost:3001/recipes")
        .then(res => res.data)
        .then(data => {
            dispatch({ // recordemos que siempre de dispatchan acciones y las acciones son objetos. 
                type: 'GET_ALL_RECIPES',
                payload: data
            });
        });
    };
};


export function getRecipeDetail (id)  { 
    return async function (dispatch) {
      let json = await axios.get('http://localhost:3001/recipes/' + id);
      console.log('entre');
      return dispatch({
        type: 'RECIPE_DETAILS',
        payload: json.data,
      });
    };
};


export function getRecipesByName(nameRecipe) {
    return async function (dispatch) {
      let response = await axios.get(
        `http://localhost:3001/recipes?name=${nameRecipe}`
      );
      return dispatch({ 
        type: 'GET_RECIPES_BY_NAME', 
        payload: response.data 
      });
    };
  };


  export function getDiets() {
    return async function (dispatch) {
      var response = await axios("http://localhost:3001/diets", {});
      return dispatch({
        type: 'GET_DIETS',
        payload: response.data,
      });
    };
  };


  export function postRecipe(payload) {
    return async function () {
      const response = await axios.post("http://localhost:3001/recipe", payload);
      return response;
    };
  };

  export function filterRecipesbyDiet (payload) {
    return {
      type: 'FILTER_BY_DIET',
      payload
    }
  }

  export function alphabeticalSort (value) {
    return function (dispatch) {
      if(value === "ascendent") {
        return dispatch({
          type: 'SORT_ASC_ALPH'
        });
      };
      if(value === "descendent") {
        return dispatch({
          type: 'SORT_DESC_ALPH'
        });
      };
    };
  };

  export function healthSort (value) {
    return function (dispatch) {
      if(value === "ascendent") {
        return dispatch({
          type: 'SORT_ASC_HEALTH'
        });
      }
      if(value === "descendent") {
        return dispatch({
          type: 'SORT_DESC_HEALTH'
        })
      }
    }
  }

  export function refresh () {
    return function (dispatch) {
      return dispatch({
        type: 'REFRESH',
      })
    }
  }

  export function searchRecipe (value) {
    return function (dispatch) {
      return dispatch({
        type: 'SEARCH_RECIPE',
        payload: value
      })
    };
  };