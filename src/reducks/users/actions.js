//actionsは必ずプレーンなObjectを返す

// ここで定義している定数名と関数名に関してはOwnersで定義している物と同一にすると上書きの関係で混ざってしまうので注意
// 個別の定数名・関数名を書いてあげてごっちゃにならない様にするのがベター
const USER_LOG_IN = "USER_LOG_IN";
const userLogInAction = (userState) => {
    return {
        type: "USER_LOG_IN",
        payload: {
            isLoggedIn: true,
            id: userState.id,
            user_pref_id: userState.user_pref_id,
            // user_password: userState.user_password,
            user_firstname: userState.user_firstname,
            user_lastname: userState.user_lastname,
            date_of_birth: userState.date_of_birth,
            tel: userState.tel,
            email: userState.email,
        }
    }
};

const USER_LOG_OUT = "USER_LOG_OUT";
const userLogOutAction = () => {
    //サインアウト＝ステートを初期状態に戻す
    return {
        type: "USER_LOG_OUT",
        payload: {
            isLoggedIn: false,
            id: "",
            user_pref_id: "",
            user_firstname: "",
            user_lastname: "",
            date_of_birth: "",
            tel: "",
            email: "",
        }
    }
};

export { USER_LOG_IN, userLogInAction, USER_LOG_OUT, userLogOutAction }