import {useQuery} from "@apollo/client"
import { useEffect, useState } from "react"
import { FIELDS } from "../logic/hoooks"
import { GET_CHARACTER } from "../queries/characters"
export default function Profile({id, setter}) {
    const {loading, data} = useQuery(GET_CHARACTER, {variables: {
        id: id
    }})
    const [editor, setEditor] = useState(false)
    const [url, setUrl] = useState("")
    return (
        <div>
            {loading ? 
            <div className="d-flex justify-content-center pt-5 mb-5">
                <div className="spinner-border text-light" role="status"/>
            </div>:
            <div className="d-flex justify-ccontent-center flex-column">
                { editor ? 
                <div className="input-group">
                    <input className= "form-control" type="text" value={url} onChange={(e) => setUrl(e.target.value)}/>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-primary" onClick={()=> {setEditor(false);setter(id, url, FIELDS.IMAGE)}}>Apply</button>
                    </div>
                </div>: 
                <button type="button" className="btn btn-primary col-4 mx-auto" onClick={() => setEditor(true)}>Edit</button>}
                <div className="bg-dark rounded my-4 p-3">
                    <p>
                        Species: {data.character.species}
                    </p>
                    <p>
                        Gender: {data.character.gender}
                    </p>
                    <p>
                        Location: {data.character.location.name}
                    </p>
                    <p>
                        Episodes:
                    </p>
                    <ol>
                        {data.character.episode.map((episode, index) => <li key={index}>{episode.name}</li>)}
                    </ol>
                    <p>
                        Created: {data.character.created}
                    </p>
                </div>
            </div>}
        </div>
    )
}