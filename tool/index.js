#!/usr/bin/env node

const config = require('./webpack.config.js');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');



// `compiler.run()` doesn't support promises yet, only callbacks
((async () => {
    await new Promise((resolve, reject) => {
        const compiler = new WebpackDevServer(webpack(config)).listen(4000, 'localhost', () => {
            console.log('start')
        });
    });
})())
