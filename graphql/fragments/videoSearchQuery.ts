import {gql} from '@apollo/client'

 export const SEARCH_VIDEO_QUERY = gql`
 query Posts($where: PostWhereInput) {
    posts(where: $where) {
      body
      id
      upvotesCount
      kind
      image
      downvotesCount
      followersCount
      format
      hidden
      title
    }
  }
 
 `