document.addEventListener('DOMContentLoaded', () => {
    const keys = document.querySelectorAll('.key');
    let currentKeyIndex = 0;
    let clickTimeoutId;
    let holdTimeoutId;
    let isHolding = false;
    let lastClickTime = 0;
    let clickCount = 0;
    let typingInSubject = false; // Set to true or false based on where you want to type

    function updateHighlight() {
        keys.forEach((key) => key.classList.remove('highlight'));
        keys[currentKeyIndex].classList.add('highlight');
        
        const displayArea = document.querySelector('.display-keys');
        if (displayArea) {
            displayArea.value = keys[currentKeyIndex].textContent.trim();
        }
    }

    function moveToNextKey() {
        currentKeyIndex = (currentKeyIndex + 1) % keys.length;
        updateHighlight();
    }

    function printKeyToTextArea() {
        const selectedKey = keys[currentKeyIndex].textContent.trim();
        addToTextArea(selectedKey, typingInSubject ? '.subject' : '.to-mail');
    }

    function addToTextArea(key, selector) {
        const textArea = document.querySelector(selector);
        if (textArea) {
            if (key === 'Backspace') {
                textArea.value = textArea.value.slice(0, -1);
            } else if (key === 'Enter') {
                textArea.value += '\n';
            } else {
                textArea.value += key;
            }
        }
    }

    function handleRemoteClick() {
        if (!isHolding) {
            moveToNextKey();
            clickCount++;
        }
    }

    function handleRemoteDoubleClick() {
        printKeyToTextArea();
        clickCount = 0; // Reset click count after printing
    }

    function handleRemoteHold() {
        isHolding = true;
        clearTimeout(holdTimeoutId);
        holdTimeoutId = setTimeout(() => {
            const userChoice = confirm("Single click to continue the flow.\nDouble-click to continue the flow from the first key.");
            if (userChoice) {
                moveToNextKey();
            } else {
                currentKeyIndex = 0;
                updateHighlight();
            }
            isHolding = false;
        }, 5000);
    }

    const remoteButton = document.querySelector('.remote-btn');

    remoteButton.addEventListener('mousedown', () => {
        clickTimeoutId = setTimeout(() => {
            handleRemoteClick();
        }, 200); // Delay to differentiate between single and double clicks
        holdTimeoutId = setTimeout(handleRemoteHold, 5000); // Start hold timer
    });

    remoteButton.addEventListener('mouseup', () => {
        clearTimeout(clickTimeoutId);
        clearTimeout(holdTimeoutId); // Clear hold timer if mouse is released
        if (Date.now() - lastClickTime < 300) {
            handleRemoteDoubleClick();
        }
        lastClickTime = Date.now();
    });

    updateHighlight();
});
