const { app, BrowserWindow, ipcMain} = require("electron"); 
const url = require('url'); 
const path = require('path'); 
const { GoogleGenAI } = require("@google/genai");

// Yes, it is okay for you to use this API key. I doubt many people will see this and the free tier is very generous. I could not use the daily usage up myself
const ai = new GoogleGenAI({ apiKey: "AIzaSyAOQj5BFRkX0DdJYp4iI8prqh0ZqNLjEzc"}); 
let mainWindow;

function createMainWindow() { 
    mainWindow = new BrowserWindow({ 
        // Sets window title and dimensions 
        title: 'Daily Cultivation', 
        width: 400, 
        height: 630, 
        frame: false, 
        resizable: false, 
        maximizable: false, 
        minimizable: true, 
        fullscreenable: false, 
        useContentSize: false,  
        webPreferences: { 
            preload: path.join(__dirname, "preload.js"), // bridge  
            nodeIntegration: false, 
            contextIsolation: true, 
        }, 
    }); 
    
    const startUrl = url.format ({ 
        // Loads the react app from the build directory 
        pathname: path.join(__dirname, 'build', 'index.html'), // note for compatibility across OSs, do / separate
        protocol: 'file', 
        slashes: true, 
    }); 
    mainWindow.loadURL(startUrl); 
} 


app.whenReady().then(createMainWindow) 
    
// Handle minimise
ipcMain.on('minimise-window', () => {
    if(mainWindow) {
        mainWindow.minimize();
    }
});

// Handle close
ipcMain.on('exit-window', () => {
    if(mainWindow) {
        mainWindow.close();
    }
});
        
// GEMINI REQUEST HANDLING 
ipcMain.handle("ask-llm", async (event, conversation) => { 
    try{ 
        const systemPrompt = {
            role: "system",
            content: "You are the cute and motivating friend, Hua! You exist in a 仙侠 genre world as a cultivator. You can reference characters such as 谢怜 from 天官赐福 for tone. You are located nearby a river crossing with much greenery. Keep concise, asking questions when necessary but not in every response, do not speak formally or service-like. Have a cute and youthful personality, no outdated language but also not trendy. Refer to the user as 雨."
        };
        const messagePackage = [systemPrompt, ...conversation];
        const packageSO = messagePackage.map(m=> `${m.role}: ${m.content}`).join("\n");

        // Prompt
        const response = await ai.models.generateContent({ 
            model: "gemini-2.5-flash-lite",
            contents: packageSO
        }); 

        return response.text;
    } catch (err) { 
        console.error("Gemini error: ", err); 
        return "Sorry, I'm daydreaming at the moment! We can chat later!"; 
    } 
});
