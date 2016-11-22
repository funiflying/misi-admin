import URL from '../utils/constant'
import api from '../api'

const ROLE_CREATE="ROLE_CREATE";
export const ROLE_CREATE_PENDING="ROLE_CREATE_PENDING";
export const ROLE_CREATE_ERROR="ROLE_CREATE_ERROR";
export const ROLE_CREATE_SUCCESS="ROLE_CREATE_SUCCESS";

const ROLE_REMOVE="ROLE_REMOVE";
export const ROLE_REMOVE_PENDING="ROLE_REMOVE_PENDING";
export const ROLE_REMOVE_ERROR="ROLE_REMOVE_ERROR";
export const ROLE_REMOVE_SUCCESS="ROLE_REMOVE_SUCCESS";

const ROLE_LIST="ROLE_LIST";
export const ROLE_LIST_PENDING="ROLE_LIST_PENDING";
export const ROLE_LIST_ERROR="ROLE_LIST_ERROR";
export const ROLE_LIST_SUCCESS="ROLE_LIST_SUCCESS";

export  function createRole(params) {
    return{
        type:ROLE_CREATE,
        payload:{
            promise:api.post(URL.ROLE_CREATE,{data:params})
        }
    }
}
export  function getRoleList() {
    return{
        type:ROLE_LIST,
        payload:{
            promise:api.get(URL.ROLE_LIST)
        }
    }
}
export function removeRole(params) {
    return{
        type:ROLE_REMOVE,
        payload:{
            promise:api.post(URL.ROLE_REMOVE,{data:params})
        }
    }
}