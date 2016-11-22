import {
BANNER_CREATE_PENDING,BANNER_DELETE_PENDING,BANNER_LIST_PENDING,BANNER_CREATE_SUCCESS,BANNER_DELETE_SUCCESS,BANNER_LIST_SUCCESS,BANNER_CREATE_ERROR,BANNER_DELETE_ERROR,BANNER_LIST_ERROR
} from '../actions/banner'


const initialState={
    items:null,
    error:null,
    result:null,
    loading:null
}
export default function (state=initialState,action={}) {
    switch (action.type){
        case BANNER_CREATE_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case BANNER_CREATE_ERROR:
            return Object.assign({},initialState,{error:action.payload});
            break;
        case BANNER_CREATE_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        case BANNER_LIST_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case BANNER_LIST_ERROR:
            return Object.assign({},initialState,{error:action.payload});
            break;
        case BANNER_LIST_SUCCESS:
            return Object.assign({},initialState,{items:action.payload,loading:false});
            break;
        case BANNER_DELETE_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case BANNER_DELETE_ERROR:
            return Object.assign({},initialState,{error:action.payload});
            break;
        case BANNER_DELETE_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        default:
            return state;
            break;
    }
}