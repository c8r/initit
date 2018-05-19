
# initit

Utility module for creating `npm init` packages

```sh
npm i initit
```

```js
#!/usr/bin/env node
const init = require('initit')

const [ name ] = process.argv.slice(2)
// user/repo/path
const template = 'jxnblk/rebass/examples/starter'

init({ name, template })
  .then(res => {
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
```

MIT License
