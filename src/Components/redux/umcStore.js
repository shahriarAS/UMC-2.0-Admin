// Package Import
import { createStore } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';

// Component Import
import UMCReducer from "./umcReducer"

const store = createStore(UMCReducer, composeWithDevTools())

export default store


// // Package Import
// import { createStore } from "redux"
// // import { composeWithDevTools } from 'redux-devtools-extension';

// // Component Import
// import UMCReducer from "./umcReducer"

// const store = createStore(UMCReducer)

// export default store