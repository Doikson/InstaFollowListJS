document.addEventListener("DOMContentLoaded", () => {
  const sharedSearchInput = document.getElementById("sharedSearchText");
  const coincidencesList = document.getElementById("coincidencesList");
  const addParagraphsButton = document.getElementById("addParagraphsButton");

  // Lists of detected paragraphs
  const paragraphsList1 = [];
  const paragraphsList2 = [];

  // Setup for the first box
  setupTextInput("textInput1", "message1", paragraphsList1);

  // Setup for the second box
  setupTextInput("textInput2", "message2", paragraphsList2);

  // Generic setup to detect and store paragraphs
  function setupTextInput(textInputId, messageId, detectedParagraphs) {
    const textInput = document.getElementById(textInputId);
    const message = document.getElementById(messageId);

    // Updates paragraph detection
    function updateDetection() {
      const searchText = sharedSearchInput.value.trim();
      const inputValue = textInput.innerText.trim();
      const paragraphs = inputValue.split(/\n+/);

      detectedParagraphs.length = 0; // Clears the previous list

      if (searchText === "") {
        message.textContent = "Please enter text to search for.";
        message.style.color = "red";
        return;
      }

      paragraphs.forEach((paragraph) => {
        if (paragraph.includes(searchText)) {
          detectedParagraphs.push(paragraph);
        }
      });

      // Updates the message
      message.textContent = `Detected ${detectedParagraphs.length} ${
        detectedParagraphs.length === 1 ? "paragraph" : "paragraphs"
      }.`;
      message.style.color = detectedParagraphs.length > 0 ? "green" : "red";
    }

    // Detects changes in the editable content
    textInput.addEventListener("input", updateDetection);

    // Detects changes in the shared search text
    sharedSearchInput.addEventListener("input", updateDetection);

    // Restrict pasting to plain text
    textInput.addEventListener("paste", (event) => {
      event.preventDefault();
      const pastedText = (event.clipboardData || window.clipboardData).getData(
        "text"
      );
      document.execCommand("insertText", false, pastedText);
    });
  }

  // Function to add paragraphs and compare
  addParagraphsButton.addEventListener("click", () => {
    // Checks if there are paragraphs in the boxes
    if (paragraphsList1.length === 0 || paragraphsList2.length === 0) {
      alert("Make sure both boxes contain text.");
      return;
    }

    // Clears the previous list of matches
    coincidencesList.innerHTML = "";

    // Compare all paragraphs from box 1 with all paragraphs from box 2
    paragraphsList1.forEach((paragraph1) => {
      if (!paragraphsList2.includes(paragraph1)) {
        const listItem = document.createElement("li");
        listItem.textContent = `No match: ${paragraph1}`;
        coincidencesList.appendChild(listItem);
      }
    });

    // If no matches are found, show a message
    if (coincidencesList.children.length === 0) {
      const listItem = document.createElement("li");
      listItem.textContent = "No matches were found between the boxes.";
      coincidencesList.appendChild(listItem);
    }
  });
});
