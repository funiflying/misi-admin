import URL from '../utils/constant'
import api from '../api'
const NAV="NAV";
export const NAV_PENDING="NAV_PENDING";
export const NAV_ERROR="NAV_ERROR";
export const NAV_SUCCESS="NAV_SUCCESS";

const NAV_LIST="NAV_LIST";
export const NAV_LIST_PENDING="NAV_LIST_PENDING";
export const NAV_LIST_ERROR="NAV_LIST_ERROR";
export const NAV_LIST_SUCCESS="NAV_LIST_SUCCESS";

const MENU_CREATE="MENU_CREATE";
export const MENU_CREATE_PENDING="MENU_CREATE_PENDING";
export const MENU_CREATE_ERROR="MENU_CREATE_ERROR";
export const MENU_CREATE_SUCCESS="MENU_CREATE_SUCCESS";

const MENU_LIST="MENU_LIST";
export const MENU_LIST_PENDING="MENU_LIST_PENDING";
export const MENU_LIST_ERROR="MENU_LIST_ERROR";
export const MENU_LIST_SUCCESS="MENU_LIST_SUCCESS";

const MENU_ALL="MENU_ALL";
export const MENU_ALL_PENDING="MENU_ALL_PENDING";
export const MENU_ALL_ERROR="MENU_ALL_ERROR";
export const MENU_ALL_SUCCESS="MENU_ALL_SUCCESS";

const MENU_REMOVE="MENU_REMOVE";
export const MENU_REMOVE_PENDING="MENU_REMOVE_PENDING";
export const MENU_REMOVE_ERROR="MENU_REMOVE_ERROR";
export const MENU_REMOVE_SUCCESS="MENU_REMOVE_SUCCESS";

const NAV_CREATE="NAV_CREATE";
export const NAV_CREATE_PENDING="NAV_CREATE_PENDING";
export const NAV_CREATE_ERROR="NAV_CREATE_ERROR";
export const NAV_CREATE_SUCCESS="NAV_CREATE_SUCCESS";

const NAV_REMOVE="NAV_REMOVE";
export const NAV_REMOVE_PENDING="NAV_REMOVE_PENDING";
export const NAV_REMOVE_ERROR="NAV_REMOVE_ERROR";
export const NAV_REMOVE_SUCCESS="NAV_REMOVE_SUCCESS";

export function createMenu(params) {
    return {
        type:MENU_CREATE,
        payload:{
            promise:api.post(URL.MENU_CREATE,{data:params})
        }
    }
}
export function getMenuList() {
    return {
        type:MENU_LIST,
        payload:{
            promise:api.get(URL.MENU_LIST)
        }
    }
}
export function removeMenu(params) {
    return {
        type:MENU_REMOVE,
        payload:{
            promise:api.post(URL.MENU_REMOVE,{data:params})
        }
    }
}

export function createNav(params) {
    return {
        type:NAV_CREATE,
        payload:{
            promise:api.post(URL.NAV_CREATE,{data:params})
        }
    }
}

export function getNavList() {
    return {
        type:NAV_LIST,
        payload:{
            promise:api.get(URL.NAV_LIST)
        }
    }
}
export function removeNav(params) {
    return {
        type:NAV_REMOVE,
        payload:{
            promise:api.post(URL.NAV_REMOVE,{data:params})
        }
    }
}
export function getAllMenus(params) {
    return {
        type:MENU_ALL,
        payload:{
            promise:api.get(URL.MENU_ALL)
        }
    }
}