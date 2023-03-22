import { gql } from '@apollo/client'

export const GET_POSTS_BY_SPACE_ID = gql`
query GetPostBySpace($where: PostWhereInput) {
    posts (where: $where) {
      content,
      id
      image
      body
      title
       upvotesCount
       createdAtTime
        updatedAtTime
       createdByAccount {
         id
         profileSpace {
          about
          name
          image

        }
          
       }
      space {
        about
        id
        name
        postsCount
      }
  
    }
  }
`