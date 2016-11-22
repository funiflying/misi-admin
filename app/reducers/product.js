import {PRODUCT_CREATE_PENDING,PRODUCT_CREATE_ERROR,PRODUCT_CREATE_SUCCESS,PRODUCT_LIST_PENDING,PRODUCT_LIST_ERROR,PRODUCT_LIST_SUCCESS,
    PRODUCT_REMOVE_PENDING,PRODUCT_REMOVE_ERROR,PRODUCT_REMOVE_SUCCESS,PRODUCT_SHELVES_PENDING,PRODUCT_SHELVES_ERROR,PRODUCT_SHELVES_SUCCESS,
    PRODUCT_DETAIL_PENDING,PRODUCT_DETAIL_ERROR,PRODUCT_DETAIL_SUCCESS
} from '../actions/product'

const initialState={
    items:null,
    error:null,
    result:null,
    loading:null,
    item:null
}
export default function (state=initialState,action={}) {
    switch (action.type){
        case PRODUCT_CREATE_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case PRODUCT_CREATE_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case PRODUCT_CREATE_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        case PRODUCT_REMOVE_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case PRODUCT_REMOVE_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case PRODUCT_REMOVE_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        case PRODUCT_LIST_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case PRODUCT_LIST_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case PRODUCT_LIST_SUCCESS:
            return Object.assign({},initialState,{items:action.payload,loading:false});
            break;
        case PRODUCT_SHELVES_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case PRODUCT_SHELVES_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case PRODUCT_SHELVES_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        case PRODUCT_DETAIL_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case PRODUCT_DETAIL_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case PRODUCT_DETAIL_SUCCESS:
            return Object.assign({},initialState,{item:action.payload[0],loading:false});
            break;
        default:
            return state;
            break;
    }
}