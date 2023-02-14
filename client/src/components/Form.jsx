import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getDiets, postRecipe } from "../actions";

function validation(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "Falta un nombre";
    }
    if (!/^[a-zA-Z ]+$/.test(input.name)) {
      errors.name = "El nombre requiere letras";
    }
    if (input.name.length <= 2 || input.name.length >= 20) {
      errors.name = "El nombre debe tener entre 2 y 20 letras";
    }
  
    if (!input.summary) {
      errors.summary = "Se requiere un resumen";
    } else if (input.summary.length <= 2 || input.summary.length >= 300) {
      errors.summary = "El resumen debe tener entre 2 a 300 letras";
    }
  
    if (input.healthScore < 1 || input.healthScore > 100) {
      errors.healthScore = "El health score debe ser entre 1 y 100";
    }
  
    if (
      !/https?:\/\/(www.)?[-a-zA-Z0-9@:%.+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&//=]*)/.test(
        input.img
      )
    ) {
      errors.img = "La url no es válida";
    }
  
    return errors;
  }
  
  export default function Form() {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets = useSelector((state) => state.diets);
    const [errors, setErrors] = useState({});
  
    const [input, setInput] = useState({
      name: "",
      img: "",
      summary: "",
      healthScore: "",
      steps: "",
      diets: [],
    });
  
    useEffect(() => {
      dispatch(getDiets());
    }, [dispatch]);
  
  
    const handleChangeInput = (e) => {
      e.preventDefault();
      setInput((prevInput) => {
        // de esta manera el componente muestra los cambios para poder ir validando
        const newInput = {
          ...prevInput,
          [e.target.name]: e.target.value,
        };
        const validations = validation(newInput);
        setErrors(validations);
        return newInput;
      });
    };
  
    const handleChangeSelect = (e) => {
      e.preventDefault();
      if (!input.diets.includes(e.target.value))
        return setInput({
          ...input,
          diets: [...input.diets, e.target.value],
        });
    };
  
    const handleChangeSubmit = (e) => {
      e.preventDefault();
      if (input.name && input.img && input.summary && input.healthScore) {
        dispatch(postRecipe(input))
          alert("Receta creada");
  
        setInput({
          name: "",
          img: "",
          summary: "",
          healthScore: "",
          steps: "",
          diets: [],
        });
        history.push("/home");
      } else {
        alert("Oops! Hay data incompleta");
      }
    };
  
    const handleDelete = (e) => {
      e.preventDefault();
      setInput({
        ...input,
        diets: input.diets.filter((dietita) => dietita !== e.target.value),
      });
    };
  
    const handleRemove =(e)=>{
      setInput({
        ...input,
        diets:input.diets.filter(occ=> occ !== e)
      })
    }
  
    return (
                <form onSubmit={(e) => handleChangeSubmit(e)}>
                  <div>
                    <label>Nombre: </label>
                    <input
                      type="text"
                      name="name"
                      value={input.name}
                      onChange={(e) => handleChangeInput(e)}
                    />
                    {errors.name && <span>{errors.name}</span>}
                    <br />
                  </div>
                  <div>
                    <label>Imagen: </label>
                    <input
                      type="text"
                      name="img"
                      value={input.img}
                      onChange={(e) => handleChangeInput(e)}
                    />
                    {errors.img && <span>{errors.img}</span>}
                    <br />
                  </div>
                  <div>
                    <label>Health Score: {`${input.healthScore}%`}</label>
                    <input
                      type="range"
                      name="healthScore"
                      value={input.healthScore}
                      onChange={(e) => handleChangeInput(e)}
                      min={0}
                      max={100}
                    />
                    {errors.healthScore && <span>{errors.healthScore}</span>}
                    <br />
                  </div>
  
                  <div>
                    <label>Resumen: </label>
                    <textarea
                      type="text"
                      name="summary"
                      value={input.summary}
                      onChange={(e) => handleChangeInput(e)}
                    />
                    {errors.summary && <span>{errors.summary}</span>}
                    <br />
                  </div>
                  <div>
                    <label>Pasos: </label>
                    <textarea
                      type="text"
                      name="steps"
                      value={input.steps}
                      onChange={(e) => handleChangeInput(e)}
                    />
                    <br />
                  </div>
                  <div>
                    <label>Dietas: </label>
                    <select onChange={(e) => handleChangeSelect(e)} defaultValue="default">
                      <option default></option>
                      {diets?.map((d) => {
                        return (
                          <option key={d.name} name="diets" value={d.name}>
                            {d.name}
                          </option>
                        );
                      })}
                    </select>
                    <div>
                      <div>
                        {input.diets.map((e) => (
                          <div key={e.toString()}>
                            <button value={e} onClick={(e) => handleDelete(e)}>
                              X
                            </button>
                            <h4>{e}</h4>
                          </div>
                        ))}
                      </div>
                    </div>
                    <br />
                  </div>
  
                  <div>
                   <button onClick={()=>handleRemove()}>Delete</button>
                   <br>
                   </br>
                    <button type="submit">Create</button>
                  </div>
                </form>
    );
  }








// export function Form () {
//     const dispatch = useDispatch();
    
//     const dietsArr = []

//     useEffect(() => {
//         dispatch(getDiets())
//     }, [dispatch])
    
//     const history = useHistory();

//     const [errors, setErrors] = useState({})

//     const [input, setInput] = useState({
//         name: '',
//         diets: [],
//         summary: '',
//         healthScore: '',
//         steps: [],
//         image: '',
//         createdInDb: true
//     })
    
//     const inputHandler = (e) => {
//         setInput({ ...input, [e.target.name]: e.target.value });
//         console.log(input);
//         console.log(dietsArr);
//     }

//     function handleDiets (e) {
//         e.preventDefault();
//         if(!input?.diets?.includes(e.target.value)) {
//             setInput({ 
//                 ...input,
//                 diets: [...input.diets, e.target.value]
//         })
//         }
//     }

//     function handleSubmit (e) {
//         e.preventDefault();
//         dispatch(postRecipe(input));
//         history.push('/home')
//     }

//     function handleErrors(e) {
//         e.preventDefault();
//         if(input.name === "") {
//             errors.name = "Se requiere un nombre"
//         }
//         if(!input.summary){
//             errors.summary = 'Se requiere un resumen'
//             }
//         if(input.healthScore < 0 || input.healthScore > 100) {
//             errors.healthScore = 'Se requiere un puntaje del 1 al 100'
//         }
//         if(input.diets.length === 0) {
//             errors.diets = "Seleccionar al menos una dieta"
//         }
//         if (!errors.name && !errors.summary && !errors.healthScore && !errors.diets ) {
//             handleSubmit(e)
//         } else {
//             alert( errors.name || errors.summary || errors.healthScore || errors.diets)
//         }
//     };
    

//     const diets = useSelector((state) => state.diets);
//     return (
//         <form action="" onChange={(e) => inputHandler(e)} onSubmit={(e) => handleErrors(e)}>
//             <div>
//                 <label htmlFor="">Nombre: </label>
//                 <input  type="text" name="name" id="" />
//             </div>
//             <div>
//                 <label htmlFor="">Resumen del plato: </label>
//                 <input type="text" name="summary" />
//             </div>
//             <div>
//                 <label htmlFor="">Health Score: </label>
//                 <input type='number' />
//             </div>
//             <div>
//                 <label htmlFor="">Pasos: </label>
//                 <input type="text" name="steps" />
//             </div>
//             <div>
//                 <label htmlFor="">Seleccionar dietas: </label>
//                 <select name="diets" onChange={(e) => handleDiets(e)} id="">
//                 {diets?.map((e) => {
//                     return <option value={e.name}>{e.name[0].toUpperCase() + e.name.slice(1)}</option>
//                 })}
//                 </select>
                
//             </div>
//             <button type="submit">Crear</button>
//         </form>
//     )
// };