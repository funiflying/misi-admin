import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {Router, Route, IndexRedirect,useRouterHistory} from 'react-router'
import {createHistory} from 'history'
import  configureStore from './store/configureStore'
const store=configureStore();
const history = useRouterHistory(createHistory)({ basename: '' });
import app from './views/app';
import home from './views/home'
import menu_list from './views/menu/list'
import menu_create from './views/menu/create'
import menu_update from './views/menu/update'
import nav_create from './views/navigation/create'
import nav_list from './views/navigation/list'
import nav_update from './views/navigation/update'
import part_create from './views/part/create'
import part_list from './views/part/list'
import part_update from './views/part/update'
import user_create from './views/user/create'
import user_list from './views/user/list'
import user_update from './views/user/update'
import category_create from './views/category/create'
import category_list from './views/category/list'
import category_update from './views/category/update'
import product_create from './views/product/create'
import product_list from './views/product/list'
import product_update from './views/product/update'
import order from './views/order/list'
import customer from './views/customer/list'
import banner_create from './views/banner/create'
import banner_list from './views/banner/list'
import banner_update from './views/banner/update'
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' >
                <Route component={app}>
                    <Route path='/admin/home*' component={home} />
                    <Route path='/admin/menu/list*' component={menu_list} />
                    <Route path='/admin/menu/create*' component={menu_create} />
                    <Route path='/admin/menu/update*' component={menu_update} />
                    <Route path='/admin/navigation/create*' component={nav_create} />
                    <Route path='/admin/navigation/list*' component={nav_list} />
                    <Route path='/admin/navigation/update*' component={nav_update} />
                    <Route path='/admin/part/create*' component={part_create} />
                    <Route path='/admin/part/list*' component={part_list} />
                    <Route path='/admin/part/update*' component={part_update} />
                    <Route path='/admin/user/create*' component={user_create} />
                    <Route path='/admin/user/list*' component={user_list} />
                    <Route path='/admin/user/update*' component={user_update} />
                    <Route path='/admin/category/list*' component={category_list} />
                    <Route path='/admin/category/update*' component={category_update} />
                    <Route path='/admin/category/create*' component={category_create} />
                    <Route path='/admin/product/list*' component={product_list} />
                    <Route path='/admin/product/update/:_id/*' component={product_update} />
                    <Route path='/admin/product/create*' component={product_create} />
                    <Route path='/admin/order*' component={order} />
                    <Route path='/admin/customer*' component={customer} />
                    <Route path='/admin/banner/create*' component={banner_create} />
                    <Route path='/admin/banner/list*' component={banner_list} />
                    <Route path='/admin/banner/update*' component={banner_update} />
                </Route>
            </Route>
        </Router>
    </Provider>
    ,document.getElementById('app')
)