//actionsは必ずプレーンなObjectを返す

const LOG_IN = "LOG_IN";
const logInAction = (ownerState) => {
    return {
        type: "LOG_IN",
        payload: {
            isLoggedIn: true,
            id: ownerState.id,
            owner_pref_id: ownerState.owner_pref_id,
            owner_firstname: ownerState.owner_firstname,
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
            owner_pref_id: "",
            owner_firstname: "",
        }
    }
};

export { LOG_IN, logInAction, LOG_OUT, logOutAction }