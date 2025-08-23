const {contextBridge, ipcRenderer } = require("electron");

// API for front end (bridge)
contextBridge.exposeInMainWorld("electronAPI", {
    // this ipcR... calls handler in electorn.js
    askLLM: (conversation) => ipcRenderer.invoke("ask-llm", conversation)
});

