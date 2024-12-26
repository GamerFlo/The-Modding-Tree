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
            display() { return "Produces 1 point per second." },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player[this.layer].points))
                player[this.layer].points = player[this.layer].points.sub(player[this.layer].points)
            },
            effect() {
                return getBuyableAmount(this.layer, this.id)
            },
            effectDisplay() { return format(buyableEffect(this.layer, this.id))+"/s" }
            }
        12: {
            cost() { return new Decimal("e10") },
            title: "Second Dimension",
            display() { return "Increases the muliplier to first dimensions by 1 per second." },
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(player[this.layer].points.div("e10")))
                player[this.layer].points = player[this.layer].points.sub(player[this.layer].points)
            },
            effect() {
                return getBuyableAmount(this.layer, this.id)
            },
            effectDisplay() { return format(buyableEffect(this.layer, this.id))+"/s" }
            }
        }
    }
)
