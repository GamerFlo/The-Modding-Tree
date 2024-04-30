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
        return new Decimal(1)
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
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(2)
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
        if (hasUpgrade('d', 22)) mult = mult.times(upgradeEffect('d', 22))
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
    color: "#000000",
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
        return new Decimal(2)
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
