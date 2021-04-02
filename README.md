# electron-net-fetch
A light-weight module by Electron's net module for get http/https data

## Installation
```
npm install gulp-less
```

## Basic Usage
```js
import fetch from 'electron-net-fetch'
fetch.get(url, params, header)
  .then(data => {
    console.log(data)
  })
  .catch(e => {
    console.log('error', e)
  })

fetch.post(url, params, header)
  .then(data => {
    console.log(data)
  })
  .catch(e => {
    console.log('error', e)
  })

```
