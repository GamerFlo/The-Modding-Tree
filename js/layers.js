addLayer("o", {
    name: "oxygen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4000FF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "oxygen", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('o', 13)) mult = mult.times(upgradeEffect('o', 13))
        if (hasUpgrade('o', 23)) mult = mult.times(upgradeEffect('o', 23))
        if (hasUpgrade('b', 12)) mult = mult.times(upgradeEffect('b', 12))
        if (hasUpgrade('d', 12)) mult = mult.times(upgradeEffect('d', 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (inChallenge('m', 12)) exp = exp.times(0.6)
        if (hasChallenge('m', 12)) exp = exp.times(1.2)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "O: Reset for oxygen", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},

    upgrades: {

    11: {
        title: "Point Boost",
        description: "Double your point gain.",
        cost: new Decimal(1),
        },
    12: {
        title: "Space Fold",
        description: "Multiply point gain based on oxygen.",
        cost: new Decimal(4),
        effect() {
            return player[this.layer].points.add(1).pow(0.5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    13: {
        title: "Oxygen Tanks",
        description: "Multiply oxygen gain based on points.",
        cost: new Decimal(10),
        effect() {
            return player.points.add(1).pow(0.1)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    21: {
        title: "Point Boost II",
        description: "Triple your point gain.",
        cost: new Decimal(10),
        },
    22: {
        title: "Space Fold II",
        description: "Multiply point gain based on oxygen even more.",
        cost: new Decimal(40),
        effect() {
            return player[this.layer].points.add(1).pow(0.4)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    23: {
        title: "Oxygen Tanks",
        description: "Multiply oxygen gain based on points even more.",
        cost: new Decimal(100),
        effect() {
            return player.points.add(1).pow(0.08)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },

    },
})

addLayer("b", {
    name: "booster", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#00FF80",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "boosters", // Name of prestige currency
    baseResource: "oxygen", // Name of resource prestige is based on
    baseAmount() {return player.o.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('b', 13)) mult = mult.times(upgradeEffect('b', 13))
        if (hasUpgrade('d', 21)) mult = mult.times(upgradeEffect('d', 21))
        if (inChallenge('m', 11)) mult = mult.times(0)
        if (hasChallenge('m', 11)) mult = mult.times(6)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(2)
        if (hasChallenge('q', 12)) exp = exp.add(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    branches: ["o"],

    upgrades: {

    11: {
        title: "Timewall?",
        description: "Quadruple your point gain.",
        cost: new Decimal(2),
        },
    12: {
        title: "Up Your Row",
        description: "Slightly multiply oxygen gain based on boosters.",
        cost: new Decimal(4),
        effect() {
            return player[this.layer].points.add(1).pow(0.12)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    13: {
        title: "Self-Synergy",
        description: "Multiply booster gain based on boosters.",
        cost: new Decimal(7),
        effect() {
            return player[this.layer].points.add(1).pow(0.08)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    14: {
        title: "Self-Synergy",
        description: "Multiply point gain based on boosters.",
        cost: new Decimal(7000),
        effect() {
            return player[this.layer].points.add(1).pow(0.11)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },

    },
})

addLayer("p", {
    name: "planet", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FF8000",
    requires: new Decimal(2000), // Can be a function that takes requirement increases into account
    resource: "planets", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 2,
    exponent: 2,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (inChallenge('m', 13)) mult = mult.times(0)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(2)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for planets", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    branches: ["o"],

    upgrades: {

    11: {
        title: "Even more...",
        description: "Multiply your point gain based on planets.",
        cost: new Decimal(2),
        effect() {
            return player[this.layer].points.add(1).pow(2.5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"}
        },
    },

    milestones: {
        0: {
            requirementDescription: "4 planets",
            effectDescription: "+1 Milestone.",
            done() { return player.p.points.gte(4) },
        },
        1: {
            requirementDescription: "9 planets",
            effectDescription: "Unlock the next layer.",
            done() { return player.p.points.gte(9) },
        },

    },
})

addLayer("d", {
    name: "dark matter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#303030",
    requires: new Decimal(8), // Can be a function that takes requirement increases into account
    resource: "dark matter", // Name of prestige currency
    baseResource: "planets", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 2,
    exponent: 1.1,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for dark matter", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    branches: ["p"],

    upgrades: {

    11: {
        title: "Point Annhilation",
        description: "Multiply your point gain based on dark matter.",
        cost: new Decimal(0),
        effect() {
            return player[this.layer].points.add(1).pow(11)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"}
        },
    12: {
        title: "Oxygen Growth",
        description: "Multiply your oxygen gain based on dark matter.",
        cost: new Decimal(1),
        effect() {
            return player[this.layer].points.add(1).pow(2.5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"}
        },
    21: {
        title: "Booster Boost",
        description: "Multiply your booster gain based on dark matter.",
        cost: new Decimal(1),
        effect() {
            return player[this.layer].points.add(1).pow(1.4)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"}
        },
    22: {
        title: "Planetary Plan",
        description: "Multiply your planet gain based on dark matter.",
        cost: new Decimal(2),
        effect() {
            return player[this.layer].points.add(1).pow(1.4)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"}
        },
    },

})

addLayer("a", {
    name: "Achievements",
    symbol: "A",
    startData() { return {
        unlocked: true
    }},
    color: "#FFFF00",
    row: "side",
    layerShown(){return true},

    achievements: {
        11: {
            name: "The Beginning",
            tooltip: "Get 1 Oxygen.",
            done() { return player.o.points.gte(1) },
        },
        12: {
            name: "Point Hoarder",
            tooltip: "Get 40 Points.",
            done() { return player.points.gte(40) },
        },
        13: {
            name: "Oxygen Tank",
            tooltip: "Get 25 Oxygen.",
            done() { return player.o.points.gte(25) },
        },
        14: {
            name: "Some more?",
            tooltip: "Get 1,000 points.",
            done() { return player.points.gte(1000) },
        },
        21: {
            name: "Boost me!",
            tooltip: "Get 1 Booster.",
            done() { return player.b.points.gte(1) },
        },
        22: {
            name: "Planetary",
            tooltip: "Get 1 Planet.",
            done() { return player.p.points.gte(1) },
        },
        23: {
            name: "More of this",
            tooltip: "Get 1 Million Points.",
            done() { return player.points.gte(1e6) },
        },
        24: {
            name: "More of that",
            tooltip: "Get 50,000 Oxygen.",
            done() { return player.o.points.gte(50000) },
        },
        31: {
            name: "Even more Boosters",
            tooltip: "Get 10,000 Boosters.",
            done() { return player.b.points.gte(10000) },
        },
        32: {
            name: "Planetary+",
            tooltip: "Get 6 Planets.",
            done() { return player.p.points.gte(6) },
        },
        33: {
            name: "Let's go!",
            tooltip: "Get 1e10 Points.",
            done() { return player.points.gte(1e10) },
        },
        34: {
            name: "Boosters! BOOSTERS!!!",
            tooltip: "Get 100 Million Boosters.",
            done() { return player.b.points.gte(1e8) },
        },
        41: {
            name: "The Beginning... again?",
            tooltip: "Get 1 Dark Matter.",
            done() { return player.d.points.gte(1) },
        },
        42: {
            name: "ERROR 606: Planet not found",
            tooltip: "Get 12 Planets.",
            done() { return player.p.points.gte(12) },
        },
        43: {
            name: "More!!",
            tooltip: "Get 2 Dark Matter.",
            done() { return player.d.points.gte(2) },
        },
        44: {
            name: "The End. For now!",
            tooltip: "Get 1e70 Points.",
            done() { return player.points.gte(1e70) },
        }
    
    },

})

addLayer("m", {
    name: "matter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#0050FF",
    requires: new Decimal(1e40), // Can be a function that takes requirement increases into account
    resource: "matter", // Name of prestige currency
    baseResource: "boosters", // Name of resource prestige is based on
    baseAmount() {return player.b.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 2,
    exponent: 2,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Reset for matter", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    branches: ["b"],

    challenges: {
        11: {
            name: "Unboosted",
            challengeDescription: "You can not gain boosters.",
            goalDescription: "Reach 1e27 points",
            rewardDescription: "Booster gain x6",
            canComplete: function() {return player.points.gte(1e27)},
        },
        12: {
            name: "OxyLow",
            challengeDescription: "Oxygen gain is raised ^0.6.",
            goalDescription: "Reach 1e19 points",
            rewardDescription: "Oxygen gain ^1.2",
            canComplete: function() {return player.points.gte(1e19)},
        },
        13: {
            name: "Planetary Lock",
            challengeDescription: "You can not gain planets.",
            goalDescription: "Reach 1e41 points",
            rewardDescription: "Point gain x20",
            canComplete: function() {return player.points.gte(1e41)},
        },
    },

})

addLayer("q", {
    name: "quarks", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Q", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FF00A0",
    requires: new Decimal("e1100"), // Can be a function that takes requirement increases into account
    resource: "quarks", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: new Decimal("e400"),
    exponent: 2,
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "q", description: "Q: Reset for quarks", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    branches: ["m", "d"],

    challenges: {
        11: {
            name: "Trap",
            challengeDescription: "You are trapped in all three matter challenges at once.",
            goalDescription: "Reach 1e17 points",
            rewardDescription: "Point gain ^1.12",
            canComplete: function() {return player.points.gte(1e17)},
            countsAs: [('m', 13), ('m', 12), ('m', 11)]
        },
        12: {
            name: "DM me? Nope!",
            challengeDescription: "You can not gain dark matter.",
            goalDescription: "Reach 1e840 points",
            rewardDescription: "Raises the gain exponent of boosters from ^2 to ^3",
            canComplete: function() {return player.points.gte(1e840)},
        },
    },

    upgrades: {
        11: {
            title: "Separation",
            description: "Raise point gain to a power based on quarks.",
            cost: new Decimal(0),
            effect() {
                return player[this.layer].points.times(0.12).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"th power"}
        }
    },

})