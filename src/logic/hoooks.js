import { useState } from "react"
import { NEUTRAL } from "./config"

export const FIELDS = {
    STATUS: "status",
    IMAGE: "image"
}

function setData(user, character, status, setter, field) {
    let data = localStorage.getItem(user)
    data = JSON.parse(data)
    if(!data) {
        data = {}
    }
    if (field === FIELDS.STATUS) {
        setMark(data, character, status)
    } else {
        setImage(data, character, status)
    }
    localStorage.setItem(user, JSON.stringify(data))
    setter({...data})
}

function setImage(data, character, status) {
    if(!data[character]) {
        data[character] = {[FIELDS.IMAGE]: status}
    } else {
        data[character][FIELDS.IMAGE] = status
    }
}

function setMark(data, character, status) {
    if(!data[character]) {
        data[character] = {[FIELDS.STATUS]: NEUTRAL}
    }
    const currStatus = data[character][FIELDS.STATUS]
    if(currStatus === status) {
        data[character][FIELDS.STATUS] = NEUTRAL
    } else {
        data[character][FIELDS.STATUS] = status
    }
}

function getData(user) {
    let data = localStorage.getItem(user)
    if(!data) {
        data = "{}"
        localStorage.setItem(user, data)
    }
    data = JSON.parse(data)
    if(data) {
        return data
    } else {
        return {}
    }
}

export function useData(user){
    const [marks, setter] = useState(getData(user))
    const caller = (character, status, field) => setData(user, character, status, setter, field)
    return [marks, caller]
}