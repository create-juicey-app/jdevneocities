window.addEventListener('load', function() {
  const container = document.querySelector('.container');
  const title = document.getElementById('title');
  const content = document.querySelector('.content');
  const consoleElement = document.getElementById('console'); // Renamed to avoid conflict
  const targetText = 'Welcome to JoS';
  let currentText = '';

  function updateText() {
    if (currentText.length < targetText.length) {
      currentText += targetText[currentText.length];
      title.textContent = currentText;
      playBipSound();
      setTimeout(updateText, 70); // Slightly slower typing for title
    } else {
      setTimeout(function() {
        title.classList.add('visible'); // Assuming a 'visible' class for title if needed
        setTimeout(function() {
          content.classList.add('visible');
        }, 500); // Content appears sooner
      }, 500); // Title visible sooner
    }
  }

  function typeString(stringArray) {
    let stringIndex = 0;
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (stringIndex < stringArray.length) {
        const currentString = stringArray[stringIndex];
        if (charIndex < currentString.length) {
          consoleElement.textContent += currentString[charIndex];
          playBipSound();
          charIndex++;
          consoleElement.scrollTop = consoleElement.scrollHeight; // Auto-scroll
        } else {
          consoleElement.textContent += '\n';
          stringIndex++;
          charIndex = 0;
        }
      } else {
        clearInterval(typeInterval);
        setTimeout(function() {
          if (consoleElement) {
            consoleElement.style.opacity = '0'; // Fade out console
            setTimeout(() => {
                if (consoleElement) consoleElement.remove(); // Remove after fade
            }, 500);
          }
        }, 500);
      }
    }, 10); // Faster console typing
  }

  function playBipSound() {
    const sound = new Audio('https://files.catbox.moe/0k52m3.wav');
    sound.volume = 0.1; // Increased volume for audible bips
    sound.play().catch(error => {}); // Catch potential play errors
  }

  fetch('string.txt')
    .then(response => response.text())
    .then(data => {
      const stringArray = data.split('\n');
      if (consoleElement) { // Check if console exists
        typeString(stringArray);
      }
    })
    .catch(error => {
        if(consoleElement) consoleElement.textContent = 'Error loading boot sequence: ' + error;
        else console.error('Error loading boot sequence:', error);
    });

  setTimeout(function() {
    container.classList.add('with-border');
    updateText();
    // consoleElement.style.opacity = 0; // Removed: console is handled by typeString
  }, 7000);

  container.addEventListener('click', function(event) {
    event.preventDefault(); // Keep this to prevent unexpected behavior
  });

  // Removed redundant transitionend listener for console opacity
  // container.addEventListener('transitionend', function(event) {
  //   if (event.propertyName === 'border-radius' || event.propertyName === 'margin') {
  //     // console.style.opacity = 0; // Console is already removed or faded out
  //   }
  // });
});
