import React from "react";
import "./Card.css";

export default function Card({name,id, weightmin, weightmax, heightmin, heightmax, life_span, temperament, breed, image}){
    return (
        <div className = "card_container">
            <div className = "image_container">
            <img className = "img" src = {image ? image : "https://previews.123rf.com/images/monicaclick/monicaclick1705/monicaclick170500032/79248182-perro-pug-con-amarillo-constructor-trabajador-casco-y-cono-de-seguridad-adem%C3%A1s-de-se%C3%B1al-de-advertenc.jpg"}  alt={`imagen de: ${name}`}/>
            </div>
            <div className = "h-container">
            <h3> Nombre: {name.toUpperCase()} </h3>
            <h5> Altura: {heightmin} - {heightmax} cm</h5>
            <h5> Peso: {weightmin} - {weightmax} kg</h5>
            {/* <h5> Tiempo de vida: {life_span}</h5>
            <h5> Temperamento: {temperament}</h5>
            <h5> Raza: {breed}</h5> */}
            </div>
        </div>
    )
}