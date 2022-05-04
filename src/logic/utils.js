import { STATE } from "./config"

const queryToObject = queryString => {
    const pairsString = queryString[0] === '?' ? queryString.slice(1) : queryString
    const pairs = pairsString
      .split('&')
      .map(str => str.split('=').map(decodeURIComponent))
    return pairs.reduce((acc, [key, value]) => key ? { ...acc, [key]: value } : acc, {})
  }
  
export const  sendMessage = () => {
    if (window.location.search) {
        const params = queryToObject(window.location.search)
        if (params.state === STATE && window.opener) {
          window.opener.postMessage(params)
        }
      }
}