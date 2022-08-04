import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetail } from "../actions";
import { useParams } from "react-router-dom";
import "./Detail.css";



export default function Detail (){
    

const dispatch = useDispatch()
const { id } = useParams();



useEffect(() => {    
    dispatch(getDetail(id));
}, [dispatch])

const myDog = useSelector((state)=> state.detail)

    
 return (
    <div className ="detail-container">         
        <div>
            <h1>{myDog.name}</h1>
            <div>
                <img src={myDog.image ? myDog.image : "https://previews.123rf.com/images/monicaclick/monicaclick1705/monicaclick170500032/79248182-perro-pug-con-amarillo-constructor-trabajador-casco-y-cono-de-seguridad-adem%C3%A1s-de-se%C3%B1al-de-advertenc.jpg"} width = "300px" alt="imagen"/>
            <div>
            <div> 
                <h2 >Altura: </h2>
                <p> {myDog.heightmin}  - {myDog.heightmax}  Centimetros</p>
            </div>
            <div>
            <h2>Peso: </h2>
                <p> {myDog.weightmin} - {myDog.weightmax}  Kilogramos</p>
            </div>
            <div>
            <h2 >Tiempo de Vida: </h2>
                
                <p>{myDog.life_span}  Años</p>
            </div>
            <div>
            <h2 >Raza: </h2>
                
                <p>{myDog.breed} </p>
            </div>
            <div>
            <h2 >Temperamento: </h2>
                
                <p>{myDog.temperament} </p>
            </div>
            
        </div> </div>  </div>
        
    <Link to= '/home'><button>Volver</button></Link>
    </div>
 )

 }