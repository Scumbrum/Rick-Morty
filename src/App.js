import './App.css';
import Pagination from "./Pagination";
import { ApolloConsumer} from "@apollo/client"
import { useDeferredValue, useEffect, useReducer, useState } from "react";
import getOAuth from './auth';
import List from './List';
import { filter, login, logout, onlyLiked } from './actions';

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState)
  const defferFilter = useDeferredValue(state.filter)
  const defferLiked = useDeferredValue(state.onlyLiked)

  useEffect(()=>{
    getOAuth()
    .then(data => {
      dispatch(login(data))
    })
  }, [])

  return (
    state.logined ? 
    <>
      <div className = "container-fluid bg-light py-3">
        <div className = "container-lg d-flex justify-content-center">
          <h1 className="text-center col-md-4 col-6 mb-0 text-secondary">Hello, {state.data.localizedFirstName}</h1>
          <button className='col-md-2 col-6 btn btn-secondary' type= "button" onClick={() => dispatch(logout())}>Logout</button>
        </div>
      </div>
      <div className="container-lg py-4">
        <div className="col-md-4 col-10 mx-auto mt-5">
          <div className="input-group">
            <input className="form-control me-2" placeholder="Character name" aria-label="Character name" value={state.filter} onChange={e => {dispatch(filter(e.target.value))}}/>
            <div className="input-group-append">
              <button className = {"btn btn-outline-success " + (state.onlyLiked ? "active" : "")} type="button" onClick={() => dispatch(onlyLiked(!state.onlyLiked))}>Liked</button>
            </div>
          </div>
        </div>
        <ApolloConsumer>
          {client => 
          <List 
            param = {defferFilter} 
            client = {client} 
            setter = {dispatch} 
            user = {state.data.id}
            onlyLiked = {defferLiked}/>}
        </ApolloConsumer>
        {/* <Pagination callBack={setCurrPage} count = {count} currPage = {currPage}/> */}
      </div>
    </>:
    <div className = "d-flex justify-content-center pt-5">
      <div className = "spinner-border text-light" role="status"/>
    </div>
  );
}

const initialState = {
  logined: false,
  data: {},
  filter: "",
  onlyLiked: ""
}

function appReducer(state, action) {
  switch (action.type) {
    case 'login':
      return {...state, logined: true, data: action.payload}
    case 'load':
      return {...state, data: action.payload}
    case 'filter':
      return {...state, filter: action.payload}
    case "onlyLiked":
      return {...state, onlyLiked: action.payload}
    case "logout":
      localStorage.removeItem("token")
      return {...state, logined: false, data: {}}
    default:
      return state
  }
}

