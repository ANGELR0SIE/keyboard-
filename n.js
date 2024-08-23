document.addEventListener("DOMContentLoaded", function () {
  const keyboards = {
    rows: [
      ["a", "e", "i", "o", "u", "n", "t", "s", "r", "l", "1", "2", "3", ","],
      ["c", "d", "h", "m", "p", "b", "g", "y", "f", "w", "4", "5", "6", "'"],
      ["v", "k", "x", "j", "q", "z", ".", "@", "_", "-", "7", "8", "9", "0"],
      ["Backspace", "Tab", "Enter", "Space", "Next", "Send"],
    ],
  };

  let capsLockActive = false;
  let clickCount = 0;
  let currentRow = 0;
  let currentCol = 0;
  let currentDirectionIndex = 0;
  let isHoldAction = false;
  let clickTimeout;
  let longPressTimeout;

  const directions = ["right", "down", "left", "up"];
  const LONG_PRESS_DURATION = 1000;
  const TRIPLE_CLICK_TIME = 600;

  const keyboard = document.querySelector(".keyboard");
  const remoteBtn = document.querySelector(".remote-btn");
  const displayDirections = document.querySelector(".display-directions");
  const inputs = document.querySelectorAll("input, textArea");
  const displayKeys = document.querySelector(".display-keys");
  let currentInputIndex = 0; // Set default input to "To"

  const updateDirectionDisplay = () => {
    displayDirections.value = `Current Direction: ${directions[currentDirectionIndex]}`;
  };

  const createKeyboard = (keyboardLayout) => {
    keyboardLayout.rows.forEach((rowItems) => {
      const row = document.createElement("div");
      row.className = "row";
      rowItems.forEach((item) => {
        const key = document.createElement("button");
        key.innerHTML = item;
        key.className = "key";
        if (key.innerHTML == "Space") {
          key.id = "space";
        } else if (key.innerHTML == "Send") {
          key.id = "send";
        } else if (key.innerHTML == "Backspace") {
          key.id = "backspace";
        } else if (key.innerHTML == "Enter") {
          key.id = "enter";
        } else if (key.innerHTML == "Next") {
          key.id = "next";
        } else if (key.innerHTML == "Tab") {
          key.id = "tab";
        }
        row.append(key);
      });
      keyboard.append(row);
    });
    updateMatrix();
  };

  const updateMatrix = () => {
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => (key.className = "key"));
    const selectedKey =
      document.querySelectorAll(".row")[currentRow].children[currentCol];
    selectedKey.className = "key highlight";
    displayKeys.value = selectedKey.innerHTML;
  };

  const move = () => {
    const rowLengths = keyboards.rows.map(row => row.length);
    let newRow = currentRow;
    let newCol = currentCol;

    switch (directions[currentDirectionIndex]) {
      case "right":
        newCol++;
        if (newCol >= rowLengths[currentRow]) {
          newCol = 0;
          newRow = (currentRow + 1) % keyboards.rows.length;
        }
        break;
      case "down":
        newRow++;
        if (newRow >= keyboards.rows.length) {
          newRow = 0;
        }
        if (newCol >= rowLengths[newRow]) {
          newCol = rowLengths[newRow] - 1;
        }
        break;
      case "left":
        if (newCol > 0) {
          newCol--;
        } else {
          newCol = rowLengths[currentRow] - 1;
        }
        break;
      case "up":
        if (newRow > 0) {
          newRow--;
        } else {
          newRow = keyboards.rows.length - 1;
        }
        if (newCol >= rowLengths[newRow]) {
          newCol = rowLengths[newRow] - 1;
        }
        break;
    }

    currentRow = newRow;
    currentCol = newCol;
    updateMatrix();
  };

  const changeDirection = () => {
    currentDirectionIndex = (currentDirectionIndex + 1) % directions.length;
    updateDirectionDisplay();
  };

  const printCurrentKey = () => {
    const selectedKey = keyboards.rows[currentRow][currentCol];
    const currentInput = inputs[currentInputIndex];

    if (selectedKey === "Backspace") {
      currentInput.value = currentInput.value.slice(0, -1);
    } else if (selectedKey === "Tab") {
      currentInput.value += "\t";
    } else if (selectedKey === "Space") {
      currentInput.value += " ";
    } else if (selectedKey === "Enter") {
      currentInput.value += "\n";
    } else if (selectedKey === "Next") {
      currentInputIndex++;
      if (currentInputIndex >= inputs.length) {
        currentInputIndex = 0;
      }
      inputs[currentInputIndex].focus();
    } else if (selectedKey === "Send") {
      inputs.forEach((input) => (input.value = ""));
      showPopup();
    } else {
      currentInput.value += selectedKey;
    }
  };

  function showPopup() {
    var popups = document.querySelectorAll(".send-message");
    popups.forEach((popup) => {
      popup.style.display = "flex";
      setTimeout(() => {
        popup.style.display = "none";
      }, 2000);
    });
  }

  const toggleCapsLock = () => {
    capsLockActive = !capsLockActive;
    const keys = document.querySelectorAll(".key");
    keys.forEach((key) => {
      key.innerHTML = capsLockActive
        ? key.innerHTML.toUpperCase()
        : key.innerHTML.toLowerCase();
    });
  };

  remoteBtn.addEventListener("mousedown", () => {
    clickCount++;
    isHoldAction = false;

    longPressTimeout = setTimeout(() => {
      isHoldAction = true;
      toggleCapsLock();
    }, LONG_PRESS_DURATION);

    clickTimeout = setTimeout(() => {
      if (clickCount === 1 && !isHoldAction) {
        move();
      } else if (clickCount === 2 && !isHoldAction) {
        printCurrentKey();
      } else if (clickCount === 3 && !isHoldAction) {
        changeDirection();
      }
      clickCount = 0;
    }, TRIPLE_CLICK_TIME);
  });

  remoteBtn.addEventListener("mouseup", () => {
    clearTimeout(longPressTimeout);
  });

  remoteBtn.addEventListener("mouseleave", () => {
    clearTimeout(longPressTimeout);
  });

  createKeyboard(keyboards);
  updateDirectionDisplay();
});
