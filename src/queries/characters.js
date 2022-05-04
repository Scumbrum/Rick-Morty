import {gql} from "@apollo/client"

export const GET_CHARACTERS = gql`
  query Feed($page: Int) {
      characters(page: $page) {
          info {
            pages
          }
          results {
            id,
            name,
            status
          }
        }
  }`
export const GET_CHARACTER = gql`
  query Feed($id: ID!) {
    character(id: $id) {
      id,
      name,
      species,
      gender,
      location {
        name
      },
      episode {
        name
      }
      status,
      created
    }
  }`


  export async function getAllCharacters(client) {
    let characters = []
    if(localStorage.getItem("data")) {
      characters = localStorage.getItem("data")
      characters = JSON.parse(characters)
      const end = characters.end
      if(new Date().getTime() > end) {
        localStorage.removeItem("data")
        characters = await fetchCharacters(client)
        const data = {
          characters : characters,
          end: new Date().getTime() + 2 * 86400000
        }
        localStorage.setItem("data", JSON.stringify(data))
      } else {
        characters = characters.characters
      }
    } else {
      characters = await fetchCharacters(client)
      const data = {
        characters : characters,
        end: new Date().getTime() + 2 * 86400000
      }
      localStorage.setItem("data", JSON.stringify(data))
    }
    return characters
}

async function fetchCharacters(client) {
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



