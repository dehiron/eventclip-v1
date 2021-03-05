//reduxモジュールのインポート
import { 
    createStore as reduxCreateStore, 
    combineReducers 
} from "redux";
//reducersのインポート
import OwnersReducer from "../owners/reducers.js";
import EventsReducer from "../events/reducers.js";
// import { UsersReducer } from  "../users/reducers.js";

function createStore(){
    return reduxCreateStore(
        combineReducers( {
            owners: OwnersReducer,
            events: EventsReducer,
        })
    )
}

export default createStore;

