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
                return player[this.layer].points.add(1).pow(0.97)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        },
        12: {
            title: "Great Discovery",
            description: "Makes DP boost itself.",
            cost: new Decimal(1000000000),
            effect() {
                return player[this.layer].points.add(1).pow(0.03)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }
        }
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(5000).pow(x.add(1)) },
            title: "DP Booster",
            display() { return "Raises point gain to the power of 4." },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },        
            effect() {
                return new Decimal(4).pow(getBuyableAmount(this.layer, this.id))
            },
            effectDisplay() { return format(buyableEffect(this.layer, this.id))+"th power" }
            },            
        }
    }
)
