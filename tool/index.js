const config = require('./webpack.config.js');
const webpack = require('webpack');

const compiler = webpack(config);

// `compiler.run()` doesn't support promises yet, only callbacks
((async () => {
    await new Promise((resolve, reject) => {
        compiler.run((err, res) => {
            if (err) {
                return reject(err);
            }
            resolve(res);
        });
    });
})())
