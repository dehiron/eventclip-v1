import { 
    createStore as reduxCreateStore, 
    combineReducers,
    applyMiddleware 
} from "redux";
import thunk from 'redux-thunk';
// import { connectRouter, routerMiddleware } from 'connected-react-router';
//reducersのインポート
import OwnersReducer from "../owners/reducers.js";
import EventsReducer from "../events/reducers.js";
// import { UsersReducer } from  "../users/reducers.js";

function createStore(){
    return reduxCreateStore(
        combineReducers( {
            // router: connectRouter(history),
            owners: OwnersReducer,
            events: EventsReducer,
            // users: usersReducer,
        }),
        applyMiddleware(
            // routerMiddleware(history)
            thunk
        )
    );
}

export default createStore;

