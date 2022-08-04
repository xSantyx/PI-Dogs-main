import React, {useState, useEffect}  from "react";
import {getAllDogs, getAllTemps, getAllBreeds, postDog} from "../actions"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import "./DogCreate.css"

function validate(input){
    let error = {};
    if(!input.name){
        error.name = "Falta un nombre"
    }
    if(!input.heightmin) {
        error.heightmin = "Falta altura mínima"
    }
    if(!input.heightmax) {
        error.heightmax = "Falta altura máxima"
    }
    if(input.heightmax < input.heightmin) {
        error.heightmax = "La altura máxima no puede ser menor"
    }
    if(input.heightmax < input.heightmin) {
        error.heightmin = "La altura mínima no puede ser mayor"
    }
    if(!input.weightmin) {
        error.weightmin = "Falta peso mínimo"
    }
    if(!input.weightmax) {
        error.weightmax = "Falta peso máxima"
    }
    if(input.weightmax < input.weightmin) {
        error.weightmax = "El peso máximo no puede ser menor"        
    }
    if(input.weightmax < input.weightmin) {
        error.weightmin = "El peso mínimo no puede ser mayor"        
    }
    if(!input.breed) {
        error.breed = "Falta raza"
    }
    if(input.temperament.length === 0) {
        error.temperament = "Falta temperamento"
    }
    return error;
}



export default function DogCreate() {

const dispatch = useDispatch();
const navigate = useNavigate();
const [error, setError] = useState({});
const [tempo, setTempo] = useState("");
const [input, setInput] = useState({
        name: "",
        weightmin: "",
        weightmax: "",
        heightmin: "",
        heightmax: "",
        breed: "",
        temperament: [],
        image: "",
        life_span: ""
    });

const allTemps = useSelector((e) =>e.temps)
const allBreeds = useSelector((e) => e.breeds)
const button = document.getElementsByClassName('button')



useEffect(() => {
    dispatch(getAllDogs())
    dispatch (getAllTemps())
    dispatch (getAllBreeds())},
    [dispatch]
);


function handleOnChange (e) {
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    setError (validate({
        ...input,
        [e.target.name]:e.target.value
    }))
}


function handleOnCheck (e) {
        e.target.checked ? setInput({
        ...input,
        temperament: [...input.temperament, e.target.value]
        
    }) : 
    setInput ({
        ...input,
        temperament : input.temperament.filter((b) => b !== e.target.value)
    })
    setError (validate({
        ...input,
        temperament: e.target.value
    }))
}

function handleOnSelect (e) {
    {e.target.checked ?  setInput({
        ...input,
        breed: e.target.value 
    }) : setInput({...input})}
    setError (validate({
        ...input,
        breed: e.target.value
    }))

}
function handleSubmit(e) {
    e.preventDefault(e);
    if(input.name === "" || input.weightmin === "" || input.weightmax ==="" || input.heightmin ===""|| input.heightmax ===""|| input.breed ===""|| input.temperament.length < 1 || input.heightmax < input.heightmin || input.weightmax < input.weightmin )
    button.disabled = true
    // {alert("Datos incorrectos o faltantes")}
    else {
        button.disabled = false
    dispatch(postDog(input))
    alert ("Se a creado el perro")
    setInput({
        name: "",
        weightmin: "",
        weightmax: "",
        heightmin: "",
        heightmax: "",
        breed: "",
        temperament: [],
        image: "",
        life_span: ""
    })
    navigate("/home")}
}
function handleCreateTemp(e) {
    e.preventDefault();
    let randomKey = Math.random()
    allTemps.push({name:e.target.value, id:randomKey})
    setTempo({randomKey})
    e.target.value = ""
}
function hancleCreateBreed(e){
    e.preventDefault();
    allBreeds.push(e.target.value)
    setTempo({e})
    e.target.value = ""
}




return (
    <div className = "dogcreate-container">
        <Link to = "/home">
            <button> Volver </button>
        </Link>
        <h1> Crea tu perro </h1> 
        <form onSubmit = {(e)=>handleSubmit(e)}>
            <div className= "div-container">
            <div>
                <label> Nombre: </label>
                <input type="text" value={input.name} name="name" onChange = {(e)=>handleOnChange(e)}/>
                {error.name ?
                <p className = "error"> {error.name}</p> : ""}
            </div>
            <div>
                <label> Peso: </label>
                <input type = "number" placeholder =" Mínimo "value={input.weightmaxmin} name = "weightmin" onChange = {(e)=>handleOnChange(e)}/> - <input type = "number" placeholder = " Máximo "value={input.weightmax} name = "weightmax" onChange = {(e)=>handleOnChange(e)}/>
                {error.weightmin ?
                <p className = "error"> {error.weightmin}</p> : ""}
                {error.weightmax ?
                <p className = "error"> {error.weightmax}</p> : ""}
            </div>
           
            <div>
                <label> Altura: </label>
                <input type = "number" placeholder = " Mínimo " value={input.heightmin} name = "heightmin" onChange = {(e)=>handleOnChange(e)}/> - <input type = "number" placeholder = " Máximo "value={input.heightmax} name = "heightmax" onChange = {(e)=>handleOnChange(e)}/>
                {error.heightmin ?
                <p className = "error"> {error.heightmin}</p> : ""}
                {error.heightmax ?
                <p className = "error"> {error.heightmax}</p> : ""}
            </div>
            <div>
                <label> Tiempo de vida: </label>
                <input type = "text" value={input.life_span} name = "life_span" onChange = {(e)=>handleOnChange(e)}/>
            </div>
            <div>
                <label> Imágen: </label>
                <input type = "text" value={input.image} name = "image" onChange = {(e)=>handleOnChange(e)}/>
            </div>
            </div>
            <div className = "listaBreeds">
                <label> Raza: </label>
                <input type = "text" placeholder = "Crea tu raza"  onKeyDown={(e) => e.keyCode === 13 ? hancleCreateBreed(e) : ""}/>
                {allBreeds.map((e) => {
                    return (
                        <label className="label-breed" key={(e)}> {e}
                            <input type = "radio" value={e} name = "breed" onChange = {(e)=>handleOnSelect(e)}/>
                        </label>
                    )
                 })}
            </div>
            <div className = "listaTemps">
                <label> Temperamento: </label>
                <input type = "text" placeholder = "Crea tu temperamento"  onKeyDown={(e) => e.keyCode ===13 ? handleCreateTemp(e) : ""}/>
                {allTemps.map((e) => {
                    return (
                        <label htmlFor = "checkbox" className="label-temp" key = {e.id} > {e.name} 
                            <input type = "checkbox" value={e.name} className="checkbox" onChange = {(e)=>handleOnCheck(e)}/>
                        </label>
                        
                        
                        )
                    })}
            </div>
            <div >
                {input.breed ?
                <p className ="text"> {input.breed} </p> :
                <p className = "error"> {error.breed}</p>}
            </div>
            <div className = "temp">
                {input.temperament.length > 0 ? input.temperament.map((e) => { return (
                <p className = "text" key = {e}> {e},{" "} </p>
                )}) :
                <p className = "error"> {error.temperament}</p> 
                }
            </div>
            <div>
                <button type = "submit" className ="button"> Crear </button>
            </div>
            
        </form>
        

    </div>
)
}
