import {gql} from '@apollo/client'

export const GET_USER_POSTS = gql`
query AccountById($accountByIdId: String!) {
    accountById(id: $accountByIdId) {
      id
      followersCount
      followingAccountsCount
       profileSpace {
         about
         name
         tagsOriginal
         image
         followersCount
         id
         interestsOriginal
         
       }
      posts {
        body
        title
        
        createdAtTime
        image
        id
        isComment
        parentPost {
          body
          title
          id
          createdAtTime
          upvotesCount
          image
          downvotesCount
          isComment
        }
        upvotesCount
      downvotesCount
        __typename
        createdByAccount {
          id
          profileSpace {
            about
            name
            image
  
          }
        }
      }
      followers {
        followerAccount {
          id
          ownedPostsCount
          activities {
            id
          }
        }
      }
    }
  }
`