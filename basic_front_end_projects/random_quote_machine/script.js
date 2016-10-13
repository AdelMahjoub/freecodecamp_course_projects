$(document).ready(function(){
  function displayQuote(title, content){
          $('#quote-title').text(title);
          $('#quote-content').html(content);
  }
  function getRandomQuote(){
    $.ajax( {
      url: 'https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=',
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        displayQuote(post.title, post.content);
        //$('#quote-title').text(post.title);
        //$('#quote-content').html(post.content);
        //prepopulate the tweet text
        var url = "https://twitter.com/intent/tweet?text=";
        var quote = $("#quote-content").text().split(" ").join("%20");
        $("#tweet-text").attr("href",url+quote);
        // If the Source is available, use it. Otherwise hide it.
        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          $('#quote-source').html('Source:' + post.custom_meta.Source);
        } else {
          $('#quote-source').text('');
        }
      },
      cache: false, 
    });
  }
  getRandomQuote();//display a quote on load
  $('#quoteBtn').on('click', getRandomQuote)
});
