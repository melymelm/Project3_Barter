$(document).ready(function() {

  console.log("join.js: Inside ready function");
// JSON of categories
    $.get({
      url: "/api/categories",
      success: function(data) {
        console.log(data);
        updateCategories(data);

      }
    })
// Update cat from new user
function updateCategories (categories){
    var select = $('#servSelect');
    select.empty();
      categories.forEach(function(category) {
          $('<option value="' + category.name + '">').html(
          category.title).appendTo(select);
        });
}

  var firstNameInput = $("#inputFirst");
  var lastNameInput = $("#inputLast");
  var businessNameInput = $("#inputBusinessName");

  var zipInput = $("#inputZip");
  var phoneNumberInput = $("#inputPhone");
  var emailInput = $("#inputEmail");
  var servSelect = $("#servSelect")
  var passInput = $("#inputPassword1");
  var passInput2 = $("#inputPassword2");
 
  // // Adding an event listener for when the form is submitted
  $("#joinForm").on("submit", function handleFormSubmit(event) {
    event.preventDefault();

    if (passInput.val().trim() != passInput2.val().trim()) {
        alert("Your passwords don't match!");
        return false;
     }

     if (passInput.val().trim().length < 6) {
        alert("Your password needs to be at least 6 characters.");
        return false;
     }

    // Constructing a newPost object to hand to the database
    var signupData = {
      firstName: firstNameInput.val().trim(),
      lastName: lastNameInput.val().trim(),
      businessName: businessNameInput.val().trim(),
      zipCode: zipInput.val().trim(),
      phoneNumber: phoneNumberInput.val().trim(),
      email: emailInput.val().trim(),
      password: passInput.val().trim(),
      category: servSelect.val(),
    };

    console.log(signupData);

    $.post({
      url: "/api/signup/",
      data: signupData,
      success: function() {
        window.location.href = "/search";
      }
    });
  });
});