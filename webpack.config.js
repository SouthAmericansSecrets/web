var webpack = require('webpack'),
	path = require('path'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	NunjucksWebpackPlugin = require('nunjucks-webpack-plugin'),
	CopyWebpackPlugin = require('copy-webpack-plugin'),
	fs = require('fs');
/* babel */
const babelSettings = JSON.parse(fs.readFileSync(".babelrc"));
/* read templates */
var templates = fs.readdirSync(path.resolve(__dirname, 'app/tpl/pages/'));
var tpls=[];
for (var i = 0; i < templates.length; i++) {
	file = templates[i];
	templateName = file.split('.')[0];
	tpls.push({from: path.resolve(__dirname, 'app/tpl/pages/'+file),to:templateName+'.html'});
}
module.exports = {
	entry: {
		templates:'./app/templates.js',
		index: './app/scripts/index.js',
		tours:'./app/scripts/tours.js',
		activities:'./app/scripts/activities.js',
		menu:'./app/scripts/menu.js',
		contact: './app/scripts/contact.js',
		package: './app/scripts/package.js',
		article: './app/scripts/article.js',
		articledetail: './app/scripts/article-detail.js',
		footer: './app/scripts/footer.js',
		firebase: './app/scripts/firebase.js',
		backoffice: './app/scripts/backoffice.js',
		messageboard: './app/scripts/messageboard.js',
		about: './app/scripts/about.js',
		messageboard_settings: './app/scripts/messageboard-settings.js',
		reservations: './app/scripts/reservations.js',
		splash: './app/scripts/splash-ad.js',
		cruises: './app/scripts/cruises.js'
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.jsx', '.js','.njk','.html']
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
		host: '0.0.0.0',
		port: 9000,
		inline: true
	},
	module: {
		loaders: [
			{
				test: /(\.js|.jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: babelSettings
			},
			{
                test: /(\.njk|.nunjucks)$/,
                loader: 'nunjucks-loader',
				query: {
                    root: __dirname + '/app/tpl'
                }
            },

		]
	},
	externals: {
		"jquery": "jQuery"
	},
	plugins: [

		new NunjucksWebpackPlugin({template: tpls}),

		new CopyWebpackPlugin([
			{from: 'public/css', to: 'css'},
			{from: 'public/videos', to: 'videos'},
			{from: 'public/js', to: 'js'},
			{from: 'public/images', to: 'images'},
			{from: 'public/fonts', to: 'fonts'},
			{from: 'public/manifest.json', to: 'manifest.json'},
			{from: 'public/*.html', to: '/'},
			{
                context: 'public',
                from: '**/*',
                to: '/'
            },

		])
	],
	devtool: "source-map"
};
