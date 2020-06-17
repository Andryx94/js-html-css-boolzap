$(document).ready(
  function() {
    var inputMessaggio = $(".right-message .text-input input");
    var microfono = $("#microfono");
    var telegram = $("#telegram");
    var nomeUtente = $(".nome-utente");
    var ricerca = $(".left-search .search input");

    //avvio funzione a focus su casella input messaggio
    inputMessaggio.focus(function() {
      microfono.toggleClass("hidden");
      telegram.toggleClass("hidden");
    });

    // inputMessaggio.focusout(function() {
    //   microfono.toggleClass("hidden");
    //   telegram.toggleClass("hidden");
    // });

    //avvio funzione a click icona telegram
    telegram.click(function() {
      invioMessaggio(inputMessaggio);
      inputMessaggio.val("");
    });

    //avvio funzione a pressione tasto invio
    inputMessaggio.keyup(function() {
      if ( event.which == 13 ) {
        invioMessaggio(inputMessaggio);
        inputMessaggio.val("");
      }
    });

    //ricerca contatti
    ricerca.keyup(function() {
      nomeUtente.each(function(){
        if ($(this).text().includes(ricerca.val())) {
          $(this).parents(".contatto").show();
        }
        else {
          $(this).parents(".contatto").hide();
        }
      });
    });
  }
);

//FUNZIONE invio messaggio utente
function invioMessaggio(inputMessaggio) {
  if (inputMessaggio.val() != "") {
    //inserisce l'input nel template e crea un clone a cui rimuove la classe hidden
    var input = $(".right-chat .chat .message-green.hidden span").text(inputMessaggio.val());
    var orario= $(".right-chat .chat .message-green.hidden .orario").text(oraAttuale());
    var clone = $(".right-chat .chat .message-green.hidden").clone();

    clone.removeClass("hidden");

    //appendo il clone alla chat
    $(".right-chat .chat").append(clone);

    //scrolla la chat all'ultimo messaggio
    $(".right-chat").scrollTop($(".right-chat").height());

    //avvia la funzione di risposta automatica
    setTimeout(rispostaMessaggio, 1000);
  }
};

//FUNZIONE risposta automatica messaggio
function rispostaMessaggio(){
  // crea un clone a cui rimuove la classe hidden
  var clone = $(".right-chat .chat .message-white.hidden").clone();
  var orario= $(".right-chat .chat .message-white.hidden .orario").text(oraAttuale());
  clone.removeClass("hidden");

  ////appendo il clone alla chat
  $(".right-chat .chat").append(clone);

  //scrolla la chat all'ultimo messaggio
  $(".right-chat").scrollTop($(".right-chat").height());
};

//FUNZIONE orario attuale
function oraAttuale() {
  var today = new Date();
  var hours = today.getHours();
  var minutes = today.getMinutes();
  var time = addZero(hours) + ":" + addZero(minutes);
  return time
}

//controllo numero a doppia cifra
function addZero(numero){
  if (numero < 10) {
    numero = "0" + numero;
  }
  return numero
}
