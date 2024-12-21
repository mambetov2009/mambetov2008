const textToType = "CocoCola is a refreshing beverage that quenches your thirst and tantalizes your taste buds.Our secret blend of flavors.";
const typingTextElement = document.querySelector(".typing-text");

let index = 0;

function typeText() {
  if (index < textToType.length) {
    typingTextElement.textContent += textToType.charAt(index);
    index++;
    setTimeout(typeText, 100); // Adjust speed by changing the delay
  }
}

typeText();

 
            