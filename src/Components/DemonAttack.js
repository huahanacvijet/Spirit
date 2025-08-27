// Demon Attack Mini Game - Initial Outline


// In Electron.js - new window when demon attack starts (new ipc variable to pass between for electron api - comm between front & back)
// Timer - maybe every hour to 5 hours?? defo not less than an hour, it would be bothersome. I think like 3 times a day would be good
// Will need a state variable in app.js as parent comp which da comp can update so that it can be shared with huanaimation too to stop those cycles
// - for if the game is on
// - then in here, when the game is won or lost, it triggers another animation but either state being true will trigger the game to end (pass to app.js)

// Graphics:
// Hua + demon
// Flute frames for diff levels of attack
// The progress bar (maybe just a css bar as opposed to drawn by me??)

// Two Outcome Screens:
// - Victory
// - Defeat
// Consequence for defeat?? - can't obstruct tasks

// Time-out, if the user doesn't interact with the game within a certain time-frame, have the a pop-up message about somthing the demon did and unlock the task window
// e.g. "the demon stole.../the demon hurt..."

// Is it possible to have hua alone walk from one screen to the next??? if so, would be awesome, if not, no issue can do it retro style cut-frame.