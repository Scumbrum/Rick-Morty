"987"
"https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=789jd4u6k06nv1&scope=r_liteprofile&state=999&redirect_uri=http%3A%2F%2Flocalhost%3A3000"
import {useQuery} from "@apollo/client"
import { useEffect } from "react"
import { GET_CHARACTER } from "./queries/characters"
export default function Profile({id}) {
    const {loading, data, error} = useQuery(GET_CHARACTER, {variables: {
        id: id
    }})
    return (
        <div>
            {loading ? <h1>Loading...</h1>:
            <div>
                <p>
                    {data.character.species}
                </p>
                <p>
                    {data.character.gender}
                </p>
                <p>
                    {data.character.location.name}
                </p>
                <p>
                    {data.character.episode.map(ep => <span>{ep.name}</span>)}
                </p>
                <p>
                    {data.character.created}
                </p>
            </div>}
        </div>
    )
}