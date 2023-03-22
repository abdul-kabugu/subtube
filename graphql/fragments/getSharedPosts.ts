import {gql} from '@apollo/client'

export const GET_SHARED_POSTS = gql `
query Posts($where: PostWhereInput) {
    posts(where: $where) {
      body
      title
      id
      createdAtTime
    upvotesCount
    downvotesCount
    createdByAccount {
        id
        profileSpace {
          name
          image
          about
          id
        }
      }
      sharedPost {
        body
        title
        id
        image
        
        space {
          about
          id
  
        }
      }
        space {
          about
          image
          id
          name
        }
     }
    }
  

`