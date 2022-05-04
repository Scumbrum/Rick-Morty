import { useEffect, useReducer, useState } from "react"
import { getAllCharacters } from "../queries/characters"
import { useMemo } from "react"
import Profile from "./Profile"
import { FIELDS, useData } from "../logic/hoooks"
import { NO_IMAGE } from "../logic/config"
import { filter, loaded, select } from "../logic/actions"
import LikeControlls from "./LikeControlls"

export default function List({param, client, setter, user, onlyLiked}) {

    const [innerState, dispatch] = useReducer(reducer, initialState)
    const [marks, setMarks] = useData(user)

    useEffect(() => {
            getAllCharacters(client)
            .then(r => {
                dispatch(loaded(r))
            })
    }, [])

    const filtered = useMemo(() => {
        return doFilter(innerState.characters, param, onlyLiked, marks)
    }, [param, innerState.characters, onlyLiked])

    const handler = (character) => {
        setter(filter(character.name))
        dispatch(select(character.id))
    }
    return (
        <div className="col-md-8 col-12 mx-auto row mt-5">
            {innerState.loading ?
            <div className="d-flex justify-content-center pt-5">
                <div className="spinner-border text-light" role="status"/>
            </div> :
            getList(filtered, handler, innerState.selected, marks, setMarks)}
        </div>
    )
}

const initialState = {
    loading: true,
    characters: [],
    selected: -1,
}

function reducer(state, action) {
    switch(action.type) {
        case 'loaded':
            return {...state, loading: false, characters: action.payload}
        case 'select':
            return {...state, selected: action.payload}
        default:
            return state
    }
}

function getList(filtered, handler, selected, marks, setMarks) {
    return filtered
    .map(character => characterMapper(character, handler, selected, marks, setMarks))
}


function doFilter(characters, param, onlyLiked, additionData) {
    let output = characters.filter(character => character.name.toLowerCase().includes(param.toLowerCase()))
    if(onlyLiked) {  
        output = output
        .filter(character => additionData[character.id] && additionData[character.id][FIELDS.STATUS] === 1)
    }
    return output
}

function characterMapper(character, handler, selected, marks, setData) {
    const status = getStatus(character.id, marks)
    const image = getImage(character.id, marks)

    const likeHandler = (event, id) => {
        event.stopPropagation()
        setData(id, 1, FIELDS.STATUS)
    }

    const dislikeHandler = (event, id) => {
        event.stopPropagation()
        setData(id, -1, FIELDS.STATUS)
    }

    return (
      <div className = "card col-12 p-0 bg-info mb-4" onClick = {() => handler(character)} key = {character.id}>
        <img src = {image} alt = {character.name}/>
            <div className="card-body">
            <h1 className="text-danger">{character.name}</h1>
            <h3 className="">{character.status}</h3>
            {selected === character.id ?
            <Profile id = {character.id} setter = {setData}/> :
            null}
            <LikeControlls 
                character={character.id}
                dislikeHandler={dislikeHandler}
                likeHandler ={likeHandler}
                status={status}/>
            </div>
      </div>
    )
}
  

function getStatus(id, data) {
    if( data[id] && data[id][FIELDS.STATUS]) {
        return data[id][FIELDS.STATUS]
    } else {
        return 0
    }
}

function getImage(id, data) {
    if( data[id] && data[id][FIELDS.IMAGE]) {
        return data[id][FIELDS.IMAGE]
    } else {
        return NO_IMAGE
    }
}
  