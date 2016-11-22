import {
    CUSTOMER_LIST_ERROR,CUSTOMER_LIST_PENDING,CUSTOMER_LIST_SUCCESS,CUSTOMER_RESETPWD_ERROR,CUSTOMER_RESETPWD_PENDING,CUSTOMER_RESETPWD_SUCCESS
} from '../actions/customer'


const initialState={
    items:null,
    error:null,
    result:null,
    loading:null
}
export default function (state=initialState,action={}) {
    switch (action.type){

        case CUSTOMER_LIST_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case CUSTOMER_LIST_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case CUSTOMER_LIST_SUCCESS:
            return Object.assign({},initialState,{items:action.payload,loading:false});
            break;
        case CUSTOMER_RESETPWD_PENDING:
            return Object.assign({},initialState,{loading:true});
            break;
        case CUSTOMER_RESETPWD_ERROR:
            return Object.assign({},initialState,{error:action.payload,loading:false});
            break;
        case CUSTOMER_RESETPWD_SUCCESS:
            return Object.assign({},initialState,{result:action.payload,loading:false});
            break;
        default:
            return state;
            break;
    }
}