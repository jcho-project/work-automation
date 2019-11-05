var robot = require("robotjs");

const rightScreen = { x: 1901, y: 18 },
  snapshot = { x: 1594, y: 255 },
  goodset = { x: 1677, y: 130 },
  inventoryOrg = { x: 1387, y: 133 },
  yes = { x: 1352, y: 598 },
  saveAsType = { x: 1471, y: 444 };

// Initialze Keyboard and Mouse Delay Speed
robot.setKeyboardDelay(1000);
robot.setMouseDelay(1000);

// Get Date of Today
let today = new Date();

// Reset Screen Focus in GERP to Navigation Menu
function resetScreen() {
  robot.moveMouse(rightScreen.x, rightScreen.y);
  robot.mouseClick();
  robot.keyTap("alt");
  robot.keyTap("w");
  robot.keyTap("1");
}

// Open Current Inventory (ORG)
function openCurrInv() {
  robot.keyToggle("control", "down");
  robot.keyTap("l");
  robot.keyToggle("control", "up");
  robot.typeString("curr");
  robot.keyTap("enter");
}

function searchInit(invOrg) {
  robot.moveMouse(rightScreen.x, rightScreen.y);
  robot.mouseClick();

  if (invOrg === "E15") {
    robot.moveMouse(snapshot.x, snapshot.y);
    robot.mouseClick();

    robot.moveMouse(goodset.x, goodset.y);
    robot.mouseClick();
    robot.moveMouse(inventoryOrg.x, inventoryOrg.y);
    robot.mouseClick();
    robot.typeString(invOrg);

    robot.keyToggle("alt", "down");
    robot.keyTap("n");
    robot.keyToggle("alt", "up");
  } else {
    robot.moveMouse(inventoryOrg.x, inventoryOrg.y);
    robot.mouseClick();
    robot.typeString(invOrg);

    robot.keyToggle("alt", "down");
    robot.keyTap("n");
    robot.keyToggle("alt", "up");
  }
}

function excelExport() {
  robot.moveMouse(rightScreen.x, rightScreen.y);
  robot.mouseClick();

  robot.keyToggle("alt", "down");
  robot.keyTap("x");
  robot.keyToggle("alt", "up");

  robot.keyTap("enter");
  robot.keyTap("enter");

  setTimeout(function () {
    robot.keyTap("enter");
  }, 8000)

}

function excelFormat(macroKey) {
  setTimeout(function () {
    robot.moveMouse(yes.x, yes.y);
    robot.mouseClick();
  }, 17000)

  setTimeout(function () {
    robot.keyToggle("control", "down");
    robot.keyTap(macroKey);
    robot.keyToggle("control", "up");

    robot.keyToggle("command", "down");
    robot.keyTap("right");
    robot.keyToggle("command", "up");
  }, 20000)
}

// Navigate and Save to specified Directory
function excelSave(invOrg) {
  setTimeout(function () {
    // Initialize Focus
    robot.moveMouse(rightScreen.x, rightScreen.y);
    robot.mouseClick();

    // Navigate to Save As -> Browse
    robot.keyTap("alt")
    robot.keyTap("f")
    robot.keyTap("a")
    robot.keyTap("c")
    robot.keyTap("b")

    // Title of the Save File
    robot.typeString(today.getFullYear().toString() + today.getMonth().toString() + today.getDay().toString() + "_" + invOrg)

    // Save As File Type
    robot.keyTap("tab")

    robot.keyToggle("alt", "down");
    robot.keyTap("down");
    robot.keyToggle("alt", "up");

    robot.moveMouse(saveAsType.x, saveAsType.y);
    robot.mouseClick();

    // Navigate to the Save File Directory Address
    robot.keyToggle("alt", "down");
    robot.keyTap("d");
    robot.keyToggle("alt", "up");

    robot.typeString("Y:\\Logistik\\Zoll (neu)\\Swiss\\Swiss HA\\Download Test")
    robot.keyTap("enter");

    // Save and Exit File
    robot.keyToggle("alt", "down");
    robot.keyTap("s");
    robot.keyToggle("alt", "up");

    robot.keyToggle("alt", "down");
    robot.keyTap("f4");
    robot.keyToggle("alt", "up");
  }, 30000)
}

// Group Related Functions
function initialSearch(invOrg) {
  if (invOrg === "E15") {
    resetScreen();
    openCurrInv();
    searchInit("E15");
  } else {
    searchInit("E3X");
  }
}

function e15() {
  excelExport();
  excelFormat("w");
  excelSave("E15");
}

function e3X() {
  excelExport();
  excelFormat("e")
  excelSave("E3X");
}

// initialSearch("E15");
// e15();
// initialSearch("E3X");
e3X();
