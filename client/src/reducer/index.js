const inicialState = {
    dogs: [],
    allDogs: [],
    temps: [],
    breeds: [],
    detail: []}

    function rootReducer (state = inicialState, action) {
        switch (action.type) {
        case "GET_DOGS":
            return {
                ...state,
                allDogs: action.payload,
                dogs: action.payload
            }
        case "GET_TEMPS":
            return {
                ...state,
                temps: action.payload && action.payload.sort(function (a, b){
                    if(a.name.toLowerCase() < b.name.toLowerCase()) return -1
                    if(a.name.toLowerCase() > b.name.toLowerCase()) return 1
                    return 0;
                   })
            }
        case "GET_BREEDS":
            const dogsBreeds = state.allDogs
            const allDogsBreeds = dogsBreeds.filter((e) => (e.breed && e.breed)).map((e) => e.breed)
            const allDogsBreeds2 = new Set (allDogsBreeds)
            const allDogsBreeds3 = [...allDogsBreeds2]
            allDogsBreeds3.sort(function (a, b){
                 if(a.toLowerCase() < b.toLowerCase()) return -1
                 if(a.toLowerCase() > b.toLowerCase()) return 1
                 return 0;
                })
            return {
                ...state,
                breeds: allDogsBreeds3

            }
        case "FILTER_BY_TEMP":
            const allDogs = state.allDogs;
            const filterTemps = action.payload === "all" ? allDogs : allDogs.filter(e => (e.temperament && e.temperament.split(",").some((e)=> e.trim()===action.payload) ))
            return {
                ...state,
                dogs: filterTemps
            }
        case "FILTER_BREED":
            const allDogs2 = state.allDogs;
            const filterBreed = action.payload === "all" ? allDogs2 : allDogs2.filter(e => (e.breed && e.breed === action.payload))
            return {
                ...state,
                dogs: filterBreed
            }
        case "ORDER_BY_NAME":
            const orderName = action.payload === "alf asc" ? state.allDogs.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                    return 0;
            })
                : state.allDogs.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                }
                if (a.name < b.name) {
                    return 1;
                }
                    return 0;
            });
                return {
                  ...state,
                  dogs: orderName,
                };
          
        case "ORDER_BY_WEIGHT":
            const orderWeight = action.payload === "weightmin" ? state.allDogs.sort((a, b) => {
                if (parseInt(a.weightmin) > parseInt(b.weightmin)) {
                    return 1;
                }
                if (parseInt(a.weightmin) < parseInt(b.weightmin)) {
                    return -1;
                }
                    return 0;
            })
            : state.allDogs.sort((a, b) => {
                if (parseInt(a.weightmin) > parseInt(b.weightmin)) {
                    return -1;
                }
                if (parseInt(a.weightmin) < parseInt(b.weightmin)) {
                    return 1;
                }
                    return 0;
            });
                return {
                  ...state,
                  dogs: orderWeight,
                };
        case "SEARCH_NAME":
            return {
                ...state,
                dogs: action.payload === '' ? state.allDogs : action.payload
            }
            case "GET_DETAILS":
                return{
                ...state,
                detail: action.payload[0]
                }
            case "POST_DOG":
            return{
                ...state
            }
        default: 
        return state;
            }}
                

    export default rootReducer;
