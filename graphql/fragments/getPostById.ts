import {gql} from '@apollo/client'

export const GET_POST_BY_ID = gql `
query PostById($postByIdId: String!) {
    postById(id: $postByIdId) {
      
      body
      content
      createdAtTime
  
      createdByAccount {
        id
        followersCount
        followingAccountsCount
        followingSpacesCount
        profileSpace {
          about
          name
          image
  
        }
        
      }
      createdOnDay
      downvotesCount
      upvotesCount
      hidden
      image
      isComment
      isShowMore
      id
      
      followersCount
      publicRepliesCount
      repliesCount
      title
      tagsOriginal
      space {
        name
        id
        image
        about
      }
    }
  }

`