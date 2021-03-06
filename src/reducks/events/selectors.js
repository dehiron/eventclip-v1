import {createSelector} from "reselect";

//storeに入っているownersに関する全てのstateの情報
const eventsSelector = (state) => state.events;

const getEventId = createSelector(
    [eventsSelector],
    //storeに入っているownersの指定のstateを取り出す
    state => state.event_id 
)

export {getEventId};
