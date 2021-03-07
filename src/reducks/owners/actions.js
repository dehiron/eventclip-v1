//actionsは必ずプレーンなObjectを返す

const LOG_IN = "LOG_IN";
const logInAction = (ownerState) => {
    return {
        type: "LOG_IN",
        payload: {
            isLoggedIn: true,
            id: ownerState.id,
            owner_pref_id: ownerState.owner_pref_id,
            // owner_password: ownerState.owner_password,
            owner_firstname: ownerState.owner_firstname,
            owner_lastname: ownerState.owner_lastname,
            date_of_birth: ownerState.date_of_birth,
            tel: ownerState.tel,
            email: ownerState.email,
            organization: ownerState.organization,
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
            owner_lastname: "",
            date_of_birth: "",
            tel: "",
            email: "",
            organization: "",
        }
    }
};

export { LOG_IN, logInAction, LOG_OUT, logOutAction }