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



