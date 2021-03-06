import { 
    createStore as reduxCreateStore, 
    combineReducers,
    applyMiddleware 
} from "redux";
import thunk from 'redux-thunk';
import OwnersReducer from "../owners/reducers.js";
import EventsReducer from "../events/reducers.js";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    owners: OwnersReducer,
    events: EventsReducer,
});

// 永続化の設定
const persistConfig = {
    key: 'root', // Storageに保存されるキー名を指定する
    storage, // 保存先としてlocalStorageがここで設定される
    whitelist: ['owners'] // Stateは`owners`のみStorageに保存する
    // blacklist: ['events'] // `events`は保存しない
}

const persistedRudecer = persistReducer(persistConfig, rootReducer);

const store = reduxCreateStore(
    persistedRudecer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(
        thunk
    )
)

export const persistor = persistStore(store)
export default store;


