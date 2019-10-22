// setting up the game.

checkPrices()
setBuyButtons()
setLaborButtons()
updateAmounts()
setStatButtons()
gameTick = setInterval(gameClock, 1000) // a tick

function gameClock(){ //what happens every tick
	autoclick()
	foodTime()
	checkForPlayerWin()
}

function autoclick(){ //generates resources based on how many buildings and laborers you have.
	let clicks = 0
	buildables.forEach(function(structure){
		resources.forEach(function(resource){
			//checks to see what the buildings resouce type is, maths out how many clicks you should get of that resouce based on your current set up.
			if(structure["resourceType"] == resource["type"]){
				clicks = structure["clickAmount"] * structure["amount"] * resource["amount"]
				if(clicks > 0){
					click(structure["resourceType"], clicks)
				}
			}
		})
	})
}

function foodTime(){ //takes as many food points as there are woken settlers, and kills someone if there's not enough food. Only one person is killed because otherwise it becomes possilbe for everyone to die very quickly, and that's hard to deal with.
	stats.forEach(function(stat){
		if(stat["type"] == "food"){
			resources.forEach(function(resource){
				if(resource["name"] == "awakeSettlers"){
					potentialFood = stat["amount"] - resource["amount"] //stat is food, resource is awakeSettlers, each person potentially eats a single food.
					if(potentialFood >= 0){
						stat["amount"] -= resource["amount"]
					} else {
						stat["amount"] = 0 //you cannot have negative food.
						resource["amount"] -- //makes the awakeSettlers resource reflect that someone just died.
						click("labor",-1) //makes the labor stat reflect that someone died.
					}
					updateAmounts()
					
				}
			})
		}
	})
}

function setBuyButtons(){ //adds the eventListener for each buy button.
	buildables.forEach(function(structure){
		structure["buildButton"].addEventListener("click", function(){
			//all this is to check to see if you can afford to build the structure at current value.
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
			structure["amount"] ++ //builds a structure.
			updateAmounts()
		})
	})
}

function setLaborButtons(){ //adds the event listeners to the + and - buttons.
	laborerButtons.forEach(function(butt){ 
		butt["butt"].addEventListener("click",function(){
			stats.forEach(function(stat){
				if(stat["name"] == "currentLaborers"){	
					if(stat["amount"] > 0 || butt["value"] < 0){ 
					//ensures that you aren't going to get into negative laborers.
						resources.forEach(function(resource){
							if (butt["type"] == resource["type"] && (resource["amount"] > 0 || butt["value"] > 0)){
							//ensures that the button is affecting the right labor pool and that you aren't putting the labor pool into the negative. 
								stat["amount"] -= butt["value"]
								resource["amount"] += butt["value"]
								
							}
						})
					}
				}
			})
			updateAmounts()
		})
		butt["butt"].addEventListener("dblclick",function(){
		//sets up the double click add/take all function.
			stats.forEach(function(stat){
				if(stat["name"] == "currentLaborers"){	
					if(stat["amount"] > 0 || butt["value"] < 0){
						resources.forEach(function(resource){
							while(butt["type"] == resource["type"] && (resource["amount"] > 0 && stat["amount"] > 0 || butt["value"] > 0  && stat["amount"])){
							//very similar to the if statement of the single click if statment, but a while loop and with a check for if you've hit zero to prevent an infinate while loop.
								stat["amount"] -= butt["value"]
								resource["amount"] += butt["value"]
								
							}
						})
					}
				}
			})
		})
	})
}

function setStatButtons(){
	stats.forEach(function(stat){
	//you click the button you get the stat point.
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
		//makes sure that you have a sleeping settler to wake.	
			resource["amount"] --
			canWake = true
		}
		if(resource["name"] == "awakeSettlers" && resource["amount"] < 100 && canWake){
		// makes sure that you don't have too many awake settlers, and if you don't, wakes the settler.
			resource["amount"] ++
			click("labor",1)
			updateAmounts()
		}
	})

})

freezeSettlerButton.addEventListener("click", function(){
	resources.forEach(function(resource){
		//it's basically the same as wakeSettlerButton but for freezing.
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
		//makes sure you're not raising a terraform stat once it's at 100%
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
	let numberOfLivingUnits = 0 
	buildables.forEach(function(structure){
		structure["currentAmountEl"].forEach(function(elm){
			elm.innerHTML = structure["amount"]
		})
		if(structure["resourceType"] == "living"){
			numberOfLivingUnits += structure["amount"] * structure["value"]
			livingAmount.innerHTML = numberOfLivingUnits
		}
	})
	
	//settler button bookkeeping
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
	//figures out how many living spaces you have
		if(structure["type"] == "livingUnit"){
			livingSpaceNumber = structure["amount"]
		}
		if(structure["type"] == "multiLivingUnit"){
			livingSpaceNumber += structure["amount"] * structure["value"]
		}
	})
	let result
	resources.forEach(function(resource){
	//figures out if there are unlived in living spaces.
		 if(resource["name"] == "awakeSettlers"){ 
			if(livingSpaceNumber > resource["amount"]){
				result = true
			} else {
			result = false
			}
		}
	})
	return result //you can't return from a forEach loop. Why can't you return from a foreach loop?!
}

function disableFreezing(){
	stats.forEach(function(stat){
		if(stat["type"] == "labor"){
			if(stat["amount"] <= 0){
				//if you don't have any free laborers, you cannot freeze anyone.
				freezeSettlerButton.disabled = true
			} else {
				resources.forEach(function(resource){
				//you cannot freeze anyone if everyone's already asleep.
					if(resource["name"] == "sleepingSettlers"){ 
						if(resource["amount"] == 100){
							freezeSettlerButton.disabled = true
						} else {
							freezeSettlerButton.disabled = false
						}
					}
				})
			}
		}
	})
	
}

function checkPrices(){
	//makes the cost desplayed on the buttons accurate.
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
	//I stole this formula from cookie clicker.
	return Math.ceil(starting * Math.pow(1.15, amount))
}

function checkForPlayerWin(){
	resources.forEach(function(resource){
		//everyone dead? You loose.
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
				//no one asleep and the planet terraformed? You win.
				clearInterval(gameTick)
				alert("You won!")
			}
		})
	}
}

newGameButton.addEventListener("click", function(){
	if(confirm("Are you sure you want to start a new game? All progress will be lost.")){
		location.reload()
	}
})

instructionButton.addEventListener("click", function(){
	dimScreen.style.visibility="visible"
})

closeButton.addEventListener("click", function(){
	dimScreen.style.visibility="hidden"
})
