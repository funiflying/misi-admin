import {USER_CREATE_PENDING,USER_CREATE_ERROR,USER_CREATE_SUCCESS,USER_LIST_PENDING,USER_LIST_ERROR,USER_LIST_SUCCESS,
USER_REMOVE_PENDING,USER_REMOVE_ERROR,USER_REMOVE_SUCCESS
} from '../actions/admin'

const initialState={
    items:null,
    error:null,
    result:null,
    loading:null
}
export default function (state=initialState,action={}) {
    switch (action.type){
        case USER_CREATE_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case USER_CREATE_ERROR:
            return Object.assign({},initialState,{error:action.payload});
            break;
        case USER_CREATE_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        case USER_LIST_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case USER_LIST_ERROR:
            return Object.assign({},initialState,{error:action.payload});
            break;
        case USER_LIST_SUCCESS:
            return Object.assign({},initialState,{items:action.payload,loading:false});
            break;
        case USER_REMOVE_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case USER_REMOVE_ERROR:
            return Object.assign({},initialState,{error:action.payload});
            break;
        case USER_REMOVE_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        default:
            return state;
            break;
    }
}