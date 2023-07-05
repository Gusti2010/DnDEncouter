"use strict";

// Handle Monster rows
let monrows = 1;
// Add Monster row
document.querySelector(".addenemies").addEventListener("click", function () {
  if (monrows == 10) {
    return;
  }
  monrows++;
  var table = document.getElementById("monsterTable");
  var row = table.insertRow(monrows);

  for (var i = 0; i < 2; i++) {
    var numTd = row.insertCell(i);
    var sizeInput = document.createElement("input");
    sizeInput.setAttribute("type", "number");
    if (i == 0) {
      sizeInput.setAttribute("class", "numenemies" + String(parrows));
      sizeInput.setAttribute("Placeholder", "Number of monsters");
    } else {
      sizeInput.setAttribute("class", "enemiesxp" + String(parrows));
      sizeInput.setAttribute("Placeholder", "Monster XP");
    }
    numTd.appendChild(sizeInput);
  }
});

// Remove Monster row
document.querySelector(".rmvenemies").addEventListener("click", function () {
  if (monrows == 1) {
    return;
  }
  document.getElementById("monsterTable").deleteRow(monrows--);
});

// Handle Party rows
let parrows = 1;
// Add party rows
document.querySelector(".addmembers").addEventListener("click", function () {
  if (parrows == 10) {
    return;
  }
  parrows++;
  var table = document.getElementById("partyTable");
  var row = table.insertRow(parrows);

  for (var i = 0; i < 2; i++) {
    var partysizeTd = row.insertCell(i);
    var sizeInput = document.createElement("input");
    sizeInput.setAttribute("type", "number");
    if (i == 0) {
      sizeInput.setAttribute("class", "partysize" + String(parrows));
      sizeInput.setAttribute("Placeholder", "Partysize");
    } else {
      sizeInput.setAttribute("class", "partyxp" + String(parrows));
      sizeInput.setAttribute("Placeholder", "Level");
    }
    partysizeTd.appendChild(sizeInput);
  }
});

// Remove party row
document.querySelector(".rmvmembers").addEventListener("click", function () {
  if (parrows == 1) {
    return;
  }
  document.getElementById("partyTable").deleteRow(parrows--);
});

// Calculate Encounter Difficulty
const evaluate = function () {
  const pSize = Number(document.querySelector(".partysize").value);
  console.log(pSize);
};

const calculatePerXP = function (
  numberOfChars,
  level,
  numberOfMonsters,
  totalMonsterXP
) {
  // Catch wrong inputs
  if (Math.min(numberOfMonsters, totalMonsterXP, level, numberOfChars) < 0) {
    return EncounterDifficulty.ERROR;
  }

  let diffMultiplier = 1.0;
  switch (numberOfMonsters) {
    case 2:
      diffMultiplier = 1.5;
      break; // Pair
    case 3:
    case 4:
    case 5:
    case 6:
      diffMultiplier = 2.0;
      break; // Group
    case 7:
    case 8:
    case 9:
    case 10:
      diffMultiplier = 2.5;
      break; // Gang
    case 11:
    case 12:
    case 13:
    case 14:
      diffMultiplier = 3.0;
      break; // Mob
    default:
      if (numberOfMonsters > 14) {
        diffMultiplier = 4.0; // Horde
      } else {
        diffMultiplier = numberOfMonsters > 0 ? 1 : 0; // Single or None
      }
  }

  console.log(diffMultiplier);

  if (numberOfChars > 5) {
    if (diffMultiplier == 1.0) {
      diffMultiplier = 0.5;
    } else if (diffMultiplier == 1.5) {
      diffMultiplier = 1.0;
    } else if (diffMultiplier == 2.0) {
      diffMultiplier = 1.5;
    } else if (diffMultiplier == 2.5) {
      diffMultiplier = 2.0;
    } else if (diffMultiplier == 3.0) {
      diffMultiplier = 2.5;
    } else if (diffMultiplier == 4.0) {
      diffMultiplier = 3.0;
    } else {
      diffMultiplier = 0;
    }
  } else if (numberOfChars < 3) {
    if (diffMultiplier == 1.0) {
      diffMultiplier = 1.5;
    } else if (diffMultiplier == 1.5) {
      diffMultiplier = 2.0;
    } else if (diffMultiplier == 2.0) {
      diffMultiplier = 2.5;
    } else if (diffMultiplier == 2.5) {
      diffMultiplier = 3.0;
    } else if (diffMultiplier == 3.0) {
      diffMultiplier = 4.0;
    } else if (diffMultiplier == 4.0) {
      diffMultiplier = 5.0;
    } else {
      diffMultiplier = 0;
    }
  }

  console.log(diffMultiplier);
  const adjustedMonsterXP = totalMonsterXP * diffMultiplier;

  if (adjustedMonsterXP >= numberOfChars * levelXP[3][level - 1]) {
    return EncounterDifficulty.DEADLY;
  } else if (adjustedMonsterXP >= numberOfChars * levelXP[2][level - 1]) {
    return EncounterDifficulty.HARD;
  } else if (adjustedMonsterXP >= numberOfChars * levelXP[1][level - 1]) {
    return EncounterDifficulty.MEDIUM;
  } else if (adjustedMonsterXP >= numberOfChars * levelXP[0][level - 1]) {
    return EncounterDifficulty.EASY;
  }

  return EncounterDifficulty.TRIVIAL;
};

const EncounterDifficulty = {
  TRIVIAL: "TRIVIAL",
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD",
  DEADLY: "DEADLY",
  ERROR: "Sad Programmer Noises :(",
};

const easy = [
  25, 50, 75, 125, 250, 300, 350, 450, 550, 600, 800, 1000, 1100, 1250, 1400,
  1600, 2000, 2100, 2400, 2800,
];
const medium = [
  50, 100, 150, 250, 500, 600, 750, 900, 1100, 1200, 1600, 2000, 2200, 2500,
  2800, 3200, 3900, 4200, 4900, 5700,
];
const hard = [
  75, 150, 225, 375, 750, 900, 1100, 1400, 1600, 1900, 2400, 3000, 3400, 3800,
  4300, 4800, 5900, 6300, 7300, 8500,
];
const deadly = [
  100, 200, 400, 500, 1100, 1400, 1700, 2100, 2400, 2800, 3600, 4500, 5100,
  5700, 6400, 7200, 8800, 9500, 10900, 12700,
];
const levelXP = [easy, medium, hard, deadly];

const inputCalc = function (str, rows, xp) {
  let result = 0;
  for (var i = 0; i < rows; i++) {
    result += Number(document.querySelector(str + String(i + 1)).value);
  }
  return xp ? result / rows : result;
};

const monxpCalc = function (rows) {
  let result = 0;
  for (var i = 0; i < rows; i++) {
    result +=
      Number(document.querySelector(".enemiesxp" + String(i + 1)).value) *
      Number(document.querySelector(".numenemies" + String(i + 1)).value);
  }
  return result;
};

document.querySelector(".compute").addEventListener("click", function () {
  const numberOfChars = inputCalc(".partysize", parrows, false);
  const totalXP = Math.round(inputCalc(".partyxp", parrows, true));
  const numberOfMonsters = inputCalc(".numenemies", monrows, false);
  const totalMonsterXP = monxpCalc(monrows);

  const result = calculatePerXP(
    numberOfChars,
    totalXP,
    numberOfMonsters,
    totalMonsterXP
  );

  console.log(numberOfChars, totalXP, numberOfMonsters, totalMonsterXP);

  console.log(result);

  document.querySelector(".result").textContent = result;
  //   evaluate();
});
