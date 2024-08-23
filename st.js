document.addEventListener("DOMContentLoaded", function () {
    const keyboards = {
        rows: [
            ["Send","a", "e", "i", "o", "u", "n", "t", "s", "r", "l", "1", "2", "3"],
            ["c", "d", "h", "m", "p", "b", "g", "y", "f", "w", "4", "5", "6"],
            ["v", "k", "x", "j", "q", "z", ".", "@", "_", "-", "7", "8", "9"],
            ["Backspace", "Tab", "Enter", "0", ",", "'", "Ctrl"],
            ["Space", "Alt", "Send", "Next"]
        ],
    };

    let capsLockActive = false;
    let clickCount = 0;
    let clickTimeout;

    const keyboard = document.querySelector('.keyboard');
    const remoteBtn = document.querySelector('.remote-btn');

    const createKeyboard = (keyboardLayout) => {
        keyboardLayout.rows.forEach(rowItems => {
            const row = document.createElement('div');
            row.className = 'row';
            rowItems.forEach(item => {
                const key = document.createElement('button');
                key.innerHTML = item;
                key.className = 'key';

                // Special key handling
                if (item === "Backspace") key.id = 'backspace';
                if (item === "Enter") key.id = 'enter';
                if (item === "Space") key.id = 'space';

                row.append(key);
            });
            keyboard.append(row);
        });
    };

    const updateCapsLockState = () => {
        const keys = document.querySelectorAll('.key');
        keys.forEach(key => {
            if (capsLockActive) {
                key.classList.add('caps-active');
                key.innerHTML = key.innerHTML.toUpperCase();
            } else {
                key.classList.remove('caps-active');
                key.innerHTML = key.innerHTML.toLowerCase();
            }
        });
    };

    // Triple-click event on .remote-btn to toggle Caps Lock
    remoteBtn.addEventListener('click', () => {
        clickCount++;
        clearTimeout(clickTimeout);
        clickTimeout = setTimeout(() => {
            clickCount = 0;
        }, 400);

        if (clickCount === 3) {
            capsLockActive = !capsLockActive;
            updateCapsLockState();
            clickCount = 0;
        }
    });

    createKeyboard(keyboards);
});
