document.body.onload = function () {
  chrome.tabs.getAllInWindow(null, function (tabs) {
    var flag = true;
    for (var i = 0; i < tabs.length; i++) {
      if (
        tabs[i].url.includes("www.dod.gr") ||
        tabs[i].url.includes("apps.facebook.com/dodcommunity")
      ) {
        flag = false;
        break;
      }
    }
    if (flag) {
      chrome.storage.local.set({
        RemainingCards:
          "Mahjong,Dogs,P,Dragon,2s,2h,2d,2c,3s,3h,3d,3c,4s,4h,4d,4c,5s,5h,5d,5c,6s,6h,6d,6c,7s,7h,7d,7c,8s,8h,8d,8c,9s,9h,9d,9c,Ts,Th,Td,Tc,Js,Jh,Jd,Jc,Qs,Qh,Qd,Qc,Ks,Kh,Kd,Kc,As,Ah,Ad,Ac,",
      });
    }
  });
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    let url = tabs[0].url;
    if (
      url.includes("www.dod.gr") ||
      url.includes("apps.facebook.com/dodcommunity")
    ) {
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
            } else if (Card === "P") {
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
    } else {
      var tmp =
        "<h3 style='margin:5px';> Παίξε Tichu! </h3>" +
        "<a href='https://apps.facebook.com/dodcommunity'  target='_blank'><img src='images/facebook.svg' title='Dod Facebook' style='margin:5px';</a>" +
        "<a href='http://dod.gr/'  target='_blank'><img src='images/web.svg' title='Dod Website' style='margin:5px';></a>";
      document.getElementById("PlayTichu").innerHTML = tmp;
    }
  });
};
