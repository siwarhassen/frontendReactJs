import ACTIONS from './index'
import axios from 'axios'



export const fetchAllUsersAccepted = async (id) => {
    const res = await axios.get(`https://aaweni.herokuapp.com/accept/afficherJob/${id}`)
    return res
}

export const dispatchGetAllUsers_accepted =  (res) => {
   
    return {
        type: ACTIONS.GET_ALL_USERS_ACCEPTED,
        payload: res.data
    }
}