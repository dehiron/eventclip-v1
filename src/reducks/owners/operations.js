import { signInAction } from "./actions";
// import { push } from "connected-react-router";

const signIn = (email, password) => {
    return async (dispatch, getState) => {

        const state = getState();
        const isSignedIn = state.owners.isSignedIn;

        if (!isSignedIn) {
            //　実際は何かしらの処理がここに入る
            // const ownerData = await emailSignIn(email,password)

            // 今回は下記のサンプル
            const url = "https://api.github.com/users/dehiron"
            const response = await fetch(url).then(res => res.json()).catch(() => null)
            const githubUsername = response.login

            dispatch(signInAction({
                isSignedIn: true,
                owner_pref_id: "hoge",
                owner_first_name: "hogeo"
            }))
            // 今回はこれ使えないので、signInが発火するonClickの次の処理でprops.history.push~で遷移させる?
            // dispatch(push("/"))
        }
    }
}

export { signIn }