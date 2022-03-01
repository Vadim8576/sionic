import { createReducer, ORM } from 'redux-orm';
import Products from './models';



const orm = new ORM({
  stateSelector: state => state.orm,
});



orm.register(Products);

const reducer = createReducer(orm);

export { orm, reducer };
