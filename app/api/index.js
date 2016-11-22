import Api from './api'
const api=new Api({
    baseURI:"/api",
    header:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})
export default api;