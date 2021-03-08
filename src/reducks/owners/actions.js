//actionsは必ずプレーンなObjectを返す

// ここで定義している定数名と関数名に関してはUsersで定義している物と同一にすると上書きの関係で混ざってしまうので注意
// 個別の定数名・関数名を書いてあげてごっちゃにならない様にするのがベター
const OWNER_LOG_IN = "OWNER_LOG_IN";
const ownerLogInAction = (ownerState) => {
    return {
        type: "OWNER_LOG_IN",
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

const OWNER_LOG_OUT = "OWNER_LOG_OUT";
const ownerLogOutAction = () => {
    //サインアウト＝ステートを初期状態に戻す
    return {
        type: "OWNER_LOG_OUT",
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

export { OWNER_LOG_IN, ownerLogInAction, OWNER_LOG_OUT, ownerLogOutAction }