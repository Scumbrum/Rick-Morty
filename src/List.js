import { useEffect, useState } from "react"
import { getAllCharacters } from "./queries/apollo"
import { useMemo } from "react"
import Profile from "./Profile"

export default function List({filter, client, setter}) {
    const [loading, setLoading] = useState(true)
    const [characters, setCharacters] = useState([])
    const [selected, setSelected] = useState(-1)

    useEffect(() => {
        setCharacters(JSON.parse(localStorage.getItem("data")))
        setLoading(false)
        // getAllCharacters(client)
        // .then(r => {
        //     setLoading(false)
        //     localStorage.setItem("data", JSON.stringify(r))
        //     setCharacters(r)
        // })
    }, [])

    const filtered = useMemo(() => {
        return characters.filter(character => character.name.toLowerCase().includes(filter.toLowerCase()))
    }, [filter, characters])

    const handler = (character) => {
        setter(character.name)
        setSelected(character.id)
    }

    return (
        <div>
            {loading ? <h1>Loading...</h1> : filtered.map(character => characterMapper(character, handler, selected))}
        </div>
    )
}


function characterMapper(character, handler, selected) {
    return (
      <div onClick={() => handler(character)} key = {character.id}>
        <h1>{character.name}</h1>
        <p>{character.status}</p>
        {selected === character.id ?
        <Profile id = {character.id}/> :
        null}
      </div>
    )
  }
  
  