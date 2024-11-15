document.addEventListener('DOMContentLoaded', () => {
    function setupTextInput(containerId, messageId, listId) {
      const textInput = document.getElementById(containerId);
      const message = document.getElementById(messageId);
      const paragraphList = document.getElementById(listId);
      const detectedParagraphs = []; // Arreglo para guardar los párrafos
  
      textInput.addEventListener('input', () => {
        const inputValue = textInput.innerText.trim(); // Captura el texto plano y elimina espacios extra
        const paragraphs = inputValue.split(/\n+/); // Divide el texto en párrafos
        detectedParagraphs.length = 0; // Limpia la lista cada vez que se actualiza
  
        // Filtra los párrafos que contienen "'s"
        paragraphs.forEach(paragraph => {
          if (paragraph.includes("'s")) {
            detectedParagraphs.push(paragraph);
          }
        });
  
        // Actualiza el mensaje
        if (detectedParagraphs.length > 0) {
          message.textContent = `Se encontraron ${detectedParagraphs.length} ${detectedParagraphs.length === 1 ? 'párrafo' : 'párrafos'} con "'s".`;
          message.style.color = "green";
        } else {
          message.textContent = "No se encontraron párrafos con 's.";
          message.style.color = "red";
        }
  
        // Actualiza la lista de párrafos
        paragraphList.innerHTML = '';
        detectedParagraphs.forEach(paragraph => {
          const listItem = document.createElement('li');
          listItem.textContent = paragraph;
          paragraphList.appendChild(listItem);
        });
      });
    }
  
    // Configura los dos cuadros de texto independientes
    setupTextInput('textInput1', 'message1', 'paragraphList1');
    setupTextInput('textInput2', 'message2', 'paragraphList2');
  });
  