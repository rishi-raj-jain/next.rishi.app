const { join } = require('path')
const { exit } = require('process')
const { existsSync } = require('fs')
const { DeploymentBuilder } = require('@edgio/core/deploy')

const appDir = process.cwd()
const SW_SOURCE = join(appDir, 'sw', 'service-worker.js')
const SW_DEST = join(appDir, '.edgio_temp', 'service-worker.js')

module.exports = async function build(options) {
  try {
    const builder = new DeploymentBuilder()
    builder.clearPreviousBuildOutput()
    let command = 'npx next build'
    await builder.exec(command)
    builder.addJSAsset(join(appDir, '.next', 'standalone'), 'dist')
    builder.addJSAsset(join(appDir, '.next', 'static'), join('dist', '.next', 'static'))
    builder.addJSAsset(join(appDir, 'public'), join('dist', 'public'))
    if (existsSync(SW_SOURCE)) {
      builder.buildServiceWorker(SW_SOURCE, SW_DEST, false)
    }
    await builder.build()
  } catch (e) {
    console.log(e)
    exit()
  }
}
