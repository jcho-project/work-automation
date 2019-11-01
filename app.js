var robot = require("robotjs");

const mousePosition = robot.getMousePos();

const rightScreen = { x: 1901, y: 18 },
  leftScreen = { x: 783, y: 18 },
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
  yes = { x: 1352, y: 598 };


robot.setKeyboardDelay(1000);
robot.setMouseDelay(1000);

// Get Date from Last Year
let today = new Date();
let lastYear = new Date();

lastYear.setDate(today.getDate() + 1);
lastYear.setFullYear(today.getFullYear() - 1);

let formattedDate = lastYear.toLocaleDateString().split("/");
formattedDate = [formattedDate[1], formattedDate[0], formattedDate[2]].join("-")

function resetScreen() {
  robot.moveMouse(rightScreen.x, rightScreen.y);
  robot.mouseClick();
  robot.keyTap("alt");
  robot.keyTap("w");
  robot.keyTap("1");
}

function openSalesOrder() {
  robot.keyToggle("control", "down");
  robot.keyTap("l");
  robot.keyToggle("control", "up");
  robot.typeString("sal o");
  robot.keyTap("down");
  robot.keyTap("down");
  robot.keyTap("enter");
}

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

async function currencyAndDate() {
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
  robot.keyToggle("control", "up");
}

async function exportSO() {
  // await currencyAndDate();
  // Export found Sales Order
  robot.moveMouse(exportLocation.x, exportLocation.y);
  robot.mouseClick();
  robot.keyTap("alt");
  robot.keyTap("f");
  robot.keyTap("e");
  setTimeout(function () {
    robot.keyTap("enter");
  }, 3000);
}

async function excelFormat() {
  await exportSO();

  setTimeout(function () {
    robot.moveMouse(yes.x, yes.y);
    robot.mouseClick();
  }, 10000)

  setTimeout(function () {
    robot.keyToggle("control", "down");
    robot.keyTap("q");
    robot.keyToggle("control", "up");

    robot.keyToggle("command", "down");
    robot.keyTap("right");
    robot.keyToggle("command", "up");

    robot.moveMouse(rightScreen.x, rightScreen.y);
    robot.mouseClick();
  }, 13000)
}

async function excelSave() {
  await excelFormat();

  robot.keyTap("alt")
  robot.keyTap("f")
  robot.keyTap("a")
  robot.keyTap("c")
  robot.keyTap("7")
}

console.log(mousePosition);

// resetScreen();
// openSalesOrder();
// searchModel();
// currencyAndDate();
// exportSO();
// excelFormat();
excelSave();

