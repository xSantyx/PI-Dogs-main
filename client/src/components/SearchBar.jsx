import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux"
import {SearchDogs} from "../actions"

function SearchBar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(SearchDogs(input))
    }

    const handleOnChange = (e) => {
        e.preventDefault();
        setInput(e.target.value)
        dispatch(SearchDogs(e.target.value))
    }
    
    return (
        <form onSubmit = {(e) => handleSubmit(e)} id = "mySearch">
        <input type = "text" placeholder = "Buscar..." onChange = {handleOnChange}/> 
        <button type = "submit"> Buscar</button>
        </form>      
    
)
    }

    export default SearchBar;

