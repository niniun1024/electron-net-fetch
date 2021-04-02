'use strict';

const {net} = window.require('electron').remote;
const Querystring = require('querystring');
const Url = require('url');
const IsJson = require('./utils/IsJson');


let Fetch = function(){
  net(opts, params, resolve, reject){
    let request = net.request(opts);
    request.on('response', (response) => {
      response.on("data", (data)=>{
        let result = IsJson(`${data}`) ? JSON.parse(`${data}`) : `${data}`;   // data.toString();
        if(response.statusCode == 200){
          resolve(result);
        }else{
          // console.log('net status:' + response.statusCode);
          reject(result);
        }
      })
      response.on('end', () => {
        // console.log('No more data in response.');
      })      
    });

    request.write(Querystring.stringify(params));
    request.end();
  },
  get(url, params={}, header={}) {
    let options = {
      method: 'GET',
      url: url,
      params: params,
      header: header
    }
    return this.request(options);
  },
  post(url, params={}, header={}) {
    let options = {
      method: 'POST',
      url: url,
      params: params,
      header: header
    }
    return this.request(options);
  },
  request(options) {  // method, url, params, header
    // conosle.log('request:' + options.url);
    // console.log(options.params);
    let opt = this.formatParams(options);
    return new Promise((resolve, reject) => {
      this.net(opt, options.params, resolve, reject)
    })
  },  
  formatParams(options) {
    let header = {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'};
    let method = options.method || 'GET';
    if(options.header){
      Object.assign(header, options.header)
    }

    let myUrl = Url.parse(options.url);
    let port = 80;
    if(!myUrl.port) {
      port = myUrl.protocol == 'https:' ? 443 : port;
    }else{
      port = myUrl.port;
    } 

    let path = method == 'POST' ? myUrl.pathname : myUrl.pathname + myUrl.search;
    let opt = {
      method: method,
      protocol: myUrl.protocol,
      hostname: myUrl.host,
      port: port,
      path: path,
      headers: header
    }
    return opt
  }

}

module.exports = Fetch;

