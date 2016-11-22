import {
    ORDER_LIST_PENDING,ORDER_LIST_SUCCESS,ORDER_LIST_ERROR,ORDER_CANCEL_PENDING,ORDER_CANCEL_SUCCESS,ORDER_CANCEL_ERROR,
    ORDER_RECEIVE_PENDING,ORDER_RECEIVE_ERROR,ORDER_RECEIVE_SUCCESS,ORDER_DELIVER_ERROR,ORDER_DELIVER_PENDING,ORDER_DELIVER_SUCCESS
} from '../actions/order'

const initialState={
    items:null,
    error:null,
    result:null,
    loading:null
}
export default function (state=initialState,action={}) {
    switch (action.type){
        case ORDER_CANCEL_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case ORDER_CANCEL_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case ORDER_CANCEL_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        case ORDER_RECEIVE_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case ORDER_RECEIVE_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case ORDER_RECEIVE_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        case ORDER_DELIVER_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case ORDER_DELIVER_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case ORDER_DELIVER_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        case ORDER_LIST_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case ORDER_LIST_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case ORDER_LIST_SUCCESS:
            return Object.assign({},initialState,{items:action.payload,loading:false});
            break;
        default:
            return state;
            break;
    }
}