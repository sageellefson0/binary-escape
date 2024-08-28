const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");


let userText = null;

// This creates a new div, adds the chat to the specified class and set the content of html to div
const createElement = (html, className) => {
     const chatDiv = document.createElement("div");
     chatDiv.classList.add("chat", className);
     chatDiv.innerHTML = html;
     return chatDiv;
}

// This gets chatInput value that then creates an output chat div with the user's message
const handleSendingChat = () => {
     userText = chatInput.value.trim(); //t rim removes any extra spaces
     const html = `<div class="chat-content">
                    <div class="chat-details">
                         <img src="" alt="char-box-img">
                         <p>${userText}/p>
                    </div>
               </div>`;
     // appends message to chat container
     const outputChatDiv = createElement(html, "output");
     chatContainer.appendChild(outputChatDiv); 
}

sendButton.addEventListener("click", handleSendingChat);


