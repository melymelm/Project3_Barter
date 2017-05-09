$(document).ready(function() {
  function performSearch() {
  	var category = this.id;
    $.get({
      url: '/categories/' + category,
      success: function(data) { 
        updateSearchResults(data);

      }
    }) 
  }

  $( ".performSearch" ).click(performSearch)

  function updateSearchResults (searchData){
    var results = $('#searchResults');
    results.empty();
 
    searchData.forEach(function (result) {
  	  var searchData = [result.businessName, result.fullName, result.phoneNumber, result.email];
  	  var searchText = searchData.join(', ');
        $('<li class="list-group-item"></li>').html(searchText).appendTo(results);
    });
  }
});


