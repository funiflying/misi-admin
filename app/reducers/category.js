import {CATEGORY_CREATE_PENDING,CATEGORY_CREATE_ERROR,CATEGORY_CREATE_SUCCESS,CATEGORY_LIST_PENDING,CATEGORY_LIST_ERROR,CATEGORY_LIST_SUCCESS,
    CATEGORY_REMOVE_PENDING,CATEGORY_REMOVE_ERROR,CATEGORY_REMOVE_SUCCESS
} from '../actions/category'

const initialState={
    items:null,
    error:null,
    result:null,
    loading:null
}
export default function (state=initialState,action={}) {
    switch (action.type){
        case CATEGORY_CREATE_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case CATEGORY_CREATE_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case CATEGORY_CREATE_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        case CATEGORY_REMOVE_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case CATEGORY_REMOVE_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case CATEGORY_REMOVE_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        case CATEGORY_LIST_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case CATEGORY_LIST_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case CATEGORY_LIST_SUCCESS:
            return Object.assign({},initialState,{items:action.payload,loading:false});
            break;
        default:
            return state;
            break;
    }
}