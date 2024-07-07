addLayer("i", {
    name: "tier 1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "I", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4000FF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "tier 1 points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasChallenge('i', 13)) mult = mult.times(challengeEffect('i', 13))
        if (inChallenge('ii', 11)) mult = 1
        if (inChallenge('ii', 12)) mult = 1
        if (hasChallenge('ii', 11)) mult = mult.times(10)
        if (hasChallenge('ii', 13)) mult = mult.times(challengeEffect('ii', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (inChallenge('ii', 13)) exp = exp.times(0.5)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "1", description: "1: Reset for tier 1 points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    challenges: {
        11: {
            name:"The first one's always free",
            challengeDescription: "Just read the title.",
            goalDescription: "Free!",
            rewardDescription: "Start generating points.",
            canComplete: function() {return player.points.gte(0)},
        },
        12: {
            name:"Just wait",
            challengeDescription: "No nerfs, just wait for the points!",
            goalDescription: "Reach 20 points.",
            rewardDescription: "Multiply point gain based on tier 1 points.",
            canComplete: function() {return player.points.gte(20)},
            rewardEffect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            rewardDisplay() { return format(challengeEffect(this.layer, this.id))+"x" },
        },
        13: {
            name:"This actually gets challenging now",
            challengeDescription: "Production is square rooted in this challenge.",
            goalDescription: "Reach 100 points.",
            rewardDescription: "Multiply tier 1 point gain based on points.",
            canComplete: function() {return player.points.gte(100)},
            rewardEffect() {
                return player.points.add(1).pow(0.15)
            },
            rewardDisplay() { return format(challengeEffect(this.layer, this.id))+"x" },
        },
    }
})

addLayer("ii", {
    name: "tier 2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "II", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#40FF70",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "tier 2 points", // Name of prestige currency
    baseResource: "tier 1 points", // Name of resource prestige is based on
    baseAmount() {return player.i.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.75, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "2", description: "2: Reset for tier 2 points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    challenges: {
        11: {
            name:"The first exercise",
            challengeDescription: "The reward of 'This actually gets challenging now' is disabled.",
            goalDescription: "Reach 100 tier 1 points.",
            rewardDescription: "Tier 1 point production x10.",
            canComplete: function() {return player.i.points.gte(100)},
        },
        12: {
            name:"The second exercise",
            challengeDescription: "You are stuck in C2-1 and C1-3.",
            goalDescription: "Reach 200 points.",
            rewardDescription: "Square your production.",
            canComplete: function() {return player.points.gte(200)},
        },
        13: {
            name:"Millionaire",
            challengeDescription: "Tier 1 points are square rooted.",
            goalDescription: "Reach 100,000 points.",
            rewardDescription: "Multiply tier 1 point gain based on tier 2 points.",
            canComplete: function() {return player.points.gte(100000)},
            rewardEffect() {
                return player.ii.points.add(1).pow(0.6)
            },
            rewardDisplay() { return format(challengeEffect(this.layer, this.id))+"x" },
        },
    }
})