import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createReducer } from 'redux-orm';
import { orm } from '../orm/orm';
import productReducer from './productsReducer';



const reducers = combineReducers({
  orm: createReducer(orm)
});



let store = createStore(reducers, applyMiddleware(thunkMiddleware));


window.store = store;

export default store;