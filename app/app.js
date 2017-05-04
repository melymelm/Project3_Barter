// Including dependencies
// var React = require('react');
// var ReactDom = require('react-dom');

// Create a render function. This will take a set of HTML and then deploy into our index.html file.
// ReactDom.render(
// 	<p>Hello World!</p>,
// 	document.getElementById('app')
// )

/* Front-End
 * ========================= */

// 1: On Load
// ==========
// The first thing this js file will do: ask the back end for a json with all traders
$.getJSON("/submit", function(data) {
  // For each entry of that json...
  for (var i = 0; i < data.length; i++) {
    // Append each of the traders' properties to the table
    $("#results").append("<tr><td>" + data[i].name + "</td>" +
                         "<td>" + data[i].business + "</td>" +
                         "<td>" + data[i].category + "</td>" +
                         "<td>" + data[i].address + "</td>" +
                         "<td>" + data[i].phone + "</td>" +
                         "<td>" + data[i].rating + "</td></tr>");
  }
});