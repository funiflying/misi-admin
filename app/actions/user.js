import URL from '../utils/constant'
import api from '../api'

const USER_CREATE="USER_CREATE";
export const USER_CREATE_PENDING="USER_CREATE_PENDING";
export const USER_CREATE_ERROR="USER_CREATE_ERROR";
export const USER_CREATE_SUCCESS="USER_CREATE_SUCCESS";

const USER_LIST="USER_LIST";
export const USER_LIST_PENDING="USER_LIST_PENDING";
export const USER_LIST_ERROR="USER_LIST_ERROR";
export const USER_LIST_SUCCESS="USER_LIST_SUCCESS";

const USER_REMOVE="USER_REMOVE";
export const USER_REMOVE_PENDING="USER_REMOVE_PENDING";
export const USER_REMOVE_ERROR="USER_REMOVE_ERROR";
export const USER_REMOVE_SUCCESS="USER_REMOVE_SUCCESS";

export  function createUser(params) {
    return{
        type:USER_CREATE,
        payload:{
            promise:api.post(URL.USER_CREATE,{data:params})
        }
    }
}
export  function getUserList() {
    return{
        type:USER_LIST,
        payload:{
            promise:api.get(URL.USER_LIST)
        }
    }
}
export  function removeUser(params) {
    return{
        type:USER_REMOVE,
        payload:{
            promise:api.post(URL.USER_REMOVE,{data:params})
        }
    }
}