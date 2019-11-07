var robot = require("robotjs");

const rightScreen = { x: 1901, y: 18 },
  modelCategory = { x: 1383, y: 468 },
  mwo = { x: 1316, y: 469 },
  rac = { x: 1316, y: 398 },
  ref = { x: 1316, y: 421 },
  vc = { x: 1316, y: 421 },
  wm = { x: 1316, y: 493 },
  add = { x: 1768, y: 309 },
  ok = { x: 1712, y: 551 },
  currency = { x: 1448, y: 541 },
  orderDate = { x: 1940, y: 562 },
  exportLocation = { x: 1324, y: 199 },
  yes = { x: 1352, y: 598 },
  saveAsType = { x: 1471, y: 444 };

// Initialze Keyboard and Mouse Delay Speed
robot.setKeyboardDelay(1000);
robot.setMouseDelay(1000);

// Get Date from Last Year
let today = new Date();
let lastYear = new Date();

lastYear.setDate(today.getDate() + 1);
lastYear.setFullYear(today.getFullYear() - 1);

let formattedToday = today.toLocaleDateString().split("/");
formattedToday = [formattedToday[2], (formattedToday[0] > 9 ? "" : "0") + formattedToday[0], (formattedToday[1] > 9 ? "" : "0") + formattedToday[1]].join("");

let formattedDate = lastYear.toLocaleDateString().split("/");
formattedDate = [(formattedToday[1] > 9 ? "" : "0") + formattedDate[1], (formattedToday[0] > 9 ? "" : "0") + formattedDate[0], formattedDate[2]].join("-")

// Reset Screen Focus in GERP to Navigation Menu
function resetScreen() {
  robot.moveMouse(rightScreen.x, rightScreen.y);
  robot.mouseClick();
  robot.keyTap("alt");
  robot.keyTap("w");
  robot.keyTap("1");
}

// Open Sales Order Inquiry (snapshot)
function openSalesOrder() {
  robot.keyToggle("control", "down");
  robot.keyTap("l");
  robot.keyToggle("control", "up");
  robot.typeString("sal o");
  robot.keyTap("down");
  robot.keyTap("down");
  robot.keyTap("enter");
}

// Search Model Category for Search
function searchModel() {
  // Click Model Category
  robot.moveMouse(modelCategory.x, modelCategory.y);
  robot.mouseClick();

  // Click MWO
  robot.scrollMouse(0, -600);
  robot.moveMouse(mwo.x, mwo.y);
  robot.mouseClick();

  // Click RAC & REF
  robot.scrollMouse(0, -600);
  robot.moveMouse(rac.x, rac.y);
  robot.mouseClick();
  robot.moveMouse(ref.x, ref.y);
  robot.mouseClick();

  // Click V/C & W/M
  robot.scrollMouse(0, -600);
  robot.moveMouse(vc.x, vc.y);
  robot.mouseClick();
  robot.moveMouse(wm.x, wm.y);
  robot.mouseClick();

  // Click Add & OK
  robot.moveMouse(add.x, add.y);
  robot.mouseClick();
  robot.moveMouseSmooth(ok.x, ok.y)
  robot.mouseClick();
}

// Enter Currency and Date Frame for Search
function currencyAndDate() {
  // Click and Change Currency to CHF
  robot.moveMouse(currency.x, currency.y);
  robot.mouseClick();
  robot.typeString("CHF");

  // Click and Change Order Date from Last Year
  robot.moveMouse(orderDate.x, orderDate.y);
  robot.mouseClick();
  robot.typeString(formattedDate);

  // Find
  robot.keyToggle("alt", "down");
  robot.keyTap("i");
  robot.keyToggle("alt", "up");
}

// Export Retrieved Search Result as Excel
async function exportSO() {
  robot.moveMouse(rightScreen.x, rightScreen.y);
  robot.mouseClick();

  setTimeout(function () {
    // Export found Sales Order
    robot.moveMouse(exportLocation.x, exportLocation.y);
    robot.mouseClick();
    robot.keyTap("alt");
    robot.keyTap("f");
    robot.keyTap("e");
  }, 5000)
}

// Run Macro and Format Excel File
async function excelFormat() {
  setTimeout(function () {
    // Export Open
    robot.keyTap("enter");
  }, 15000);

  setTimeout(function () {
    // File Security Popup Click
    robot.moveMouse(yes.x, yes.y);
    robot.mouseClick();
  }, 30000)

  setTimeout(function () {
    // Format Excel File using Macro and Move to Right
    robot.keyToggle("control", "down");
    robot.keyTap("q");
    robot.keyToggle("control", "up");

    robot.keyToggle("command", "down");
    robot.keyTap("right");
    robot.keyToggle("command", "up");
  }, 35000)
}

// Navigate and Save to specified Directory
async function excelSave() {
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
    robot.typeString(formattedToday + "_Main")

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
  }, 45000)
}

async function execute() {
  await Promise.all([exportSO(), excelFormat(), excelSave()]);
}

function initialSearch() {
  resetScreen();
  openSalesOrder();
  searchModel();
  currencyAndDate();
}

// initialSearch();
execute();