// import { applyMiddleware} from "redux"
// import { configureStore } from '@reduxjs/toolkit'
// import {composeWhitDevTools} from "redux-devtools-extension"
// import thunk from "redux-thunk"
// import rootReducer from "../reducer"


// const store = configureStore({
//     reducer:rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
//     devTools: process.env.NODE_ENV !== 'production',
    
//   })

// export default store

import { createStore, applyMiddleware } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import rootReducer  from '../reducer';

export const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))

export default store
