import { useState } from "react";
import { AUTH_URL, CLIENT_ID, CURRENT_URI, STATE } from "./config";



export default function useOAuth() {
    const [accessToken, setAccessToken] = useState("")
    if(!accessToken && localStorage.getItem("token")) {
        setAccessToken(localStorage.getItem("token"))
    }
    else if(!accessToken) {
        setAccessToken(fetchAccesToken())
    }
}

async function fetchAccesToken() {
    const URL = `${AUTH_URL}?
    response_type=code&
    client_id=${CLIENT_ID}&
    scope=r_liteprofile&
    state=${STATE}&
    redirect_uri=${CURRENT_URI}`
    const data = await fetch(URL, {
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    })

}