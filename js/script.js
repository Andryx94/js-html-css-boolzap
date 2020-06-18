$(document).ready(
  function() {
    var inputMessaggio = $(".right-message .text-input input");
    var microfono = $("#microfono");
    var telegram = $("#telegram");
    var nomeUtente = $(".nome-utente");
    var ricerca = $(".left-search .search input");
    var contatto = $(".contatto");

    //avvio funzione a focus su casella input messaggio
    inputMessaggio.focus(function() {
      microfono.toggleClass("hidden");
      telegram.toggleClass("hidden");
    });

    inputMessaggio.focusout(function() {
      setTimeout(function() {
        microfono.toggleClass("hidden");
        telegram.toggleClass("hidden");
      }, 100);
    });

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

    //avvio funzione a click icona arrow
    $(document).on("click", ".arrow", function() {
      $(this).siblings(".dropdown").toggleClass("hidden");
    });

    //avvio funzione a click cancella messaggio in dropdown
    $(document).on("click", ".delete", function() {
      $(this).parents(".box").remove();
    });

    //avvio funzione a click contatto
    contatto.on("click", function() {
    var attrUtente = $(this).attr("data-user");
    var attrChat = '.chat[data-chat="' + attrUtente + '"]';

    //aggiungo classe active all'elemento selezionato rimuovendola agli altri fratelli
    $(this).addClass("active");
    $(this).siblings().removeClass("active");

    //rimuovo classe hodden all'elemento selezionato aggiungendola agli altri fratelli
    $(attrChat).removeClass("hidden");
    $(attrChat).addClass("mostra");
    $(attrChat).siblings().addClass("hidden");
    $(attrChat).siblings().removeClass("mostra");
    });
  }
);

//FUNZIONE invio messaggio utente
function invioMessaggio(inputMessaggio) {
  if (inputMessaggio.val() != "") {
    //inserisce l'input nel template e crea un clone a cui rimuove la classe hidden
    var input = $(".right-chat .chat .message-green.hidden .testo-utente").text(inputMessaggio.val());
    var orario= $(".right-chat .chat .message-green.hidden .orario").text(oraAttuale());
    var clone = $(".right-chat .mostra .message-green.hidden").clone();
    clone.removeClass("hidden");

    //appendo il clone alla chat
    $(".right-chat .mostra").append(clone);

    //scrolla la chat all'ultimo messaggio
    $(".right-chat").scrollTop($(".right-chat").height());

    //avvia la funzione di risposta automatica
    setTimeout(rispostaMessaggio, 1000);
  }
};

//FUNZIONE risposta automatica messaggio
function rispostaMessaggio(){
  // crea un clone a cui rimuove la classe hidden
  var orario= $(".right-chat .chat .message-white.hidden .orario").text(oraAttuale());
  var clone = $(".right-chat .mostra .message-white.hidden").clone();
  clone.removeClass("hidden");

  ////appendo il clone alla chat
  $(".right-chat .mostra").append(clone);

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
