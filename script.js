let itemCart = {};
let currRFID = "";
let addItems = true;
let qrCode = null;

let lookupTable = {
  "24317065": "Shin Ramen",
  "03412913": "Bananas",
  "17227906": "Nutella"
};

$("body").on("keyup", function(e) {
  if (
    (event.keyCode >= 48 && event.keyCode <= 57) ||
    (event.keyCode >= 65 && event.keyCode <= 90)
  ) {
    currRFID += String.fromCharCode(e.keyCode);
  } else if (e.keyCode == 13) {
    // Check if we're in adding mode
    if (addItems) {
      if (itemCart[currRFID] == null) {
        //Add element to list
        $("#cart").append(
          '<li class="list-group-item d-flex justify-content-between align-items-center" id="' +
            currRFID +
            '">' +
            lookupTable[currRFID] +
            '<span class="badge badge-primary badge-pill">' +
            1 +
            "</span> </li>"
        );
        itemCart[currRFID] = 0;
      }
      itemCart[currRFID] = itemCart[currRFID] + 1;
      $("#" + currRFID + " span").text(itemCart[currRFID]);
    } else {
      if (itemCart.hasOwnProperty(currRFID)) {
        itemCart[currRFID]--;
        $("#" + currRFID + " span").text(itemCart[currRFID]);
        if (itemCart[currRFID] == 0) {
          delete itemCart[currRFID];
          $("#" + currRFID).remove();
        }
      } else {
        alert(
          "Item not in cart! Please switch to adding mode if you'd like to put it in the cart."
        );
      }
    }
    currRFID = "";
    console.log(itemCart);
  }
});

$("#addRemove").click(function() {
  addItems = !addItems;
  let buttonText = addItems ? "Remove Items from Cart" : "Add Items to Cart";
  let titleText = addItems
    ? "Currently: ADDING ITEMS"
    : "Currently: REMOVING ITEMS";
  $("#addRemoveText").text(buttonText);
  $("#titleAddRemoveText").text(titleText);
});

$("#generate").click(function() {
  const currCart = JSON.stringify(itemCart);
  console.log(currCart);
  if (qrCode != null) {
    qrCode.clear();
    qrCode.makeCode(currCart);
  } else {
    qrCode = new QRCode("qrcode", {
      text: currCart,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#fefbef",
      correctLevel: QRCode.CorrectLevel.H
    });
  }
});
