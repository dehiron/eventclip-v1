//ストアの初期状態、アプリを起動した時のstateの初期状態
//アプリに必要なstateを全て記述（まじか）
const initialState = {
    events:{

    },
    users:{

    },
    owners: {
        isLoggedIn: false,
        id: "",
        owner_pref_id: "",
        // owner_password: "",
        owner_firstname:"",
        owner_lastname:"",
        date_of_birth:"",
        tel:"",
        email:"",
        organization:"",
    }

}

export default initialState;