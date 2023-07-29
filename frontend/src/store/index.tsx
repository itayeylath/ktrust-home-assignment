
import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';

const composeEnhancers = compose;

const rootReducer = combineReducers({
  

});
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));