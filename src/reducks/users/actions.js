//actionsは必ずプレーンなObjectを返す

const LOG_IN = "LOG_IN";
const logInAction = (userState) => {
    return {
        type: "LOG_IN",
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

const LOG_OUT = "LOG_OUT";
const logOutAction = () => {
    //サインアウト＝ステートを初期状態に戻す
    return {
        type: "LOG_OUT",
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

export { LOG_IN, logInAction, LOG_OUT, logOutAction }