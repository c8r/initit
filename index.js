const fs = require('fs-extra')
const path = require('path')
const os = require('os')
const exec = require('child_process').execSync
const spawn = require('cross-spawn')

const install = () => {
  return new Promise((resolve, reject) => {
    const child = spawn('npm', [ 'install' ], {
      stdio: 'inherit'
    })
    child.on('close', code => {
      if (code !== 0) {
        reject()
        return
      }
      resolve()
    })
  })
}

const gitInit = () => {
  exec('git --version', { stdio: 'inherit' })
  exec('git init', { stdio: 'inherit' })
  exec('git add .', { stdio: 'inherit' })
  exec('git commit -am "Init"', { stdio: 'inherit' })
  return true
}

const create = async (opts = {}) => {
  const dirname = path.resolve(opts.name)
  const name = path.basename(dirname)

  fs.ensureDirSync(name)
  fs.copySync(opts.template, dirname)

  const templatePkg = require(
    path.join(opts.template, 'package.json')
  )

  const pkg = Object.assign({
    name,
    version: '1.0.0',
  }, templatePkg)
  fs.writeFileSync(
    path.join(dirname, 'package.json'),
    JSON.stringify(pkg, null, 2) + os.EOL
  )

  process.chdir(dirname)

  const installed = await install()
  const initialized = gitInit()

  exec('npm test', { stdio: 'inherit' })
  return { name, dirname }
}

module.exports = create
