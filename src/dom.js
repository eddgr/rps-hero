// DOM
const gameContainer = grab('#game-container')
const start = grab('#start')
const user1 = grab('#user-1')
const user2 = grab('#user-2')
const commands = grab('#commands')
const output = grab('#temp-output')
const insideOutput = output.firstElementChild
const player1Health = grab('#player1-health-bar')
const player2Health = grab('#player2-health-bar')
const player1Buff = grab('#player1-buff')
const player2Buff = grab('#player2-buff')
const userAttkIcon = grab('#usr-attk-icon')
const compAttkIcon = grab('#comp-attk-icon')
const attackIconImage = grab('#attk-icon > img')
const player1WinHP = grab('#player1-winHP')
const player2WinHP = grab('#player2-winHP')
const player1Name = grab('#player1-name')
const player2Name = grab('#player2-name')
const user1Sprite = grab('#user-1-sprite')
const comp1Sprite = grab ('#comp-1-sprite')
const winLossIcon = grab('#winLoss')
// winLossIcon.innerText = "test Trophy placement"
const welcomeScreen = grab('#welcome-screen')
const player1Level = grab('#player1-level')
const infoBar = grab('#information')
const API_URL = "https://rps-hero-backend.herokuapp.com/api/v1/users"
// end DOM
