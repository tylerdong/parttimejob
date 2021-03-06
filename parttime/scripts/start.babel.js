
// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err
})

// Ensure environment variables are read.
import '../build/env'
import './addone'
import fs from 'fs'
import chalk from 'chalk'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import clearConsole from 'react-dev-utils/clearConsole'
import checkRequiredFiles from 'react-dev-utils/checkRequiredFiles'
import {
  choosePort,
  createCompiler,
  prepareProxy,
  prepareUrls,
} from 'react-dev-utils/WebpackDevServerUtils'
import openBrowser from 'react-dev-utils/openBrowser'
import paths from '../build/paths'
import config from '../build/webpack.config.dev'
import createDevServerConfig from '../build/webpackDevServer.config'
import appConfig from '../src/config'
import rasConfig from '../src/rasConfig'

const useYarn = fs.existsSync(paths.yarnLockFile)
const isInteractive = process.stdout.isTTY

// Warn and crash if required files are missing
if (!checkRequiredFiles([paths.appHtml, paths.appIndexJs])) {
  process.exit(1)
}

// Tools like Cloud9 rely on this.
const DEFAULT_PORT = parseInt(process.env.PORT, 10) || rasConfig.devPort || 3332
const HOST = process.env.HOST || rasConfig.devHost || '0.0.0.0'

if (process.env.HOST) {
  console.log(
    chalk.cyan(
      `Attempting to bind to HOST environment variable: ${chalk.yellow(
        chalk.bold(process.env.HOST)
      )}`
    )
  )
  console.log(
    `If this was unintentional, check that you haven't mistakenly set it in your shell.`
  )
  console.log(`Learn more here: ${chalk.yellow('http://bit.ly/2mwWSwH')}`)
  console.log()
}

// We attempt to use the default port but if it is busy, we offer the user to
// run on a different port. `choosePort()` Promise resolves to the next free port.
choosePort(HOST, DEFAULT_PORT)
  .then(port => {
    if (port === null) {
      // We have not found a port.
      return
    }
    const protocol = process.env.HTTPS === 'true' ? 'https' : 'http'
    const appName = appConfig.appName
    const urls = prepareUrls(protocol, HOST, port)
    // Create a webpack compiler that is configured with custom messages.
    const compiler = createCompiler(webpack, config, appName, urls, useYarn)
    // Load proxy config
    const proxySetting = rasConfig.proxyTable
    const proxyConfig = prepareProxy(proxySetting, paths.appPublic)
    // Serve webpack assets generated by the compiler over a web sever.
    const serverConfig = createDevServerConfig(
      proxyConfig,
      urls.lanUrlForConfig
    )

    const devServer = new WebpackDevServer(compiler, serverConfig)
    // Launch WebpackDevServer.
    devServer.listen(port, HOST, err => {
      if (err) {
        return console.log(err)
      }
      if (isInteractive) {
        clearConsole()
      }
      console.log(chalk.cyan('Starting the development server...\n'))
      openBrowser(urls.localUrlForBrowser)
    })

    const sigs = ['SIGINT', 'SIGTERM']
    sigs.forEach(sig => {
      process.on(sig, function () {
        devServer.close()
        process.exit()
      })
    })
  })
  .catch(err => {
    if (err && err.message) {
      console.log(err.message)
    }
    process.exit(1)
  })
