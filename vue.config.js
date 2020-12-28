module.exports = 
{
    outputDir: './docs',
    publicPath: '/',
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/styles/app.scss";
                `
            }
        }
    }

}
