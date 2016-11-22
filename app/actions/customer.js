import URL from '../utils/constant'
import api from '../api'


const CUSTOMER_LIST="CUSTOMER_LIST";
export const CUSTOMER_LIST_PENDING="CUSTOMER_LIST_PENDING";
export const CUSTOMER_LIST_ERROR="CUSTOMER_LIST_ERROR";
export const CUSTOMER_LIST_SUCCESS="CUSTOMER_LIST_SUCCESS";

const CUSTOMER_RESETPWD="CUSTOMER_RESETPWD";
export const CUSTOMER_RESETPWD_PENDING="CUSTOMER_RESETPWD_PENDING";
export const CUSTOMER_RESETPWD_ERROR="CUSTOMER_RESETPWD_ERROR";
export const CUSTOMER_RESETPWD_SUCCESS="CUSTOMER_RESETPWD_SUCCESS";

export  function getCustomerList(params) {
    return{
        type:CUSTOMER_LIST,
        payload:{
            promise:api.post(URL.CUSTOMER_LIST,{data:params})
        }
    }
}
export  function reset(params) {
    return{
        type:CUSTOMER_RESETPWD,
        payload:{
            promise:api.post(URL.CUSTOMER_RESETPWD,{data:params})
        }
    }
}