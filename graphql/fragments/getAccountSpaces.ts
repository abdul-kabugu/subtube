import { gql } from "@apollo/client";

export const GET_ACCOUNT_SPACES = gql`
query Spaces($where: SpaceWhereInput) {
    spaces(where: $where) {
      about
      id
      image
      name
      username
    }
  }
`