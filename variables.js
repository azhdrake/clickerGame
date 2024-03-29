let instructionButton = document.querySelector("#instruct")
let newGameButton = document.querySelector("#new-game")
let closeButton = document.querySelector("#close")
let dimScreen = document.querySelector("#dim-game")

let energyAmount = document.querySelector("#power-counter")
let foodAmount = document.querySelector("#food-counter")
let buildAmount = document.querySelector("#build-counter")
let livingAmount = document.querySelector("#living-counter")

let airterraformPercent = document.querySelector("#air-terraform-percent")
let soilterraformPercent = document.querySelector("#soil-terraform-percent")
let waterterraformPercent = document.querySelector("#water-terraform-percent")

let sleeperAmountLeftEl = document.querySelector('#sleeper-counter')
let awakeAmountLeftEl = document.querySelector("#awake-counter")
let droneAmounLeftEl = document.querySelector("#drone-counter")

let awakeSettlersAmountEl = document.querySelector("#awake-settlers")
let sleepingSettlersAmountEl = document.querySelector("#sleeping-settlers")
let livingUnitAmountEl = document.querySelector("#living-unit-number")
let multiLivingUnitAmountEl = document.querySelector("#multi-living-unit-number")
let droneAmountEl = document.querySelector("#drone-number")
let solarPanelAmountEl = document.querySelector("#solar-number")
let windTurbineAmountEl = document.querySelector("#wind-turbine-number")
let geothermalAmountEl = document.querySelector("#geothermal-number")
let gardenAmountEl = document.querySelector("#garden-number")
let greenhouseAmountEl = document.querySelector("#greenhouse-number")
let farmAmountEl = document.querySelector("#farm-number")
let mineAmountEl = document.querySelector("#mine-number")
let bigMineAmountEl = document.querySelector("#big-mine-number")
let evenBiggerMineAmountEl = document.querySelector("#biggest-mine-number")
let airTerraformerAmountEl = document.querySelector("#air-terraformers")
let soilTerraformerAmountEl = document.querySelector("#soil-terraformers")
let waterTerraformerAmountEl = document.querySelector("#water-terraformers")

let livingUnitCost = document.querySelector("#living-unit-cost")
let multiLivingUnitCost = document.querySelector("#multi-living-unit-cost")
let droneCost = document.querySelector("#drone-cost")
let solarCost = document.querySelector("#solar-cost")
let windCost = document.querySelector("#wind-turbine-cost")
let geothermalCost = document.querySelector("#geothermal-cost")
let gardenCost = document.querySelector("#garden-cost")
let greenhouseCost = document.querySelector("#greenhouse-cost")
let farmCost = document.querySelector("#farm-cost")
let mineCost = document.querySelector("#mine-cost")
let bigMineCost = document.querySelector("#big-mine-cost")
let biggerMineCost = document.querySelector("#biggest-mine-cost")

let airterraformCost = document.querySelector("#air-terraformer-cost")
let soilterraformCost = document.querySelector("#soil-terraformer-cost")
let waterterraformCost = document.querySelector("#water-terraformer-cost")

let powerClicker = document.querySelector("#power-button")
let farmClicker = document.querySelector("#farming-button")
let mineClicker = document.querySelector("#mine-button")

let wakeSettlerButton = document.querySelector("#wake-settler-button")
let freezeSettlerButton = document.querySelector("#freeze-settler-button")
let buildLivingUnitButton = document.querySelector("#build-living-unit")
let buildMultiLivingUnitButton = document.querySelector("#build-multi-living-unit")
let buildDroneButton = document.querySelector("#build-drone")
let buildSolarButton = document.querySelector("#solar-button")
let buildWindButton = document.querySelector("#build-wind-turbine-button")
let buildGeoButton = document.querySelector("#geothermal-button")
let buildGardenButton = document.querySelector("#build-garden-button")
let buildGreenhouseButton = document.querySelector("#greenhouse-button")
let buildFarmButton = document.querySelector("#farm-button")
let buildMineButton = document.querySelector("#build-mine-button")
let buildBigMineButton = document.querySelector("#big-mine-button")
let buildBiggestMineButton = document.querySelector("#build-biggest-mine-button")

let buildAirTeraButton = document.querySelector("#air-terraformer-button")
let buildSoilTeraButton = document.querySelector("#soil-terraformer-button")
let buildWaterTeraButton = document.querySelector("#water-terraformer-button")

let generatorWorkers = document.querySelector("#generator-number")
let farmerWorkers = document.querySelector("#farmer-number")
let minerWorkers = document.querySelector("#miner-number")
let airTeraWorkers = document.querySelector("#air-terraformer-number")
let soilTeraWorkers = document.querySelector("#soil-terraformer-number")
let waterTeraWorkers = document.querySelector("#water-terraformer-number")

let plusGenerator = document.querySelector("#plus-generator")
let minusGenerator = document.querySelector("#minus-generator")
let plusFarmer = document.querySelector("#plus-farmer")
let minusFarmer = document.querySelector("#minus-farmer")
let plusMiner = document.querySelector("#plus-miner")
let minusMiner = document.querySelector("#minus-miner")

let plusAirTerra = document.querySelector("#plus-terraform-air")
let minusAirTerra = document.querySelector("#minus-terraform-air")
let plusSoilTerra = document.querySelector("#plus-terraform-soil")
let minusSoilTerra = document.querySelector("#minus-terraform-soil")
let plusWaterTerra = document.querySelector("#plus-terraform-water")
let minusWaterTerra = document.querySelector("#minus-terraform-water")

let totalLaborers = document.querySelector("#total-laborers")

let laborerButtons = [{
		type: "energy",
		value: 1,
		butt: plusGenerator
	}, { 
		type: "energy",
		value: -1,
		butt: minusGenerator
	}, {
		type: "mat",
		value: 1,
		butt: plusMiner
	}, {
		type: "mat",
		value: -1,
		butt: minusMiner
	}, {
		type: "food",
		value: 1,
		butt: plusFarmer
	}, {
		type: "food",
		value: -1,
		butt: minusFarmer
	}, {
		type: "airTerra",
		value: 1,
		butt: plusAirTerra
	}, {
		type: "airTerra",
		value: -1,
		butt: minusAirTerra
	}, {
		type: "soilTerra",
		value: 1,
		butt: plusSoilTerra
	}, {
		type: "soilTerra",
		value: -1,
		butt: minusSoilTerra
	}, {
		type: "waterTerra",
		value: 1,
		butt: plusWaterTerra
	}, {
		type: "waterTerra",
		value: -1,
		butt: minusWaterTerra
	}
]

let stats = [{
		name: "currentEnergy",
		type: "energy",
		amount: 0,
		elmnts: energyAmount,
		butt: powerClicker
	}, {
		name: "currentMats",
		type: "mat",
		amount: 0,
		elmnts: buildAmount,
		butt: mineClicker
	}, {
		name: "currentFood",
		type: "food",
		amount: 0,
		elmnts: foodAmount,
		butt: farmClicker
	}, {
		name: "currentLaborers",
		type: "labor",
		amount: 5,
		elmnts: totalLaborers,
		butt: buildDroneButton
	}, {
		name: "terra",
		type: "airTerra",
		amount: 0,
		elmnts: airterraformPercent
	}, {
		name: "terra",
		type: "soilTerra",
		amount: 0,
		elmnts: soilterraformPercent
	}, {
		name: "terra",
		type: "waterTerra",
		amount: 0,
		elmnts: waterterraformPercent
	}]

let resources = [
	{
		name: "sleepingSettlers",
		type: "sleepingLabor",
		amount: 100,
		elmnts: [sleeperAmountLeftEl, sleepingSettlersAmountEl]
	}, {
		name: "awakeSettlers",
		type: "labor",
		amount: 0,
		elmnts: [awakeAmountLeftEl, awakeSettlersAmountEl]
	}, {
		name: "currentGenerators",
		type: "energy",
		amount: 0,
		elmnts: [generatorWorkers]
	}, {
		name: "currentMiners",
		type: "mat",
		amount: 0,
		elmnts: [minerWorkers]
	}, {
		name: "currentFarmers",
		type: "food",
		amount: 0,
		elmnts: [farmerWorkers]
	}, {
		name: "currentAirTerra",
		type: "airTerra",
		amount: 0,
		elmnts: [airTeraWorkers]
	}, {
		name: "currentSoilTerra",
		type: "soilTerra",
		amount: 0,
		elmnts: [soilTeraWorkers]
	}, {
		name: "currentWaterTerra",
		type: "waterTerra",
		amount: 0,
		elmnts: [waterTeraWorkers]
	}
]

let buildables = [{
		type: "livingUnit",
		resourceType: "living",
		amount: 0,
		value: 1,
		currentAmountEl: [livingUnitAmountEl],
		startingEnergyPrice : 50,
		startingMatPrice : 50,
		buildButton: buildLivingUnitButton,
		costEl: livingUnitCost
	}, {
		type: "multiLivingUnit",
		resourceType: "living",
		amount: 0,
		value: 2,
		currentAmountEl: [multiLivingUnitAmountEl],
		startingEnergyPrice: 10000,
		startingMatPrice: 5000,
		buildButton: buildMultiLivingUnitButton,
		costEl: multiLivingUnitCost
	}, {
		type: "drone",
		resourceType: "labor",
		amount: 5,
		currentAmountEl: [droneAmountEl,droneAmounLeftEl],
		startingEnergyPrice: 50,
		startingMatPrice: 100,
		buildButton: buildDroneButton,
		costEl: droneCost
	}, {
		type: "solarPanel",
		resourceType: "energy",
		clickAmount: 1,
		amount: 0,
		currentAmountEl : [solarPanelAmountEl],
		startingEnergyPrice: 50,
		startingMatPrice : 10,
		buildButton: buildSolarButton,
		costEl: solarCost
	}, {
		type: "windTurbine",
		resourceType: "energy",
		clickAmount: 10,
		amount: 0,
		currentAmountEl: [windTurbineAmountEl],
		startingEnergyPrice: 1000,
		startingMatPrice: 500,
		buildButton: buildWindButton,
		costEl: windCost
	}, {
		type: "geothermalPlant",
		resourceType: "energy",
		clickAmount: 100,
		amount: 0,
		currentAmountEl: [geothermalAmountEl],
		startingEnergyPrice : 10000,
		startingMatPrice : 5000,
		buildButton: buildGeoButton,
		costEl: geothermalCost
	}, {
		type: "garden",
		resourceType: "food",
		clickAmount: 1,
		amount: 0,
		currentAmountEl: [gardenAmountEl],
		startingEnergyPrice: 50,
		startingMatPrice: 50,
		buildButton: buildGardenButton,
		costEl: gardenCost
	}, {
		type: "greenhouse",
		resourceType: "food",
		clickAmount: 10,
		amount: 0,
		currentAmountEl : [greenhouseAmountEl],
		startingEnergyPrice : 500,
		startingMatPrice : 500,
		buildButton: buildGreenhouseButton,
		costEl: greenhouseCost
	}, {
		type: "farm",
		resourceType: "food",
		clickAmount: 100,
		amount: 0,
		currentAmountEl : [farmAmountEl],
		startingEnergyPrice : 5000,
		startingMatPrice : 2500,
		buildButton: buildFarmButton,
		costEl: farmCost
	}, {
		type: "mine",
		resourceType: "mat",
		clickAmount: 1,
		amount: 0,
		currentAmountEl: [mineAmountEl],
		startingEnergyPrice: 250,
		startingMatPrice: 100,
		buildButton: buildMineButton,
		costEl: mineCost
	}, {
		type: "biggerMine",
		resourceType: "mat",
		clickAmount: 10,
		amount: 0,
		currentAmountEl: [bigMineAmountEl],
		startingEnergyPrice : 1000,
		startingMatPrice : 500,
		buildButton: buildBigMineButton,
		costEl: bigMineCost
	}, {
		type: "evenBiggerMine",
		resourceType: "mat",
		clickAmount: 100,
		amount: 0,
		currentAmountEl: [evenBiggerMineAmountEl],
		startingEnergyPrice: 10000,
		startingMatPrice: 5000,
		buildButton: buildBiggestMineButton,
		costEl: biggerMineCost
	}, {
		type: "terraformer",
		resourceType: "airTerra",
		clickAmount: .01,
		amount: 0,
		currentAmountEl: [airTerraformerAmountEl],
		startingEnergyPrice : 100000,
		startingMatPrice : 100000,
		buildButton: buildAirTeraButton,
		costEl: airterraformCost
	}, {
		type: "terraformer",
		resourceType: "soilTerra",
		clickAmount: .01,
		amount: 0,
		currentAmountEl: [soilTerraformerAmountEl],
		startingEnergyPrice : 100000,
		startingMatPrice : 100000,
		buildButton: buildSoilTeraButton,
		costEl: soilterraformCost
	}, {
		type: "terraformer",
		resourceType: "waterTerra",
		clickAmount: .01,
		amount: 0,
		currentAmountEl: [waterTerraformerAmountEl],
		startingEnergyPrice : 100000,
		startingMatPrice : 100000,
		buildButton: buildWaterTeraButton,
		costEl: waterterraformCost
	}
]