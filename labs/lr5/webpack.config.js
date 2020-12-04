module.exports = {
    devServer: {
        proxy: {
            '/public': 'http://localhost:3000'
        }
    }
};