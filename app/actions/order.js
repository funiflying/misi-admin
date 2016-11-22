import URL from '../utils/constant'
import api from '../api'



const ORDER_CANCEL="ORDER_CANCEL";
export const ORDER_CANCEL_PENDING="ORDER_CANCEL_PENDING";
export const ORDER_CANCEL_ERROR="ORDER_CANCEL_ERROR";
export const ORDER_CANCEL_SUCCESS="ORDER_CANCEL_SUCCESS";

const ORDER_RECEIVE="ORDER_RECEIVE";
export const ORDER_RECEIVE_PENDING="ORDER_RECEIVE_PENDING";
export const ORDER_RECEIVE_ERROR="ORDER_RECEIVE_ERROR";
export const ORDER_RECEIVE_SUCCESS="ORDER_RECEIVE_SUCCESS";

const ORDER_DELIVER="ORDER_DELIVER";
export const ORDER_DELIVER_PENDING="ORDER_DELIVER_PENDING";
export const ORDER_DELIVER_ERROR="ORDER_DELIVER_ERROR";
export const ORDER_DELIVER_SUCCESS="ORDER_DELIVER_SUCCESS";

const ORDER_COMPLETE="ORDER_COMPLETE";
export const ORDER_COMPLETE_PENDING="ORDER_COMPLETE_PENDING";
export const ORDER_COMPLETE_ERROR="ORDER_COMPLETE_ERROR";
export const ORDER_COMPLETE_SUCCESS="ORDER_COMPLETE_SUCCESS";

const ORDER_LIST="ORDER_LIST";
export const ORDER_LIST_PENDING="ORDER_LIST_PENDING";
export const ORDER_LIST_ERROR="ORDER_LIST_ERROR";
export const ORDER_LIST_SUCCESS="ORDER_LIST_SUCCESS";

export  function getOrderList(params) {
    return{
        type:ORDER_LIST,
        payload:{
            promise:api.post(URL.ORDER_LIST,{data:params})
        }
    }
}
export function cancelOrder(params) {
    return{
        type:ORDER_REMOVE,
        payload:{
            promise:api.post(URL.ORDER_CANCEL,{data:params})
        }
    }
}
export function receiveOrder(params) {
    return{
        type:ORDER_RECEIVE,
        payload:{
            promise:api.post(URL.ORDER_RECEIVE,{data:params})
        }
    }
}
export function deliverOrder(params) {
    return{
        type:ORDER_RECEIVE,
        payload:{
            promise:api.post(URL.ORDER_DELIVER,{data:params})
        }
    }
}
export function completeOrder(params) {
    return{
        type:ORDER_COMPLETE,
        payload:{
            promise:api.post(URL.ORDER_COMPLETE,{data:params})
        }
    }
}