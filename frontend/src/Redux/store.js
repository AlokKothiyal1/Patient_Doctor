import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import authReducer from './login/reducer';
import patientReducer from './patient/reducer'


const rootReducer = combineReducers({
    auth: authReducer,
    patientReducer:patientReducer
});

const thunk = (store) => (next) => (action) => {
    typeof action === 'function' ? action(store.dispatch) : next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));