import { 
    createStore as reduxCreateStore, 
    combineReducers,
    applyMiddleware 
} from "redux";
import thunk from 'redux-thunk';
//reducersのインポート
import OwnersReducer from "../owners/reducers.js";
import EventsReducer from "../events/reducers.js";
// import { UsersReducer } from  "../users/reducers.js";

function createStore(){
    return reduxCreateStore(
        combineReducers( {
            owners: OwnersReducer,
            events: EventsReducer,
            // users: usersReducer,
        }),
        applyMiddleware(
            thunk
        )
    );
}

export default createStore;

