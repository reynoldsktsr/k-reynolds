
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
			},
			order: {
				before: [
					'lib/angular-1.6.1/*',
					'lib/jquery-3.1.1/jquery-3.1.1.min.js*',
					'lib/tether-1.3.3/tether.min.js'
				]
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