module.exports = {
// This code will be compiled by webpack according to the babel specs. The route might be off due to the .gitignore file, so if you run into issues with it, check that first.
  entry: "./app/App.js",

// The plain compiled Javascript will be output into this file
  output: {
	filename: "public/bundle.js"
},

// This will be what we do:
  module: {
  	loaders: [
  	  {
  	  	test:/\.jsx?$/,
  	  	exclude: /(node_moduled|bower_components)/,
  	  	loader: 'babel-loader',
  	  	query: {
  	  		// These are the specific transformations we'll be using.
  	  		presets: ['react', 'es2015']
  	  	}
  	  }
  	 ]
  }
}