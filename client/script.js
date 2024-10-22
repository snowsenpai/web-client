// HTTP Requests
const urlInput = document.getElementById('url-input');
const methodSelect = document.getElementById('method-select');
const requestBody = document.getElementById('request-body');
const sendRequestBtn = document.getElementById('send-request');
const responseOutput = document.getElementById('response-output');

sendRequestBtn.addEventListener('click', async () => {
    const url = urlInput.value;
    const method = methodSelect.value;
    const body = requestBody.value;

    try {
        const response = await fetch(url, {
            method: method,
            body: ['POST', 'PUT'].includes(method) ? body : undefined,
            credentials: 'include', // This will send cookies
        });

        const responseData = await response.text();
        responseOutput.innerHTML = `Status: ${response.status}<br>Response:<br>${responseData}`;
    } catch (error) {
        responseOutput.innerHTML = `Error: ${error.message}`;
    }
});

// WebSocket
let socket;
const wsUrlInput = document.getElementById('ws-url-input');
const wsConnectBtn = document.getElementById('ws-connect');
const wsDisconnectBtn = document.getElementById('ws-disconnect');
const wsMessageInput = document.getElementById('ws-message-input');
const wsSendBtn = document.getElementById('ws-send');
const wsOutput = document.getElementById('ws-output');

wsConnectBtn.addEventListener('click', () => {
    const url = wsUrlInput.value;
    socket = new WebSocket(url);

    socket.onopen = () => {
        wsOutput.innerHTML += 'Connected to WebSocket<br>';
        wsConnectBtn.disabled = true;
        wsDisconnectBtn.disabled = false;
        wsSendBtn.disabled = false;
    };

    socket.onmessage = (event) => {
        wsOutput.innerHTML += `Received: ${event.data}<br>`;
    };

    socket.onclose = () => {
        wsOutput.innerHTML += 'Disconnected from WebSocket<br>';
        wsConnectBtn.disabled = false;
        wsDisconnectBtn.disabled = true;
        wsSendBtn.disabled = true;
    };
});

wsDisconnectBtn.addEventListener('click', () => {
    if (socket) {
        socket.close();
    }
});

wsSendBtn.addEventListener('click', () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const message = wsMessageInput.value;
        socket.send(message);
        wsOutput.innerHTML += `Sent: ${message}<br>`;
        wsMessageInput.value = '';
    }
});

// Cookies
const cookieDisplay = document.getElementById('cookie-display');

function updateCookieDisplay() {
    cookieDisplay.innerHTML = `Current cookies: ${document.cookie}`;
}

// Update cookie display every 5 seconds
setInterval(updateCookieDisplay, 5000);
updateCookieDisplay(); // Initial display
