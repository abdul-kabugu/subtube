import {gql} from '@apollo/client'


export const GET_INTERESTED_VIDEOS =gql`
query Posts($where: PostWhereInput) {
    posts(where: $where) {
      body
      upvotesCount
      repliesCount
      content
      createdAtTime
      title
      kind
      
      createdByAccount {
        id
        usernames
        profileSpace {
          about
          email
          handle
          id
          image
          name
          username
        }
      }
      id
      id
      image
      isComment
      isShowMore
      sharesCount
    }
  }

`