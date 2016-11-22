import {createStore,applyMiddleware,combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware  from '../middlewares/promiseMiddleware';
import route from '../reducers/route'
import role from '../reducers/role'
import user from '../reducers/admin'
import category from '../reducers/category'
import product from '../reducers/product'
import order from '../reducers/order'
import customer from '../reducers/customer'
import banner from '../reducers/banner'
const reducer=combineReducers({route,role,user,category,product,order,customer,banner});
const createStoreWithMiddleware=applyMiddleware(
    thunkMiddleware,
    promiseMiddleware({promiseTypeSuffixes:['PENDING','SUCCESS','ERROR']})
)(createStore);
export default  function configureStore(initialState) {
    return createStoreWithMiddleware(reducer, initialState);
}
