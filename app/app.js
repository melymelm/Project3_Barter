Including dependencies
var React = require('react');
var ReactDom = require('react-dom');
var 

//from kevin
var Footer = function () {
  return <div><p align="center">© 2017 Copyright Team Barter</p></div>;
};
// This code here allows us to render our searchReact component
ReactDOM.render(
  <Footer />
 , document.getElementById("footer"));
// Export the component back for use in other files
module.exports = Footer;
