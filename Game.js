checkPrices()
setBuyButtons()
setLaborButtons()
updateAmounts()
setStatButtons()
gameTick = setInterval(gameClock, 1000)



function gameClock(){
	console.log("test")
	autoclick()
	foodTime()
	checkForPlayerWin()
}

function autoclick(){
	let clicks = 0
	buildables.forEach(function(structure){
		resources.forEach(function(resource){
			if(structure["resourceType"] == resource["type"]){
				clicks = structure["clickAmount"] * structure["amount"] * resource["amount"]
				if(clicks > 0){
					click(structure["resourceType"], clicks)
				}
			}
		})
	})
}

function foodTime(){
	stats.forEach(function(stat){
		if(stat["type"] == "food"){
			resources.forEach(function(resource){
				if(resource["name"] == "awakeSettlers"){
					potentialFood = stat["amount"] - resource["amount"]
					if(potentialFood >= 0){
						stat["amount"] -= resource["amount"]
					} else {
						stat["amount"] = 0
						resource["amount"] --
						click("labor",-1)
					}
					updateAmounts()
					
				}
			})
		}
	})
}

function setBuyButtons(){
	buildables.forEach(function(structure){
		structure["buildButton"].addEventListener("click", function(){
			let currentEnergyPrice = findPrice(structure["startingEnergyPrice"],structure["amount"])
			let currentMatPrice = findPrice(structure["startingMatPrice"],structure["amount"])
			stats.forEach(function(stat){
				if(stat["name"] == "currentEnergy"){
					stat["amount"] -= currentEnergyPrice
				} else if (stat["name"] == "currentMats"){
					stat["amount"] -= currentMatPrice
				}
			})
			checkPrices()
			structure["amount"] ++
			updateAmounts()
		})
	})
}

function setLaborButtons(){
	laborerButtons.forEach(function(butt){
		butt["butt"].addEventListener("click",function(){
			stats.forEach(function(stat){
				if(stat["name"] == "currentLaborers"){	
					if(stat["amount"] > 0 || butt["value"] < 0){
						resources.forEach(function(resource){
							if (butt["type"] == resource["type"] && (resource["amount"] > 0 || butt["value"] > 0)){
								stat["amount"] -= butt["value"]
								resource["amount"] += butt["value"]
								
							}
						})
					}
				}
			})
			updateAmounts()
		})
	})
}

function setStatButtons(){
	stats.forEach(function(stat){
		if(stat["butt"]){
			stat["butt"].addEventListener("click",function(){
				click(stat["type"],1)
			})
		}
	})
}

wakeSettlerButton.addEventListener("click", function(){
	let canWake = false
	resources.forEach(function(resource){
		if(resource["name"] == "sleepingSettlers" && resource["amount"] > 0){
			resource["amount"] --
			canWake = true
		}
		if(resource["name"] == "awakeSettlers" && resource["amount"] < 100 && canWake){
			resource["amount"] ++
			click("labor",1)
			updateAmounts()
		}
	})

})

freezeSettlerButton.addEventListener("click", function(){
	resources.forEach(function(resource){
		if(resource["name"] == "sleepingSettlers" && resource["amount"] < 100){
			resource["amount"] ++
			updateAmounts()
		}
		if(resource["name"] == "awakeSettlers" && resource["amount"] > 0){
			resource["amount"] --
			click("labor",-1)
			updateAmounts()
		}
	})

})

function click(type, num){
	stats.forEach(function(stat){
		if(stat["name"] == "terra" && stat["amount"] >= 100){
			stat["amount"] = 100
		} else if(type == stat["type"]){
			stat["amount"] += num
		}
	})
	updateAmounts()
	checkPrices()
}

function updateAmounts(){ //checks the amount listed in each entry of the three objects and makes sure that any HTML element displaying that amount is up to date.
	resources.forEach(function(resource){
		resource["elmnts"].forEach(function(elm){
			elm.innerHTML = resource["amount"]
		})
	})
	stats.forEach(function(stat){
		if(stat["name"] == "terra"){
			stat["elmnts"].innerHTML = stat["amount"].toFixed(2)
		} else {
			stat["elmnts"].innerHTML = stat["amount"]
		}
	})
	buildables.forEach(function(structure){
		structure["currentAmountEl"].forEach(function(elm){
			elm.innerHTML = structure["amount"]
		})
	})
	disableFreezing()
	if(ensurePlaceToLive()){
		wakeSettlerButton.disabled = false
	} else {
		wakeSettlerButton.disabled = true
	}
}

function ensurePlaceToLive(){
	let livingSpaceNumber
	buildables.forEach(function(structure){
		if(structure["type"] == "livingUnit"){
			livingSpaceNumber = structure["amount"]
		}
	})
	let result
	resources.forEach(function(resource){
		 if(resource["name"] == "awakeSettlers"){ 
			if(livingSpaceNumber > resource["amount"]){
				result = true
			} else {
			result = false
			}
		}
	})
	return result
}

function disableFreezing(){
	stats.forEach(function(stat){
		if(stat["type"] == "labor" && stat["amount"] <= 0){
			freezeSettlerButton.disabled = true
		} else {
			resources.forEach(function(resource){
				if(resource["name"] == "sleepingSettlers"){ 
					if(resource["amount"] == 100){
						freezeSettlerButton.disabled = true
					} else {
						freezeSettlerButton.disabled = false
					}
				}
			})
		}
	})
	
}

function checkPrices(){
	buildables.forEach(function(structure){
		let currentEnergyPrice = findPrice(structure["startingEnergyPrice"],structure["amount"])
		let currentMatPrice = findPrice(structure["startingMatPrice"],structure["amount"])
		structure["costEl"].innerHTML=`Energy: ${currentEnergyPrice}, Materials: ${currentMatPrice}`
		if(currentEnergyPrice <= stats[0]["amount"] && currentMatPrice <= stats[1]["amount"]){
			structure["buildButton"].disabled = false
		}else{
			structure["buildButton"].disabled = true
		}
	})
}

function findPrice(starting, amount){
	return starting - 1 + Math.ceil(Math.pow(1.15, amount))
}

function checkForPlayerWin(){
	resources.forEach(function(resource){
		if(resource["name"] == "sleepingSettlers" && resource["amount"] == 0){
			resources.forEach(function(otherResource){
				if(otherResource["name"] == "awakeSettlers" && otherResource["amount"] == 0){
					alert("All settlers have died. You lose.")
					clearInterval(gameTick)
				}
			})
		}
	})
	let terraAt100 = 0
	stats.forEach(function(stat){
		if(stat["name"] == "terra" && stat["amount"] >= 100){
			terraAt100 ++
		}
	})
	if(terraAt100 == 3){
		resources.forEach(function(resource){
			if(resource["name"] == "sleepingSettlers" && resource["amount"] == 0){
				clearInterval(gameTick)
				alert("You won!")
			}
		})
	}
}
