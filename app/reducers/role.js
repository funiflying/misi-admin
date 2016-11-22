import {ROLE_CREATE_PENDING,ROLE_CREATE_ERROR,ROLE_CREATE_SUCCESS,ROLE_LIST_PENDING,ROLE_LIST_ERROR,ROLE_LIST_SUCCESS,
ROLE_REMOVE_PENDING,ROLE_REMOVE_ERROR,ROLE_REMOVE_SUCCESS
} from '../actions/role'

const initialState={
    items:null,
    navs:null,
    error:null,
    result:null,
    loading:null
}
export default function (state=initialState,action={}) {
    switch (action.type){
        case ROLE_CREATE_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case ROLE_CREATE_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case ROLE_CREATE_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        case ROLE_REMOVE_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case ROLE_REMOVE_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case ROLE_REMOVE_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        case ROLE_LIST_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case ROLE_LIST_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case ROLE_LIST_SUCCESS:
            return Object.assign({},initialState,{items:action.payload,loading:false});
            break;
        default:
            return state;
            break;
    }
}