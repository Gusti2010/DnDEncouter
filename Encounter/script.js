"use strict";

// Handle Monster rows
let monrows = 1;
// Add Monster row
document.querySelector(".addenemies").addEventListener("click", function () {
  if (monrows == 4) {
    return;
  }
  monrows++;
  let monx = document.getElementById("monsters" + String(monrows));
  monx.removeAttribute("hidden");
});

// Remove Monster row
document.querySelector(".rmvenemies").addEventListener("click", function () {
  if (monrows == 1) {
    return;
  }
  let monx = document.getElementById("monsters" + String(monrows));
  monx.setAttribute("hidden", "");
  document.querySelector(".numenemies" + String(monrows)).value = null;
  document.querySelector(".enemiesxp" + String(monrows)).value = null;
  monrows--;
});

// Handle Party rows
let parrows = 1;
// Add party rows
document.querySelector(".addmembers").addEventListener("click", function () {
  if (parrows == 4) {
    return;
  }
  parrows++;
  let parx = document.getElementById("party" + String(parrows));
  parx.removeAttribute("hidden");
});

// Remove party row
document.querySelector(".rmvmembers").addEventListener("click", function () {
  if (parrows == 1) {
    return;
  }
  let parx = document.getElementById("party" + String(parrows));
  parx.setAttribute("hidden", "");
  document.querySelector(".partysize" + String(parrows)).value = null;
  document.querySelector(".partyxp" + String(parrows)).value = null;
  parrows--;
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

document.querySelector(".compute").addEventListener("click", function () {
  const numberOfChars =
    Number(document.querySelector(".partysize").value) +
    Number(document.querySelector(".partysize2").value);
  Number(document.querySelector(".partysize3").value);
  Number(document.querySelector(".partysize4").value);
  const totalXP = Math.round(
    (Number(document.querySelector(".partyxp").value) +
      Number(document.querySelector(".partyxp2").value) +
      Number(document.querySelector(".partyxp3").value) +
      Number(document.querySelector(".partyxp4").value)) /
      parrows
  );
  const numberOfMonsters =
    Number(document.querySelector(".numenemies").value) +
    Number(document.querySelector(".numenemies2").value);
  Number(document.querySelector(".numenemies3").value);
  Number(document.querySelector(".numenemies4").value);
  const totalMonsterXP =
    Number(document.querySelector(".enemiesxp").value) *
      Number(document.querySelector(".numenemies").value) +
    Number(document.querySelector(".enemiesxp2").value) *
      Number(document.querySelector(".numenemies2").value) +
    Number(document.querySelector(".enemiesxp3").value) *
      Number(document.querySelector(".numenemies3").value) +
    Number(document.querySelector(".enemiesxp4").value) *
      Number(document.querySelector(".numenemies4").value);

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
