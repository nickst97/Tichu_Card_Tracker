document.body.onload = function () {
  chrome.storage.local.get("RemainingCards", function (result) {
    if (!chrome.runtime.error) {
      var RemainingCards = result.RemainingCards.split(",");
      var HTMLcode = "<h2>";
      var PrevCardNumber = "";
      RemainingCards.forEach(function (Card) {
        if (Card === "Mahjong") {
          HTMLcode += " " + "🀄";
        } else if (Card === "Dogs") {
          HTMLcode += " " + "🐕";
        } else if (Card === "Dragon") {
          HTMLcode += " " + "🐉";
        } else if (Card === "PM") {
          HTMLcode += " " + "🐦";
        } else {
          if (Card.charAt(0) !== PrevCardNumber) {
            HTMLcode += "<br>";
            PrevCardNumber = Card.charAt(0);
          }
          if (Card.charAt(1) === "s") {
            HTMLcode += ' <span style="color:blue">';
            if (Card.charAt(0) === "T") {
              HTMLcode += " 10";
            } else {
              HTMLcode += ' <span style="letter-spacing: 5px">';
              HTMLcode += Card.charAt(0);
              HTMLcode += " </span>";
            }
            HTMLcode += " </span>";
          } else if (Card.charAt(1) === "h") {
            HTMLcode += ' <span style="color:red">';
            if (Card.charAt(0) === "T") {
              HTMLcode += " 10";
            } else {
              HTMLcode += ' <span style="letter-spacing: 5px">';
              HTMLcode += Card.charAt(0);
              HTMLcode += " </span>";
            }
            HTMLcode += " </span>";
          } else if (Card.charAt(1) === "d") {
            HTMLcode += ' <span style="color:black">';
            if (Card.charAt(0) === "T") {
              HTMLcode += " 10";
            } else {
              HTMLcode += ' <span style="letter-spacing: 5px">';
              HTMLcode += Card.charAt(0);
              HTMLcode += " </span>";
            }
            HTMLcode += " </span>";
          } else if (Card.charAt(1) === "c") {
            HTMLcode += ' <span style="color:green">';
            if (Card.charAt(0) === "T") {
              HTMLcode += " 10";
            } else {
              HTMLcode += ' <span style="letter-spacing: 5px">';
              HTMLcode += Card.charAt(0);
              HTMLcode += " </span>";
            }
            HTMLcode += " </span>";
          }
        }
      });
      HTMLcode += "</h2>";
      document.getElementById("RemainingCards").innerHTML = HTMLcode;
    }
  });
};
