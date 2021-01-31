setInterval(function () {
  // chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
  //   let url = tabs[0].url;
  //   if (!url.includes("www.dod.gr")) {
  //     chrome.storage.local.set({
  //       RemainingCards: "null",
  //       LastRoundName: "null",
  //     });
  //   }
  // });

  if (document.getElementById("txtRound") !== null) {
    var CurrentRound = document.getElementById("txtRound").innerHTML;
    if (CurrentRound !== "") {
      chrome.storage.local.get("LastRoundName", function (result) {
        if (
          CurrentRound !== result.LastRoundName ||
          document.getElementById("txtRoundTimer").innerHTML === "00:00:00" ||
          document.getElementById("txtRoundTimer").innerHTML === "00:00:01" ||
          document.getElementById("txtRoundTimer").innerHTML.trim() ===
            "8:88:88" ||
          document.getElementById("txtRoundTimer").innerHTML === ""
        ) {
          chrome.storage.local.set({
            RemainingCards:
              "Mahjong,Dogs,Dragon,PM,2s,2h,2d,2c,3s,3h,3d,3c,4s,4h,4d,4c,5s,5h,5d,5c,6s,6h,6d,6c,7s,7h,7d,7c,8s,8h,8d,8c,9s,9h,9d,9c,Ts,Th,Td,Tc,Js,Jh,Jd,Jc,Qs,Qh,Qd,Qc,Ks,Kh,Kd,Kc,As,Ah,Ad,Ac,",

            LastRoundName: CurrentRound,
          });
        } else {
          var TableCards = document.querySelectorAll("div.card.notswipe");
          chrome.storage.local.get("RemainingCards", function (result) {
            if (!chrome.runtime.error) {
              var RemainingCards = result.RemainingCards;
              for (var i = 0; i < TableCards.length; i++) {
                RemainingCards = RemainingCards.replace(
                  TableCards[i].getAttribute("card") + ",",
                  ""
                );
              }
            }
            chrome.storage.local.set({
              RemainingCards: RemainingCards,
            });
          });
        }
      });
    }
  }
}, 10);
