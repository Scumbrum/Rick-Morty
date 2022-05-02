import './App.css';
import Pagination from "./Pagination";
import { ApolloConsumer} from "@apollo/client"
import { useDeferredValue, useState } from "react";
import useOAuth from './auth';
import List from './List';

export default function App() {
  const data = useOAuth()
  const [filter, setFilter] = useState("")
  const deffer = useDeferredValue(filter)

  return (
    <div className="App">
      <input value={filter} onChange={e => {setFilter(e.target.value)}}></input>
      <ApolloConsumer>
        {client => <List filter = {deffer} client = {client} setter = {setFilter}/>}
      </ApolloConsumer>
      {/* <Pagination callBack={setCurrPage} count = {count} currPage = {currPage}/> */}
    </div>
  );
}

