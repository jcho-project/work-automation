const robot = require("robotjs");
const XLSX = require("xlsx");
const { exec } = require("child_process");
// const { spawn } = require("child_process");
const execFile = require("child_process").execFile;

// spawn("git", ["log", "--pretty=oneline"]).stdout.pipe(process.stdout)

// --------------------------------------------
// Required Date Formats
// --------------------------------------------

let today = new Date();
let yesterday = new Date();

yesterday.setDate(today.getDate() - 1)

// Previous & Current File Date Strings
let formatYesterday = yesterday.toLocaleDateString().split("/");
let formatToday = today.toLocaleDateString().split("/");

formatToday = [formatToday[2], (formatToday[0] > 9 ? "" : "0") + formatToday[0], (formatToday[1] > 9 ? "" : "0") + formatToday[1]].join("")

formatYesterday = [formatYesterday[2], (formatYesterday[0] > 9 ? "" : "0") + formatYesterday[0], (formatYesterday[1] > 9 ? "" : "0") + formatYesterday[1]].join("")

// --------------------------------------------
// Directory & File Paths
// --------------------------------------------

const originalDataDir = "C:\\Users\\junehyok.cho\\Desktop\\"
const rawDataDir = "Y:\\Logistik\\Zoll (neu)\\Swiss\\Swiss HA\\Download Test\\"

const previous = "C:\\Users\\junehyok.cho\\Desktop\\" + "HA_" + formatYesterday + ".xlsm"
const current = "C:\\Users\\junehyok.cho\\Desktop\\" + "HA_" + formatToday + ".xlsm"
const rawMain = "Y:\\Logistik\\\"Zoll (neu)\"\\Swiss\\\"Swiss HA\"\\\"Download Test\"\\" + formatToday + "_Main" + ".xlsx"
const rawE15 = "Y:\\Logistik\\Zoll (neu)\\Swiss\\Swiss HA\\Download Test\\" + formatToday + "_E15" + ".xlsx"
const rawE3X = "Y:\\Logistik\\Zoll (neu)\\Swiss\\Swiss HA\\Download Test\\" + formatToday + "_E3X" + ".xlsx"

// console.log(originalDataDir);
// console.log(rawDataDir);
// console.log(previous);
// console.log(current);
// console.log(rawMain);
// console.log(rawE15);
// console.log(rawE3X);

// --------------------------------------------
// Open & Save to New File
// --------------------------------------------

// let previousWb = XLSX.readFile(previous);
// let previousWs = previousWb.Sheets[formatYesterday];

// let desired_cell = previousWs["A2"];
// let desired_value = (desired_cell ? desired_cell.v : undefined);

// console.log(desired_value)
// "C:\\Users\\junehyok.cho\\Desktop\\HA_20191112.xlsm"
const child = exec("C:\\Users\\junehyok.cho\\Desktop\\HA_20191112.xlsm", [], (error, stdout, stderr) => {
  if (error) return console.log(error)
  console.log(stdout);
})

function format() {
  setTimeout(function () {
    robot.keyToggle("command", "down");
    robot.keyTap("up");
    robot.keyToggle("command", "up");
    robot.keyToggle("command", "down");
    robot.keyTap("right");
    robot.keyToggle("command", "up");
    robot.keyToggle("command", "down");
    robot.keyTap("down");
    robot.keyToggle("command", "up");

    robot.keyToggle("control", "down");
    robot.keyTap("up");
    robot.keyToggle("control", "up");
    robot.keyToggle("control", "down");
    robot.keyTap("left");
    robot.keyToggle("control", "up");

    robot.keyTap("down");
    robot.keyToggle("shift", "down");
    robot.keyTap("space");
    robot.keyToggle("shift", "up");

    robot.keyToggle("shift", "down");
    robot.keyToggle("control", "down");
    robot.keyTap("down");
    robot.keyToggle("shift", "up");
    robot.keyToggle("control", "up");
  }, 10000)
}


// child.on("close", (code, signal) => {
//   console.log(`child process terminated due to receipt of signal ${signal}`);
//   child.kill()
// });


// const child2 = exec.exec(rawMain, (error, stdout, stderr) => {
//   if (error) {
//     throw error;
//   }
//   console.log("Second")
// })
