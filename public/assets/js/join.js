$(document).ready(function() {

  // Gets an optional query string from our url (i.e. ?post_id=23)
  var url = window.location.search;
  var postId;

  console.log("Inside ready function");

  var firstName = $("#inputFirst");
  var lastName = $("#inputLast");
  var nameInput = firstName + lastName;

  var zipInput = $("#inputZip");
  var phoneInput = $("#inputPhone");
  var emailInput = $("#inputEmail");

  var passInput = $("#inputPassword1");
  var passInput1 = $("#inputPassword1");
  var passInput2 = $("#inputPassword2");

  var serveInput;
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

$("#submitJoin").click(function() {

    
      // if (passInput1 != passInput2) {
      //   alert("Your passwords don't match!");
      // }
      // else {
      //   passInput = passInput1;
      // }

      
      //getting the services selection
      function getSelection(serveInput) {    
        var element = document.getElementById("servSelect");
        element.value = serveInput;
        console.log("serve select INSIDE: " + serveInput);
      }


    getSelection();

    console.log("-------------------------------");
    console.log("Logging out info from join page");
    console.log("Name: " + nameInput);
    console.log("Zip Code: " + zipInput);
    console.log("Phone: " + phoneInput);
    console.log("Email: " + emailInput);
    console.log("Password: " + passInput);
    console.log("Service selection: " + serveInput);
    console.log("-------------------------------");

});

});







  
//   // // Adding an event listener for when the form is submitted
//   $(mainPageForm).on("submit", function handleFormSubmit(event) {
//     event.preventDefault();
//     // Wont submit the post if we are missing a body or a name
//     if (!nameInput.val().trim() || !addressInput.val().trim() || !emailInput.val().trim() || !zipInput.val().trim()) {
//       return;
//     }
//     // Constructing a newPost object to hand to the database
//     var newPost = {
//       name: nameInput.val().trim(),
//       address: addressInput.val().trim(),
//       city: cityInput.val().trim(),
//       state: stateInput.val().trim(),
//       zip: zipInput.val().trim(),
//       email: emailInput.val().trim(),
//       // password: passInput.val().trim(),
//       moveFrom: moveFromInput.val().trim()
//       // photo: photoInput.val().trim()
//     };

//     console.log(newPost)

//     // If we're updating a post run updatePost to update a post
//     // Otherwise run submitPost to create a whole new post
//     if (updating) {
//       newPost.id = postId;
//       updatePost(newPost);
//     }
//     else {
//       submitPost(newPost);
//     }
//   });

//   // Submits a new post and brings user to searchPage upon completion
//   function submitPost(Post) {
//     $.post("/api/posts/", Post, function() {
//       window.location.href = "/search";
//     });
//   }

//   // Gets post data for a post if we're editing
//   function getPostData(id) {
//     $.get("/api/posts/" + id, function(data) {
//       if (data) {
//         // If this post exists, prefill our mainPage forms with its data
//         nameInput.val(data.name);
//         addressInput.val(data.address);
//         cityInput.val(data.city);
//         stateInput.val(state.name);
//         zipInput.val(data.zip);
//         emailInput.val(data.email);
//         // passInput.val(data.password);
//         moveFromInput.val(data.moveFrom);
//         // photoInput.val(data.photo);
        
//         // If we have a post with this id, set a flag for us to know to update the post
//         // when we hit submit
//         updating = true;
//       }
//     });
//   }

//   // Update a given post, bring user to the searchPage when done
//   function updatePost(post) {
//     $.ajax({
//       method: "PUT",
//       url: "/api/posts",
//       data: post
//     })
//     .done(function() {
//       window.location.href = "/search";
//     });
//   }
// });