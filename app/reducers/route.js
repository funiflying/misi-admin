import {NAV_LIST_PENDING,NAV_LIST_ERROR,NAV_LIST_SUCCESS,MENU_CREATE_PENDING,MENU_CREATE_ERROR,MENU_CREATE_SUCCESS,
NAV_CREATE_PENDING,NAV_CREATE_ERROR,NAV_CREATE_SUCCESS,
MENU_LIST_PENDING,MENU_LIST_ERROR,MENU_LIST_SUCCESS,MENU_REMOVE_PENDING,MENU_REMOVE_ERROR,MENU_REMOVE_SUCCESS,NAV_REMOVE_PENDING,NAV_REMOVE_ERROR,NAV_REMOVE_SUCCESS,MENU_ALL_PENDING,MENU_ALL_ERROR,MENU_ALL_SUCCESS
} from '../actions/route'

const initialState={
    items:null,
    navs:null,
    error:null,
    result:null,
    loading:null,
    menus:null
}
export default function (state=initialState,action={}) {
    switch (action.type){
        case MENU_CREATE_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case MENU_CREATE_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case MENU_CREATE_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        case NAV_CREATE_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case NAV_CREATE_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case NAV_CREATE_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        case MENU_LIST_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case MENU_LIST_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case MENU_LIST_SUCCESS:
            return Object.assign({},initialState,{items:action.payload,loading:false});
            break;
        case MENU_ALL_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case MENU_ALL_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case MENU_ALL_SUCCESS:
            return Object.assign({},initialState,{menus:action.payload,loading:false});
            break;
        case MENU_REMOVE_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case MENU_REMOVE_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case MENU_REMOVE_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        case NAV_LIST_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case NAV_LIST_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case NAV_LIST_SUCCESS:
            return Object.assign({},initialState,{navs:action.payload,loading:false});
            break;
        case NAV_REMOVE_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case NAV_REMOVE_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case NAV_REMOVE_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        default:
            return state;
            break;
    }
}
