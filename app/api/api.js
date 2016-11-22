import superagent from 'superagent'
const methods=['get','post','head','put','del','options','patch']

class _Api{
  constructor(opts) {
      this.opts = opts || {};
      if (!this.opts.baseURI) {

      }
      methods.forEach((method)=>
          this[method]=(path,{params,data}={})=> new Promise((resolve,reject)=>{
                  const request=superagent[method](this.opts.baseURI+path);
                  if(params){
                      request.query(params)
                  }
                  if(this.opts.header){
                      request.set(this.opts.header)
                  }
                  if(data){
                      request.send(data);
                  }
                  //request.withCredentials("true");
                  request.end((err={}, { body } = {}) =>{
                      if(err){
                          reject(err)
                      }else {
                          resolve(body)
                      }
                  });
              })
          )
  }
}

const Api=_Api;
export default Api;