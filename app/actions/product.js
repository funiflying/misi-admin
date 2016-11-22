import URL from '../utils/constant'
import api from '../api'

const PRODUCT_CREATE="PRODUCT_CREATE";
export const PRODUCT_CREATE_PENDING="PRODUCT_CREATE_PENDING";
export const PRODUCT_CREATE_ERROR="PRODUCT_CREATE_ERROR";
export const PRODUCT_CREATE_SUCCESS="PRODUCT_CREATE_SUCCESS";

const PRODUCT_REMOVE="PRODUCT_REMOVE";
export const PRODUCT_REMOVE_PENDING="PRODUCT_REMOVE_PENDING";
export const PRODUCT_REMOVE_ERROR="PRODUCT_REMOVE_ERROR";
export const PRODUCT_REMOVE_SUCCESS="PRODUCT_REMOVE_SUCCESS";

const PRODUCT_LIST="PRODUCT_LIST";
export const PRODUCT_LIST_PENDING="PRODUCT_LIST_PENDING";
export const PRODUCT_LIST_ERROR="PRODUCT_LIST_ERROR";
export const PRODUCT_LIST_SUCCESS="PRODUCT_LIST_SUCCESS";

const PRODUCT_SHELVES="PRODUCT_SHELVES";
export const PRODUCT_SHELVES_PENDING="PRODUCT_SHELVES_PENDING";
export const PRODUCT_SHELVES_ERROR="PRODUCT_SHELVES_ERROR";
export const PRODUCT_SHELVES_SUCCESS="PRODUCT_SHELVES_SUCCESS";

const PRODUCT_DETAIL="PRODUCT_DETAIL";
export const PRODUCT_DETAIL_PENDING="PRODUCT_DETAIL_PENDING";
export const PRODUCT_DETAIL_ERROR="PRODUCT_DETAIL_ERROR";
export const PRODUCT_DETAIL_SUCCESS="PRODUCT_DETAIL_SUCCESS";


export  function createProduct(params) {
    return{
        type:PRODUCT_CREATE,
        payload:{
            promise:api.post(URL.PRODUCT_CREATE,{data:params})
        }
    }
}
export  function getProductList() {
    return{
        type:PRODUCT_LIST,
        payload:{
            promise:api.get(URL.PRODUCT_LIST)
        }
    }
}
export function removeProduct(params) {
    return{
        type:PRODUCT_REMOVE,
        payload:{
            promise:api.post(URL.PRODUCT_REMOVE,{data:params})
        }
    }
}
export function shelves(params) {
    return{
        type:PRODUCT_SHELVES,
        payload:{
            promise:api.post(URL.PRODUCT_SHELVES,{data:params})
        }
    }
}
export function detail(params) {
    return{
        type:PRODUCT_DETAIL,
        payload:{
            promise:api.post(URL.PRODUCT_DETAIL,{data:params})
        }
    }
}