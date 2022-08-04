import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom";
import { getAllDogs, getAllTemps, filterByTemp, getAllBreeds, filterBreed, orderByName, orderByWeight } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar"
import "./Home.css"

export default function Home() {
    const dispatch = useDispatch()
    const allDogs = useSelector((e) =>e.dogs)
    const allTemps = useSelector((e) =>e.temps)
    const allBreeds = useSelector((e) => e.breeds)
    const [currentPage, setCurrentPage] = useState (1);
    const [dogPerPage, setDogPerPage] = useState (8);
    const [orden, setOrden] = useState("");
    const indexOfLastDog = currentPage * dogPerPage;
    const indexOfFirstDog =  indexOfLastDog - dogPerPage;
    const currentDogs = allDogs.length ? allDogs.slice (indexOfFirstDog, indexOfLastDog) : [];
    const paginado = (pageNumber) => {setCurrentPage(pageNumber)};
    



useEffect(() => {
    dispatch(getAllDogs())},
    [dispatch]
);
useEffect(() =>{
    dispatch(getAllTemps())
}, [dispatch])

useEffect(() =>{
    dispatch(getAllBreeds())
}, [dispatch])

function handleFilterTemp(e) {
    dispatch (filterByTemp(e.target.value))
    setCurrentPage(1)
}
function handleFilterBreed(e) {
    dispatch (filterBreed(e.target.value))
    setCurrentPage(1)
}
const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrden(e.target.value)
    setCurrentPage(1);
};
 const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setOrden(e.target.value)
    setCurrentPage(1);
};
const handleOnClick = (e) => {
    e.preventDefault();
    dispatch(getAllDogs(), document.getElementById("myForm").reset(), document.getElementById("mySearch").reset())
}


return (
    <div className ="container-home">
        <h1 className = "home-title">¡¡Bienvenidos!!</h1>
        <div className = "barra1">
        <Link to = "/">
            <button> Inicio </button>
        </Link>
            <SearchBar/>
            <Link to = "/dogcreate"> 
            <button> Crea tu perro</button>
            </Link>
            </div>
            <div>
            <form id = "myForm">
                <select onChange = {(e) => handleOrderByName(e)} name = "order" id = "order">
                <option hidden> Orden Alfabético </option>
                <option value = "alf asc"> Orden Ascendente</option>
                <option value = "alf desc"> Orden Descendente</option>
            </select>
            <select onChange = {(e) => handleOrderByWeight(e)}>
                <option hidden> Orden por peso </option>
                <option value = "weightmin"> Peso Ascendente</option>
                <option value = "weightmax"> Peso Descendente</option>
            </select>
            <select onChange = {(e) => handleFilterBreed(e)}>
            <option hidden> Orden por raza </option>
                <option value = "all"> Todas las razas </option>
                {allBreeds && allBreeds.map((e) => {
                    return (<option value = {e} key={e} >{e}</option>)
                })
            }
            </select>
            <select onChange = {(e) => handleFilterTemp(e)}>
                <option hidden> Orden por temperamento </option>
                <option value = "all"> Todos los temperamentos </option>
                {allTemps && allTemps.map((e) => {
                    return (<option value = {e.name} key={e.id} >{e.name}</option>)
                })
            }
            </select>
            <button onClick = {(e) => handleOnClick(e)}> Resetear filtros</button>
            </form>
        </div>
             <Paginado allDogs = {allDogs} dogPerPage = {dogPerPage} paginado = {paginado} className ="paginado"/>
             
         <div className="Card">
         {typeof currentDogs === "object" ? currentDogs.map((e) => {
          return(
            <div className="Card" key={e.id}>
                {
              <Link to ={`/home/${e.id}`}>
                  <Card name = {e.name} id = {e.id} weightmin = {e.weightmin} weightmax = {e.weightmax} heightmin = {e.heightmin} heightmax = {e.heightmax} temperament = {e.temperament} life_span = {e.life_span} breed = {e.breed} image = {e.image} key ={e.id}/>
              </Link>                  
                }
            </div>      
          )
        }): "No se encontraron perros"}
         </div>

    </div>
)}
    
