$(document).ready(function() {

  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var postId;

  console.log("join.js: Inside ready function");

  var firstNameInput = $("#inputFirst");
  var lastNameInput = $("#inputLast");
  var businessNameInput = $("#inputBusinessName");

  var zipInput = $("#inputZip");
  var phoneNumberInput = $("#inputPhone");
  var emailInput = $("#inputEmail");

  var passInput = $("#inputPassword1");
  var passInput2 = $("#inputPassword2");

  // Gets an optional query string from our url (i.e. ?post_id=23)
  // var url = window.location.search;
  // var postId;
  // // Sets a flag for whether or not we're updating a post to be false initially
  // var updating = false;

  // // If we have this section in our url, we pull out the post id from the url
  // // In localhost:8080/mainPage?post_id=1, postId is 1
  // if (url.indexOf("?post_id=") !== -1) {
  //   postId = url.split("=")[1];
  //   getPostData(postId);
  // }

  // Getting jQuery references to the post name, address, city, state,
  // zip-code, email-address, where did you move from?, photo and mainPageform
  // var bodyInput = $("#body");

// $("#submitJoin").click(function() {

//   console.log("submitJoin");

    
//       // if (passInput1 != passInput2) {
//       //   alert("Your passwords don't match!");
//       // }
//       // else {
//       //   passInput = passInput1;
//       // }

      
//       //getting the services selection
//       function getSelection(serveInput) {    
//         var element = document.getElementById("servSelect");
//         element.value = serveInput;
//         console.log("serve select INSIDE: " + serveInput);
//       }


//     getSelection();

//     console.log("-------------------------------");
//     console.log("Logging out info from join page");
//     console.log("Name: " + nameInput);
//     console.log("Zip Code: " + zipInput);
//     console.log("Phone: " + phoneInput);
//     console.log("Email: " + emailInput);
//     console.log("Password: " + passInput);
//     console.log("Service selection: " + serveInput);
//     console.log("-------------------------------");

// });


  
  // // Adding an event listener for when the form is submitted
  $("#joinForm").on("submit", function handleFormSubmit(event) {
    event.preventDefault();

      if (passInput.val().trim() != passInput2.val().trim()) {
        alert("Your passwords don't match!");
        return;
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
    };

    submitPost(signupData);
  });

  // Submits a new post and brings user to searchPage upon completion
  function submitPost(signupData) {

    console.log(signupData);
    $.post({
      url: "/api/signup/",
      data: signupData,
      success: function() {
        //window.location.href = "/search";
      }
    });
  }

});