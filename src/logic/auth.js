import { AUTH_URL, CLIENT_ID, CURRENT_URI, PROXY, STATE } from "./config";
import axios from "axios"
import qs from "qs"

export default async function getOAuth() {
    const token = await getToken()
    const response = await axios({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({action:token}),
        url: PROXY,

    })
    return response.data
}

async function saveToken() {
    let accessToken = await fetchAccesToken()
    accessToken = await axios({
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({code:accessToken}),
        url: PROXY,
    })
            
    const data = {
        ...accessToken.data,
        begin: new Date()
    }

    localStorage.setItem("token", JSON.stringify(data))
    return accessToken.data.access_token
}

async function getToken() {
    let accessToken = ""
    if(localStorage.getItem("token")) {
        accessToken = localStorage.getItem("token")
        accessToken = JSON.parse(accessToken)
        const delta = accessToken.expires_in
        const date = accessToken.begin
        if(new Date() > date + delta) {
            localStorage.removeItem("token")
            accessToken = saveToken()
        } else {
            accessToken = localStorage.getItem("token")
            accessToken = JSON.parse(accessToken).access_token
        }
    }
    else {
        try {
            accessToken = saveToken()
        } catch(e) {
            console.error(e)
        } 
    }
    return accessToken
}

async function fetchAccesToken() {
    const URL = `${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&scope=r_liteprofile&state=${STATE}&redirect_uri=${CURRENT_URI}`
    
    if(!window.location.search) {
        return await waitForAuth(URL)
    }
}

function waitForAuth(URL) {
    return new  Promise((resolve, reject) => {
        const popup = window.open(URL, "_blank", "width=600,height=600")
        window.addEventListener('message', (event) => receiveLinkedInMessage(event, resolve, reject, popup))
    })
}

function receiveLinkedInMessage({ origin, data: { state, code, error, ...rest}}, resolve, reject, popup) {
    if (origin !== window.location.origin || state !== STATE) return
    if (code) {
        resolve(code)
    } else if (error && !['user_cancelled_login', 'user_cancelled_authorize'].includes(error)) {
        reject(error)
    }
    popup.close()    
}
