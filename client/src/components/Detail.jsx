import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


export default function Details() {

    let data = useSelector((state) => state.detail);

    // console.log(data.diets); // ['vegan', 'whole 30']
    return data ? (
            <div>
                <Link to='/home'>
                <button>Volver</button>
                </Link>
                <p>{data.name}</p>
                <img src={data.image} alt="" />
                <div>
                {/* {typeof id === "string" ? data?.diets?.map((d)=>  <p>{d.name}</p>) : data?.diets?.map((d)=> <p>{d}</p> )} */}
                    { typeof data.id === 'string' ? data && data?.diets?.map(e => {
                        return <p>{e.name}</p>
                    }) : data && data?.diets?.map(e => {
                        return <p> {e}</p>
                    })
                    }
                </div>
                <div>
                {data?.types?.map(e => <p>{e}</p>)}
                </div>
                <p>{data.healthScore}</p>
                <p dangerouslySetInnerHTML={{ __html: data?.summary }}></p>
                {!data.steps ? '' :  
                <p dangerouslySetInnerHTML={{ __html: data?.steps }}></p>
                }
            </div>
    ) : null   

}