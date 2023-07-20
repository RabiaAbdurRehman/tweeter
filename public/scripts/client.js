/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  $("#error-messages-for-empty").hide();
  $("#error-messages-for-exceeding").hide();
  /**this function gets a tweet and create tweet elements. */
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
    let $tweet = ` <article class="tweet">
    <header>

      <div class="intro">
        <img width="80px" src="${tweet.user.avatars}">
        <div class="name1">${tweet.user.name}</div>
      </div>
      <div class="email">${tweet.user.handle}</div>
    </header>
    <p>${escape(tweet.content.text)}</p>
    <footer>
      <span class="tweet-age">
      ${timeago.format(tweet.created_at)}
        </span>
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
    </article>`;
    return $tweet;
  };
  /** this function take an array of objects and render them to the DOM*/
  const renderTweets = function (tweets) {
    //to empty our tweet containers before we get a new tweet.
    $("#tweets-container").empty();
    // loops through tweets
    tweets.map((tweet) => {
      //calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);

      // takes return value and appends it to the tweets container
      $("#tweets-container").prepend($tweet);
    });
  };
  //adding an Event handlers
  $("#new-tweet-form").on("submit", function (event) {
    event.preventDefault();
    $("#error-messages-for-empty").hide();
    $("#error-messages-for-exceeding").hide();
    let tweetContents = $(this).serialize();
    //To create a variable so I can use to apply my conditions.
    let txt = $("#tweet-text").val().trim();

    if (txt.length === 0) {
      $("#error-messages-for-empty").show();
      return;
    }
    if (txt.length > 140) {
      $("#error-messages-for-exceeding").show();
      return;
    }
    $.post("/tweets", tweetContents)
      .done(function (data) {
        //This line is to clear the form after submission.
        $("#tweet-text").val("");
        // this line is to reset the counter.
        $(".counter").text(140);
        loadTweets();
      })
      .fail(function (error) {
        alert("error!");
      });
  });
  /*this function is responsible to fetch tweets by requesting
    through jquery*/
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      dataType: "json",
      success: function (tweet) {
        renderTweets(tweet);
      },
      error: function () {
        alert("Error!");
      },
    });
  };
  loadTweets();
});
