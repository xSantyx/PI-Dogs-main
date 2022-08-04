import axios from "axios";

export function getAllDogs() {
return async function (dispatch) {
const json = await axios.get ("http://localhost:3001/dogs")
return dispatch({
    type: "GET_DOGS",
    payload: json.data
})
}
}
export function getAllTemps() {
    return async function (dispatch) {
    const json = await axios.get ("http://localhost:3001/temps")
    return dispatch({
        type: "GET_TEMPS",
        payload: json.data
    })
    }
    }
    export function getAllBreeds() {
        return async function (dispatch) {
            const json = await axios.get ("http://localhost:3001/dogs")
            return dispatch({
                type: "GET_BREEDS",
                payload: json.data
            })
        }
    }
export function filterByTemp(payload) {
    return {
            type: "FILTER_BY_TEMP",
            payload
        }
}

export function filterBreed(payload) {
    return {
            type: "FILTER_BREED",
            payload
        }
}
export function orderByName(payload) {
    return { 
        type: "ORDER_BY_NAME",
        payload
    }
};

export function orderByWeight(payload) {
    return { 
        type: "ORDER_BY_WEIGHT",
        payload
    }
};

export function SearchDogs(payload) {
    return async function (dispatch) {
    try {
        const json = await axios.get (`http://localhost:3001/dogs?name=${payload}`)
        return dispatch({
            type: "SEARCH_NAME",
            payload: json.data
        })
        
        
    } catch (error) {
        return dispatch({
            type: "SEARCH_NAME",
            payload: "1"
        })
    }
}}
    export function getDetail(id){
        return async function (dispatch){
            
            const json = await axios.get("http://localhost:3001/dogs/" + id);            
            return dispatch ({
                type: 'GET_DETAILS',
                payload: json.data
            })
            
        }
    }

    export function postDog(payload){
        return async function () {            
            payload.temperament = payload.temperament.toString().split(",").join(", ")           
            const json = await axios.post("http://localhost:3001/dogs", payload);            
            return json
        }
    }