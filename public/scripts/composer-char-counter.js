//document object helps JS to access and modify my elements in

// const bodyParser = require("body-parser");

//my website.
$(document).ready(function () {
  //$( "p" ).text( "The DOM is now loaded and can be manipulated." );

  $("#tweet-text").keyup(function () {
    let currentLength = $(this).val().length;
    let counter = 140;
    let textLength = counter - currentLength;
    if (textLength < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#545149");
    }
    $(".counter").text(textLength);
  });
  let $btn = $("#main-toggle-button");

  // select the button element;

  $btn.on("click", function () {
    window.scrollTo(0, 0);
    $("#tweet-text").focus();
  });
  $(document).on("scroll", function () {
    // console.log("I am here");
    if ($(document).scrollTop() === 0) {
      $btn.hide();
    } else {
      $btn.show();
    }
  });
});
//register an event handler to the
// textarea element for the form
//inside of the .new-tweet section.
