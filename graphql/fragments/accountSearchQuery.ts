import {gql} from '@apollo/client'

export const GET_ACCOUNT_DEARCH_QUERY = gql`
query Accounts($where: AccountWhereInput) {
    accounts(where: $where) {
      id
      usernames
      profileSpace {
        handle
        id
        name
        followersCount
        image
        username
      }
    }
  }


`