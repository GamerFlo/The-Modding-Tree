let modInfo = {
	name: "The Unscaled Tree",
	id: "myunscaledtreemod",
	author: "GamerFlo",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 2,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "No Cost Scaling",
}

let changelog = `<h1>Changelog:</h1><br>`


let winText = `Congratulations! You have beaten the game. For now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(0)
	gain = gain.add(buyableEffect('m', 11))
	if (hasUpgrade('d', 11)) gain = gain.times(upgradeEffect('d', 11))
	gain = gain.times(buyableEffect('d', 11))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends". Default is e1,000,000,000
function isEndgame() {
	return player.points.gte(new Decimal("eeee10"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(15) // Default is 15 seconds which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}