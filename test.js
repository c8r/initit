#!/usr/bin/env node
const name = 'temp'
const template = 'c8r/kit/templates/next'

const init = require('./index')
init({ name, template })
  .then(res => {
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
