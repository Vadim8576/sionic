import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { createReducer } from 'redux-orm';
// import { orm } from '../orm/orm';
import reducer from './reducer';
import thunk from 'redux-thunk';



// const reducers = combineReducers({
//   orm: createReducer(orm)
// });


// let redusers = combineReducers({
//   reducer: reducer
// });




let store = createStore(reducer, applyMiddleware(thunk));


window.store = store;

export default store;