import {gql} from '@apollo/client'

export const GET_AMPLIFIED_VIDEOS = gql`

query AccountById($accountByIdId: String!, $where: PostWhereInput) {
    accountById(id: $accountByIdId) {
      id
     
      usernames
      posts(where: $where) {
        body
        content
        createdAtTime
        createdByAccount {
          id
          followersCount
          followingAccounts {
            followerAccount {
              id
              usernames
            }
          }
          ownedPostsCount
          profileSpace {
            about
            email
            handle
            image
            id
            name
            summary
            summary
            username
          }
          usernames
          usernames
          updatedAtTime
        }
        space {
          name
        }
        id
        image
        kind
        kind
        upvotesCount
        sharesCount
        tagsOriginal
        title
        repliesCount
        reactionsCount
        hidden
      }
    }
  }
  

`