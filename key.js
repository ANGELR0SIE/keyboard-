



// document.addEventListener('DOMContentLoaded', () => {
//     const keys = document.querySelectorAll('.key');
//     const mouseClick = document.querySelector('.click');
//     const inputs = document.querySelectorAll('.to-input, .subject, .textarea');
//     const changeFieldButton = document.getElementById('changeField');

//     let lastIndex = 0;
//     let intervalId = null;
//     let isCapsLockOn = false;
//     let currentKeyContent = "";
//     let isIterating = false;
//     let currentIndex = 0;
//     let pressTimeout;

//     function displayKeys(key) {
//         const currentFocus = document.activeElement;

//         if (currentFocus && (currentFocus.tagName.toLowerCase() === 'input' || currentFocus.tagName.toLowerCase() === 'textarea')) {
//             if (key === "Backspace") {
//                 currentFocus.value = currentFocus.value.slice(0, -1);
//             }
//             else if (key === " ") {
//                 currentFocus.value += ' ';
//             }
//             else if (key === "CapsLk") {
//                 isCapsLockOn = !isCapsLockOn;
//             }
//             else if (key === "Tab") {
//                 currentFocus.value += '\t';
//             }
//             else if (key === "Enter") {
//                 currentFocus.value += '\n';
//             }
//             else if (key === "Change Field") {
//                 currentIndex++;
//                 if (currentIndex >= inputs.length) {
//                     currentIndex = 0;
//                 }
//                 inputs[currentIndex].focus();
//             }
//             else {
//                 currentFocus.value += isCapsLockOn ? key.toUpperCase() : key.toLowerCase();
//             }
//         }
//     }

//     // function switchField() {
//     //     currentIndex = (currentIndex + 1) % inputs.length;
//     //     inputs[currentIndex].focus();
//     // }

//     function iterateKeys() {
//         if (intervalId) {
//             clearInterval(intervalId);
//         }

//         intervalId = setInterval(() => {
//             const currentKeys = keys;

//             if (lastIndex > 0) {
//                 currentKeys[lastIndex - 1].style.backgroundColor = '';
//             } else if (lastIndex === 0 && currentKeys.length > 0) {
//                 currentKeys[currentKeys.length - 1].style.backgroundColor = '';
//             }

//             const currentKey = currentKeys[lastIndex];
//             currentKey.style.backgroundColor = 'rgba(8, 157, 243, 0.5)';
//             currentKeyContent = currentKey.textContent;

//             lastIndex++;

//             if (lastIndex >= currentKeys.length) {
//                 lastIndex = 0;
//             }
//         }, 1000);

//         isIterating = true;
//     }

//     mouseClick.addEventListener('dblclick', () => {
//         if (!isIterating) {
//             iterateKeys();
//         }
//     });

//     mouseClick.addEventListener('click', () => {
//         if (isIterating) {
//             if (currentKeyContent) {
//                 if (currentKeyContent === "Change Field") {
//                     switchField();
//                 } else {
//                     displayKeys(currentKeyContent);
//                 }

//                 clearInterval(intervalId);
//                 isIterating = false;

//                 setTimeout(() => {
//                     iterateKeys();
//                 }, 2000);
//             }
//         }
//     });

//     mouseClick.addEventListener('mousedown', () => {
//         pressTimeout = setTimeout(() => {
//             lastIndex = 0;
//         }, 1000);
//     });

//     mouseClick.addEventListener('mouseup', () => {
//         clearTimeout(pressTimeout);
//     });
// });



document.addEventListener('DOMContentLoaded', () => {
    const keys = document.querySelectorAll('.key');
    const mouseClick = document.querySelector('.click');
    const inputs = document.querySelectorAll('.to-input, .subject, .textarea');
    let focusedElement = null;
    let lastIndex = 0;
    let intervalId = null;
    let isCapsLockOn = false;
    let currentKeyContent = "";
    let isIterating = false;
    let currentIndex = 0;
    let pressTimeout;

    // Set the focused element when an input or textarea is focused
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            focusedElement = input;
        });
    });

    function displayKeys(key) {
        if (focusedElement) {
            if (key === "Backspace") {
                focusedElement.value = focusedElement.value.slice(0, -1);
            }
            else if (key === " ") {
                focusedElement.value += ' ';
            }
            else if (key === "CapsLk") {
                isCapsLockOn = !isCapsLockOn;
            }
            else if (key === "Tab") {
                focusedElement.value += '\t';
            }
            else if (key === "Enter") {
                focusedElement.value += '\n';
            }
            else if (key === "Change Field") {
                switchField();
            }
            else {
                focusedElement.value += isCapsLockOn ? key.toUpperCase() : key.toLowerCase();
            }
        }
    }

    function switchField() {
        currentIndex++;
        if (currentIndex >= inputs.length) {
            currentIndex = 0;
        }
        inputs[currentIndex].focus();
        focusedElement = inputs[currentIndex];
    }

    function iterateKeys() {
        if (intervalId) {
            clearInterval(intervalId);
        }

        intervalId = setInterval(() => {
            const currentKeys = keys;

            if (lastIndex > 0) {
                currentKeys[lastIndex - 1].style.backgroundColor = '';
            } else if (lastIndex === 0 && currentKeys.length > 0) {
                currentKeys[currentKeys.length - 1].style.backgroundColor = '';
            }

            const currentKey = currentKeys[lastIndex];
            currentKey.style.backgroundColor = 'rgba(8, 157, 243, 0.5)';
            currentKeyContent = currentKey.textContent;

            lastIndex++;

            if (lastIndex >= currentKeys.length) {
                lastIndex = 0;
            }
        }, 1000);

        isIterating = true;
    }

    mouseClick.addEventListener('dblclick', () => {
        if (!isIterating) {
            iterateKeys();
        }
    });

    mouseClick.addEventListener('click', () => {
        if (isIterating) {
            if (currentKeyContent) {
                if (currentKeyContent === "Change Field") {
                    switchField();
                } else {
                    displayKeys(currentKeyContent);
                }

                clearInterval(intervalId);
                isIterating = false;

                setTimeout(() => {
                    iterateKeys();
                }, 2000);
            }
        }
    });

    mouseClick.addEventListener('mousedown', () => {
        pressTimeout = setTimeout(() => {
            lastIndex = 0;
            if (isIterating) {
                clearInterval(intervalId);
                isIterating = false;
            }
        }, 5000);
    });

    mouseClick.addEventListener('mouseup', () => {
        clearTimeout(pressTimeout);
    });
});

