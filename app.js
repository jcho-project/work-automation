var robot = require("robotjs");


const mousePosition = robot.getMousePos(),
  addressBarPos = { x: 203, y: 38 },
  usernamePos = { x: 944, y: 398 },
  passwordPos = { x: 944, y: 418 },
  securityPos = { x: 944, y: 528 },
  firstPopup = { x: 952, y: 526 },
  secondPopup = { x: 564, y: 14 },
  thirdPopup = { x: 638, y: 723 };

console.log(mousePosition);

// { width: 1536, height: 864 }

robot.setMouseDelay(4000);

function openIE() {
  robot.moveMouse(24, 843);
  robot.mouseClick();
  robot.typeString("Internet Explorer");
  robot.keyTap("enter");
}

function openVPN() {
  robot.moveMouse(addressBarPos.x, addressBarPos.y);
  robot.mouseClick();
  robot.typeString("eicvpn.lge.com");
  robot.keyTap("enter");
}

function closePopups() {
  // Close All Popups
  // First Popup
  robot.moveMouse(firstPopup.x, firstPopup.y);
  robot.mouseClick();

  // Second Popup
  robot.moveMouse(secondPopup.x, secondPopup.y);
  robot.mouseClick();

  // Third Popup
  robot.moveMouse(thirdPopup.x, thirdPopup.y);
  robot.mouseClick();
}

function login() {
  // Username
  robot.moveMouse(usernamePos.x, usernamePos.y);
  robot.typeString("lge/junehyok.cho");

  // Password
  robot.moveMouse(passwordPos.x, passwordPos.y);
  robot.typeString("Dayeahn0220@0");

  // Security Code
  robot.moveMouse(securityPos.x, securityPos.y);
}

openIE();
openVPN();
closePopups();
login();
