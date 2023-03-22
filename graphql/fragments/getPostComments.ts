import {gql} from '@apollo/client'

export const GET_POST_COMMENTS = gql`
query GET_COMMENTS($where: PostWhereInput) {
    posts(where: $where) {
    body
    title,
    id
    createdAtTime
    content
    isComment
    upvotesCount
    downvotesCount
    hidden
    image
    createdByAccount {
      followersCount
      id
      profileSpace {
        about
        name
        image

      }
    }
    }
  }
`