addLayer("w", {
    name: "water", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#0040FF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "water points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('w', 13)) mult = mult.times(upgradeEffect('w', 13))
        if (hasUpgrade('w', 23)) mult = mult.times(upgradeEffect('w', 23))
        if (hasUpgrade('b', 11)) mult = mult.times(upgradeEffect('b', 11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "w", description: "W: Reset for water points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            title: "Small Bubble",
            description: "Generates 1 point/sec.",
            cost: new Decimal(1),
        },
        12: {
            title: "Small Wave",
            description: "Water points boost point gain at a reduced rate.",
            cost: new Decimal(3),
            effect() {
                return player[this.layer].points.add(1).pow(0.4)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        13: {
            title: "Small Fish",
            description: "Points boost water point gain.",
            cost: new Decimal(10),
            effect() {
                return player.points.add(1).pow(0.17)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        21: {
            title: "Big Bubble",
            description: "Making it bigger won't do anything...",
            cost: new Decimal(20),
        },
        22: {
            title: "Big Wave",
            description: "Water points boost point gain even more.",
            cost: new Decimal(35),
            effect() {
                return player[this.layer].points.add(1).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },
        23: {
            title: "Big Fish",
            description: "Points boost water point gain even more.",
            cost: new Decimal(100),
            effect() {
                return player.points.add(1).pow(0.13)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
        },
    },
})
addLayer("b", {
    name: "boosters", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF8000",
    requires: new Decimal(250), // Can be a function that takes requirement increases into account
    resource: "boosters", // Name of prestige currency
    baseResource: "water points", // Name of resource prestige is based on
    baseAmount() {return player.w.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.8, // Prestige currency exponent
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
        {key: "b", description: "B: Reset for boosters", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
            11: {
                title: "Fish Food",
                description: "Makes your fish stronger, increasing water point gain based on boosters.",
                cost: new Decimal(3),
                effect() {
                    return player[this.layer].points.add(1).pow(0.2)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            },
            12: {
                title: "Better Soil",
                description: "Make boosters boost point gain.",
                cost: new Decimal(20),
                effect() {
                    return player[this.layer].points.add(1).pow(0.8)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
            },
    },
})