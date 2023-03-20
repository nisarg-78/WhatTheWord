// function which restores stuff
function restoreOptions() {
	chrome.storage.sync.get({ toggleState: false }, function (items) {
		document.getElementById("state").checked = items.toggleState
	})
}

// restore stuff on opening
document.addEventListener("DOMContentLoaded", function () {
	restoreOptions()
})

// handler to save toggle state
const onClickHandler = () => {
	try {
		const toggleState = document.getElementById("state").checked
	
		chrome.storage.sync.set({ toggleState: toggleState }).then(() => {
			console.log("Value is set to " + toggleState)
		})
	
		;(async () => {
			const [tab] = await chrome.tabs.query({
				active: true,
				lastFocusedWindow: true,
			})
			// const response =
			await chrome.tabs.sendMessage(tab.id, {
				toggleState,
			})
		})()
	} catch (error) {
		console.log(error)
	}
}

// assigning click event handler with function
document.getElementById("state").addEventListener("click", onClickHandler)