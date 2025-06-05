window.addEventListener('load', function() {
  const bootButton = document.getElementById('bootButton');
  const container = document.querySelector('.container');
  const title = document.getElementById('title');
  const content = document.querySelector('.content');
  const consoleElement = document.getElementById('console');
  const targetText = 'Welcome to JoS';
  let currentText = '';

  // Initially hide console and main container
  if (consoleElement) {
    consoleElement.style.display = 'none'; // Ensure it's hidden before animation class
  }
  if (container) {
    container.style.display = 'none';
  }
  if (document.body) {
      document.body.style.justifyContent = 'center'; // Center boot button
  }


  function updateText() {
    if (currentText.length < targetText.length) {
      currentText += targetText[currentText.length];
      title.textContent = currentText;
      playBipSound(); // Bip sound for title typing
      setTimeout(updateText, 70);
    } else {
      // Title animation complete
      setTimeout(function() {
        // title.classList.add('visible'); // This class might not be used/needed if opacity is 1
        if (content) content.classList.add('visible');
      }, 500);
    }
  }

  function displayBootLogLineByLine(stringArray) {
    let lineIndex = 0;
    const lineDelay = 30; // Milliseconds between each line

    function displayNextLine() {
      if (lineIndex < stringArray.length) {
        if (consoleElement) {
          consoleElement.textContent += stringArray[lineIndex] + '\n';
          consoleElement.scrollTop = consoleElement.scrollHeight; // Auto-scroll
        }
        lineIndex++;
        setTimeout(displayNextLine, lineDelay);
      } else {
        // Boot log display finished
        setTimeout(showMainContent, 500); // Wait a bit then show main content
      }
    }
    displayNextLine();
  }

  function showMainContent() {
    if (document.body) {
        document.body.style.justifyContent = 'flex-start'; // Align content to top
    }
    if (container) {
      container.style.display = 'flex'; // Or 'block' or its original display type
      // Timeout to allow display property to apply before transition starts
      setTimeout(() => {
        container.classList.add('with-border'); // This class should trigger opacity transition
        updateText(); // Start title animation
      }, 50);
    }
    // Console remains visible as a boot log
  }

  function playBipSound() {
    const sound = new Audio('https://files.catbox.moe/0k52m3.wav');
    sound.volume = 0.05; // Reduced volume for title bips
    sound.play().catch(error => {});
  }

  if (bootButton) {
    bootButton.addEventListener('click', function() {
      bootButton.style.display = 'none'; // Hide button

      if (consoleElement) {
        consoleElement.style.display = 'block'; // Make it part of layout for animation
        // Force a reflow before adding the class to ensure transition plays
        void consoleElement.offsetWidth; 
        consoleElement.classList.add('active');

        // Wait for console animation to finish (1s) + 2 additional seconds before fetching and displaying log
        setTimeout(() => {
          fetch('string.txt')
            .then(response => response.text())
            .then(data => {
              const stringArray = data.split('\n');
              displayBootLogLineByLine(stringArray);
            })
            .catch(error => {
              if (consoleElement) consoleElement.textContent = 'Error loading boot sequence: ' + error;
              else console.error('Error loading boot sequence:', error);
              // Still proceed to show main content even if boot log fails
              setTimeout(showMainContent, 500);
            });
        }, 3000); // 1000ms (console animation) + 2000ms (additional delay) = 3000ms total
      } else {
        // If no console, proceed to show main content directly
        showMainContent();
      }
    });
  }

  // Removed old setTimeout for container.classList.add('with-border') and updateText()
  // Removed old direct fetch and typeString call on load

  if (container) { // This event listener might still be useful if container has other transitions
    container.addEventListener('click', function(event) {
      event.preventDefault(); 
    });
  }
});
