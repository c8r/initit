
# initit

Utility module for creating `npm init` packages

```sh
npm i initit
```

```js
#!/usr/bin/env node
const path = require('path')
const init = require('initit')

const [ name ] = process.argv.slice(2)
const template = path.join(__dirname, 'template')

init({ name, template })
  .then(res => {
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
```
