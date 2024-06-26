let modInfo = {
	name: "The Space Tree",
	id: "myspacetreemod",
	author: "GamerFlo",
	pointsName: "space points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 4,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.4",
	name: "Achieve something!",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.2: Big Bang</h3><br>
		- Added the first two rows (3 Layers).<br>
		- Achievements will be added soon!<br>
	<h3>v0.3: Annhilate</h3><br>
	    - Added a new layer: dark matter.<br>
		- Game ends at 1e70 space points.<br>
	<h3>v0.4: Achieve something!</h3><br>
	    - Added 16 Achievements.<br>
		- No rewards yet!<br>`

let winText = `Congratulations! You have beaten the game that includes everything. For now...`

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

	let gain = new Decimal(1)
	if (hasUpgrade('o', 11)) gain = gain.times(2)
	if (hasUpgrade('o', 12)) gain = gain.times(upgradeEffect('o', 12))
	if (hasUpgrade('o', 21)) gain = gain.times(3)
	if (hasUpgrade('o', 22)) gain = gain.times(upgradeEffect('o', 22))
	if (hasUpgrade('b', 11)) gain = gain.times(4)
	if (hasUpgrade('p', 11)) gain = gain.times(upgradeEffect('p', 11))
	if (hasUpgrade('d', 11)) gain = gain.times(upgradeEffect('d', 11))
	if (hasUpgrade('b', 14)) gain = gain.times(upgradeEffect('b', 14))
	if (hasChallenge('m', 13)) gain = gain.times(20)
	if (hasChallenge('q', 11)) gain = gain.pow(1.12)
	if (hasUpgrade('q', 11)) gain = gain.pow(upgradeEffect('q', 11))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e7000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}