const {contextBridge, ipcRenderer } = require("electron");

// Connect front to back
contextBridge.exposeInMainWorld("electronAPI", {
    // this ipcR... calls handler in electorn.js
    askLLM: (conversation) => ipcRenderer.invoke("ask-llm", conversation),
    minimise: () => ipcRenderer.send('minimise-window'),
    exit: () => ipcRenderer.send('exit-window'),
});

