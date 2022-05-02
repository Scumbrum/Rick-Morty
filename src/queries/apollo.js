import { GET_CHARACTERS } from "./characters"


export async function getAllCharacters(client) {
    const promises = []
    const data = await client.query({query: GET_CHARACTERS, variables: {
        page: 1
    }})
    for(let i = 2; i <= data.data.characters.info.pages; i++) {
        promises.push(client.query(
            {query: GET_CHARACTERS,
            variables: {
                page: i
            }}
        ))
    }
    const output = await Promise.all(promises)
    const characters = [...data.data.characters.results]
    for(let query of output) {
        characters.push(...query.data.characters.results)
    }
    return characters
}