chrome.action.onClicked.addListener((tab) => {
    console.log("Extension icon clicked. Attempting to inject script...");
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: injectButtonWithStrings,
    });
  });
  
  function injectButtonWithStrings() {
    console.log("Script injected. Fetching strings from JSON...");
  
    fetch(chrome.runtime.getURL('data.json'))
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        console.log("Strings loaded:", data.strings);
        const strings = data.strings;
        let currentIndex = 0;
  
        const buttonForward = document.createElement("button");
        buttonForward.innerText = "Next";
        buttonForward.style.position = "fixed";
        buttonForward.style.top = "10px";
        buttonForward.style.right = "10px";
        buttonForward.style.zIndex = "1000";
        console.log("Forward button created");
  
        const buttonBackward = document.createElement("button");
        buttonBackward.innerText = "Previous";
        buttonBackward.style.position = "fixed";
        buttonBackward.style.top = "50px";
        buttonBackward.style.right = "10px";
        buttonBackward.style.zIndex = "1000";
        console.log("Backward button created");
  
        function insertString() {
          console.log("Attempting to insert string:", strings[currentIndex]);
          const inputField = document.querySelector('input.wbloks_1.wbloks_52');
          if (inputField) {
            inputField.value = strings[currentIndex];
            console.log("String inserted:", strings[currentIndex]);

            // Create and dispatch an 'input' event to simulate user typing
          const inputEvent = new Event('input', { bubbles: true });
          inputField.dispatchEvent(inputEvent);

          // Simulate pressing the "Enter" key
          const enterEvent = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            key: 'Enter',
            code: 'Enter',
            keyCode: 13
          });
          inputField.dispatchEvent(enterEvent);
          } else {
            console.error("Input field not found!");
          }
        }
  
        buttonForward.addEventListener("click", () => {
          currentIndex = (currentIndex + 1) % strings.length;
          insertString();
        });
  
        buttonBackward.addEventListener("click", () => {
          currentIndex = (currentIndex - 1 + strings.length) % strings.length;
          insertString();
        });
  
        document.body.appendChild(buttonBackward);
        document.body.appendChild(buttonForward);
        console.log("Buttons injected into the page.");
      })
      .catch(error => console.error('Error loading strings:', error));
  }
  