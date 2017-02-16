
module.exports = {
	modules: {
		definition: false,
		wrapper: false
	},
	paths: {
		public: 'www',
		watched: ['app', 'lib']
	},
	files: {
		javascripts: {
			joinTo: {
				'js/vendors.js': /^lib/,
				'js/app.js': /^app/
			}
		},
		stylesheets: {
			joinTo: {
				'css/vendors.css': /^lib/,
				'css/app.css': /^app/
			}
		}
	},
	plugins: {
		jshint: {
			pattern: /^app[\\/].*\.js$/,
			options: {
				bitwise: true,
				curly: true
			},
			globals: {
				jQuery: true
			},
			warnOnly: true
		},
		postcss: {
			processors: [require('autoprefixer')(['last 8 versions'])]
		}
	},
	npm: {
		enabled: false
	}
}