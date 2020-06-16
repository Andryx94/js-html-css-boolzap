$(document).ready(
  function() {
    var inputMessaggio = $(".right-message .text-input input");
    var microfono = $("#microfono");
    var telegram = $("#telegram");

    inputMessaggio.focus(function() {
      microfono.toggleClass("hidden");
      telegram.toggleClass("hidden");
    });

    // inputMessaggio.focusout(function() {
    //   microfono.toggleClass("hidden");
    //   telegram.toggleClass("hidden");
    // });

    telegram.click(function() {
      invioMessaggio(inputMessaggio);
      inputMessaggio.val("");
    });

    inputMessaggio.keyup(function() {
      if ( event.which == 13 ) {
        invioMessaggio(inputMessaggio);
        inputMessaggio.val("");
      }
    });
  }
);

function invioMessaggio(inputMessaggio) {
  var input = $(".right-chat .chat .template p").text(inputMessaggio.val());
  var clone = $(".right-chat .chat .template").clone();
  clone.removeClass("template hidden");
  $(".right-chat .chat").append(clone);
};
