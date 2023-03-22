// @ts-nocheck
import {useQuery} from '@apollo/client'
import { GET_USER_PROFILE } from '../graphql/fragments/getUserProfile'


export  const  useGetUserProfile = (accountId) => {
    
 const {} = useQuery(GET_USER_PROFILE, {
    variables : {
      accountByIdId : accountId
    }
 })
}