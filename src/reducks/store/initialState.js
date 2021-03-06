//ストアの初期状態、アプリを起動した時のstateの初期状態
//アプリに必要なstateを全て記述（まじか）
const initialState = {
    events:{

    },
    users:{

    },
    owners: {
        isSignedIn: false,
        id: "",
        owner_pref_id: "",
        owner_firstname:"",
    }

}

export default initialState;