import URL from '../utils/constant'
import api from '../api'

export const BANNER_LIST="BANNER_LIST";
export const BANNER_LIST_PENDING="BANNER_LIST_PENDING";
export const BANNER_LIST_ERROR="BANNER_LIST_ERROR";
export const BANNER_LIST_SUCCESS="BANNER_LIST_SUCCESS";

export const BANNER_CREATE="BANNER_CREATE";
export const BANNER_CREATE_PENDING="BANNER_CREATE_PENDING";
export const BANNER_CREATE_ERROR="BANNER_CREATE_ERROR";
export const BANNER_CREATE_SUCCESS="BANNER_CREATE_SUCCESS";

export const BANNER_DELETE="BANNER_DELETE";
export const BANNER_DELETE_PENDING="BANNER_DELETE_PENDING";
export const BANNER_DELETE_ERROR="BANNER_DELETE_ERROR";
export const BANNER_DELETE_SUCCESS="BANNER_DELETE_SUCCESS";

export  function getBannerList() {
    return{
        type:BANNER_LIST,
        payload:{
            promise:api.get(URL.BANNER_LIST)
        }
    }
}
export  function createBanner(params) {
    return{
        type:BANNER_CREATE,
        payload:{
            promise:api.post(URL.BANNER_CREATE,{data:params})
        }
    }
}
export  function deleteBanner(params) {
    return{
        type:BANNER_DELETE,
        payload:{
            promise:api.post(URL.BANNER_DELETE,{data:params})
        }
    }
}