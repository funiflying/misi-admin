import URL from '../utils/constant'
import api from '../api'

const CATEGORY_CREATE="CATEGORY_CREATE";
export const CATEGORY_CREATE_PENDING="CATEGORY_CREATE_PENDING";
export const CATEGORY_CREATE_ERROR="CATEGORY_CREATE_ERROR";
export const CATEGORY_CREATE_SUCCESS="CATEGORY_CREATE_SUCCESS";

const CATEGORY_REMOVE="CATEGORY_REMOVE";
export const CATEGORY_REMOVE_PENDING="CATEGORY_REMOVE_PENDING";
export const CATEGORY_REMOVE_ERROR="CATEGORY_REMOVE_ERROR";
export const CATEGORY_REMOVE_SUCCESS="CATEGORY_REMOVE_SUCCESS";

const CATEGORY_LIST="CATEGORY_LIST";
export const CATEGORY_LIST_PENDING="CATEGORY_LIST_PENDING";
export const CATEGORY_LIST_ERROR="CATEGORY_LIST_ERROR";
export const CATEGORY_LIST_SUCCESS="CATEGORY_LIST_SUCCESS";

export  function createCategory(params) {
    return{
        type:CATEGORY_CREATE,
        payload:{
            promise:api.post(URL.CATEGORY_CREATE,{data:params})
        }
    }
}
export  function getCategoriesList() {
    return{
        type:CATEGORY_LIST,
        payload:{
            promise:api.get(URL.CATEGORY_LIST)
        }
    }
}
export function removeCategory(params) {
    return{
        type:CATEGORY_REMOVE,
        payload:{
            promise:api.post(URL.CATEGORY_REMOVE,{data:params})
        }
    }
}