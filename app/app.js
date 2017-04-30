// Including dependencies
var React = require('react');
var ReactDom = require('react-dom');

// Create a render function. This will take a set of HTML and then deploy into our index.html file.
ReactDom.render(
	<p>Hello World!</p>,
	document.getElementById('app')
)