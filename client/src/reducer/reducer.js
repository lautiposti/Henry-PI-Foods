
const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: [], 
};

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
            case 'GET_DIETS':
                return {
                    ...state,
                    diets: action.payload
                }
            case 'FILTER_BY_DIET': 
                const filtByDiets = action.payload === 'default' ? 
                state.allRecipes : state.allRecipes.filter(recipe => {
                    if (recipe.diets.length > 0) {
                        if(recipe.diets.find(element => element.name || element === action.payload)) return recipe
                    }
                    })
                return{
                    ...state,
                    recipes: filtByDiets
                }
            case 'SORT_ASC_ALPH':
                return {
                    ...state,
                    recipes: state.recipes
                    .map(e => e)
                    .sort((a, b) => {
                        if(a.name.toLowerCase() > b.name.toLowerCase()) {
                            return 1
                        } else {
                            return -1
                        };
                    })
                };

            case 'SORT_DESC_ALPH': 
                return {
                    ...state, 
                    recipes: state.recipes 
                    .map(e => e)
                    .sort((a, b) => {
                        if(a.name.toLowerCase() > b.name.toLowerCase()) {
                            return -1
                        } else {
                            return 1
                        };
                    })
                };

            case 'SORT_ASC_HEALTH':
                return {
                    ...state,
                    recipes: state.recipes
                    .map(e => e)
                    .sort((a, b) => Number(a.healthScore) - Number(b.healthScore))
                };

            case 'SORT_DESC_HEALTH':
                return{
                    ...state,
                    recipes: state.recipes
                    .map(e => e)
                    .sort((a, b) => Number(b.healthScore) - Number(a.healthScore))
                }

            case 'SEARCH_RECIPE':
                return {
                    ...state,
                    recipes: state.allRecipes
                    .filter((e) => e.name.toLowerCase().includes(action.payload.toLowerCase()))
                    
                }

            case 'RECIPE_DETAILS': 
                return {
                    ...state,
                    detail: action.payload
                }

            case 'REFRESH':
                return {
                    ...state,
                    recipes: state.allRecipes
                }
        default: return {...state};
    }
};

export default rootReducer;