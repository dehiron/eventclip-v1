import {createSelector} from "reselect";

//storeに入っているownersに関する全てのstateの情報
const ownersSelector = (state) => state.owners;

const getOwnerPrefId = createSelector(
    [ownersSelector],
    //storeに入っているownersの指定のstateを取り出す
    state => state.owner_pref_id 
)

export {getOwnerPrefId};
