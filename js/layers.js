addLayer("m", {
    name: "matter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFFFFF",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "matter", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(0.1)
        if (hasUpgrade('d', 14)) mult = mult.times(upgradeEffect('d', 14))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "m", description: "M: Gain matter", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    buyables: {
        11: {
            cost() { return new Decimal(1) },
            title: "First Dimension",
            display() { return "Produces 1 point per second.<br>Cost: 1 matter." },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player[this.layer].points))
                player[this.layer].points = player[this.layer].points.sub(player[this.layer].points)
            },
            effect() {
                return getBuyableAmount(this.layer, this.id)
            },
            effectDisplay() { return format(buyableEffect(this.layer, this.id))+"/s" }
            },
        12: {
            cost() { return new Decimal("e9") },
            title: "Second Dimension",
            display() { return "Produces 1e9 first dimensions per second.<br>Cost: 1e9 matter." },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player[this.layer].points.div(new Decimal("e9"))))
                player[this.layer].points = player[this.layer].points.sub(player[this.layer].points)
            },
            effect() {
                return getBuyableAmount(this.layer, this.id).times(new Decimal("e9"))
            },
            effectDisplay() { return format(buyableEffect(this.layer, this.id))+"/s" }
            },
        13: {
            cost() { return new Decimal("ee10") },
            title: "Third Dimension",
            display() { return "Produces ee10 second dimensions per second.<br>Cost: ee10 matter." },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player[this.layer].points.div(new Decimal("ee10"))))
                layer[this.layer].points = player[this.layer].points.sub(player[this.layer].points)
            },
            effect() {
                return getBuyableAmount(this.layer, this.id).times(new Decimal("ee10"))
            },
            effectDisplay() { return format(buyableEffect(this.layer, this.id))+"/s" }
            },
        },
        automate() {
            addBuyables('m', 11, buyableEffect('m', 12))
            addBuyables('m', 12, buyableEffect('m', 13))
            if (hasUpgrade('d', 15)) {
                setBuyableAmount('m', 11, getBuyableAmount('m', 11).add(player[this.layer].points.div(3)))
                player[this.layer].points = player[this.layer].points.sub(player[this.layer].points.div(3))
                setBuyableAmount('m', 12, getBuyableAmount('m', 12).add(player[this.layer].points.div(new Decimal("2e9"))))
                player[this.layer].points = player[this.layer].points.sub(player[this.layer].points.div(2))
                setBuyableAmount('m', 13, getBuyableAmount('m', 13).add(player[this.layer].points.div(new Decimal("ee10"))))
                layer[this.layer].points = player[this.layer].points.sub(player[this.layer].points)
            }
        },
        upgrades: {
            11: {
            title: "Advanced Science",
            description: "Squares the boost from the first DP upgrade.",
            cost: new Decimal("e19"),
            effect() {
                return player.d.points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
            },
            12: {
            title: "Ultimate Science",
            description: "Cubes the boost from the first DP upgrade.",
            cost: new Decimal("ee11"),
            effect() {
                return player.d.points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
            },
        },
        passiveGeneration() {
            if (hasUpgrade('d', 14)) return 1
        }
    }
),
addLayer("d", {
    name: "discovery", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#30FF70",
    requires: new Decimal("e3"), // Can be a function that takes requirement increases into account
    resource: "discovery points", // Name of prestige currency
    baseResource: "matter", // Name of resource prestige is based on
    baseAmount() {return player.m.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 10,
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('d', 12)) mult = mult.times(upgradeEffect('d', 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)

        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Gain discovery points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    canBuyMax(){return true},
    upgrades: {
        11: {
            title: "Science",
            description: "Makes DP boost point gain with a small reduction.",
            cost: new Decimal(0),
            effect() {
                return player[this.layer].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        12: {
            title: "Great Discovery",
            description: "Makes DP boost itself.",
            cost: new Decimal(1000000000),
            effect() {
                return player[this.layer].points.add(1).pow(0.06)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        13: {
            title: "The Lab",
            description: "Multiply antimatter gain based on DP.",
            cost: new Decimal("e100"),
            effect() {
                return player[this.layer].points.add(1).pow(0.005)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        14: {
            title: "The Automaton",
            description: "Automatically gain matter and multiply its gain based on DP.",
            cost: new Decimal("e200"),
            effect() {
                return player[this.layer].points.add(1).pow(0.005)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        15: {
            title: "Dimensional Discovery",
            description: "Automatically buy dimensions.",
            cost: new Decimal("e4"),
        },
        21: {
            title: "String Theory",
            description: "Automatically buy antimatter dimensions.",
            cost: new Decimal("e3080"),
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(20).pow(x).times(5000) },
            title: "DP Booster",
            display() { return "Raises the discovery point income boost to the power of 4." },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },        
            effect() {
                return new Decimal(player[this.layer].points).pow(new Decimal(4).pow(getBuyableAmount(this.layer, this.id)).sub(1))
            },
            effectDisplay() { return format(buyableEffect(this.layer, this.id))+"x" }
            },            
        }
    }
)
addLayer("a", {
    name: "antimatter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF0050",
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "antimatter", // Name of prestige currency
    baseResource: "discovery points", // Name of resource prestige is based on
    baseAmount() {return player.d.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 1.1,
    exponent: 1.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)

        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        if (hasUpgrade('a', 11)) exp = exp.add(upgradeEffect('a', 11))
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "a", description: "A: Gain antimatter (resets nothing)", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    buyables: {
        11: {
            cost() { return new Decimal(1) },
            title: "First Dimension",
            display() { return "Produces 0.1 antimatter per second.<br>Cost: 1 antimatter." },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player[this.layer].points))
                player[this.layer].points = player[this.layer].points.sub(player[this.layer].points)
            },
            effect() {
                return getBuyableAmount(this.layer, this.id).div(10)
            },
            effectDisplay() { return format(buyableEffect(this.layer, this.id))+"/s" }
            },
        12: {
            cost() { return new Decimal("e9") },
            title: "Second Dimension",
            display() { return "Produces 1e8 first dimensions per second.<br>Cost: 1e9 antimatter." },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player[this.layer].points.div(new Decimal("e9"))))
                player[this.layer].points = player[this.layer].points.sub(player[this.layer].points)
            },
            effect() {
                return getBuyableAmount(this.layer, this.id).times(new Decimal("e8"))
            },
            effectDisplay() { return format(buyableEffect(this.layer, this.id))+"/s" }
            },
        13: {
            cost() { return new Decimal("ee10") },
            title: "Third Dimension",
            display() { return "Produces ee10/10 second dimensions per second.<br>Cost: ee10 antimatter." },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player[this.layer].points.div(new Decimal("ee10"))))
                layer[this.layer].points = player[this.layer].points.sub(player[this.layer].points)
            },
            effect() {
                return getBuyableAmount(this.layer, this.id).times(new Decimal("ee10".div(10)))
            },
            effectDisplay() { return format(buyableEffect(this.layer, this.id))+"/s" }
            },
        },
        automate() {
            addBuyables('a', 11, buyableEffect('a', 12))
            addBuyables('a', 12, buyableEffect('a', 13))
            if (hasUpgrade('d', 21)) {
                setBuyableAmount('a', 11, getBuyableAmount('a', 11).add(player[this.layer].points.div(30)))
                player[this.layer].points = player[this.layer].points.sub(player[this.layer].points.div(3))
                setBuyableAmount('a', 12, getBuyableAmount('a', 12).add(player[this.layer].points.div(new Decimal("2e8"))))
                player[this.layer].points = player[this.layer].points.sub(player[this.layer].points.div(2))
                setBuyableAmount('a', 13, getBuyableAmount('a', 13).add(player[this.layer].points.div(new Decimal("ee10"))))
                layer[this.layer].points = player[this.layer].points.sub(player[this.layer].points)
            }
        },
        upgrades: {
            11: {
            title: "Antimatter Generator",
            description: "Gain ^1.12 more antimatter.",
            cost: new Decimal("e7"),
            effect() {
                return 0.12
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"th power" }
            },
            12: {
            title: "Anti-Science",
            description: "Increase DP gain based on antimatter.",
            cost: new Decimal(1),
            effect() {
                return new Decimal(1).add(new Decimal(1).add(player[this.layer].points)).pow(0.3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
            },
        },
    }
)