import * as Actions from './actions';
import initialState from '../store/initialState';

// 第一引数: 基本的には現在のストアの状態だが、指定されていなければデフォルトでownersの初期値が入る
// 第二引数: 同階層にあるactionsのファイル内のモジュールがreturnした値
function EventsReducer(state = initialState.events, action){
    switch (action.type) {
        case Actions.a:
            return {
                ...state, //スプレッド構文、中身を展開して下のaction.payloadの中身のマージしてる。
                ...action.payload
                //上書きの概念に気をつける。
                //actionから渡されてないステートに関しては、現在のストアの状態＝...stateのままでいいという指向が取り入れられてる。
            }
        default:
            return state
    };
}

export default EventsReducer;