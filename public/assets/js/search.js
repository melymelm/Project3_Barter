$(document).ready(function() {

  console.log("search.js: Inside ready function");
  function performSearch() {
  	var category = this.id;
  	console.log("category " + category);
    $.get({
      url: '/categories/' + category,
      success: function(data) {
        console.log(data);
        // updateCategories(data);

      }
    }) 
  }

  $( ".performSearch" ).click(performSearch)
});