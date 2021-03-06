//actionsは必ずプレーンなObjectを返す

const SIGN_IN = "SIGN_IN";
const signInAction = (ownerState) => {
    return {
        type: "SIGN_IN",
        payload: {
            isSignedIn: true,
            id: ownerState.id,
            owner_pref_id: ownerState.owner_pref_id,
            owner_firstname: ownerState.owner_firstname,
        }
    }
};

const SIGN_OUT = "SIGN_OUT";
const signOutAction = () => {
    //サインアウト＝ステートを初期状態に戻す
    return {
        type: "SIGN_OUT",
        payload: {
            isSignedIn: false,
            id: "",
            owner_pref_id: "",
            owner_firstname: "",
        }
    }
};

export { SIGN_IN, signInAction, SIGN_OUT, signOutAction }