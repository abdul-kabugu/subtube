import {gql} from '@apollo/client'

export const GET_TRENDING_VIDEOS = gql`
query Posts($where: PostWhereInput) {
    posts(where: $where) {
      body
      canonical
      content
      title
      image
      id
      createdAtTime
      upvotesCount
      createdByAccount {
        id
        usernames
        profileSpace {
          about
          content
          handle
          image
          id
          name
          username
          summary
          email
          createdAtTime
        }
      }
      kind
    }
  }
`