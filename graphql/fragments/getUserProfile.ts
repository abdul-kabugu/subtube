import {gql} from '@apollo/client'

export const GET_USER_PROFILE = gql `
query AccountById($accountByIdId: String!) {
    accountById(id: $accountByIdId) {
      id
       followersCount
       followingAccountsCount
        
      profileSpace {
        about
        name
        followersCount
        canFollowerCreatePosts
        id
        image
        summary
        email
        handle
        hidden
        hiddenPostsCount
        interestsOriginal
        tagsOriginal
        username
      }
    }
  }

`