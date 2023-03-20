
function restoreOptions() {
    chrome.storage.sync.get({toggleState: false},
		function (items) {
            document.getElementById("state").checked = items.toggleState
		}
        )
    }

    document.addEventListener("DOMContentLoaded", function () {
        console.log(chrome)
        restoreOptions()    
    })

    const onClickHandler = () => {
	const toggleState = document.getElementById("state").checked


    chrome.storage.sync.set({ toggleState: toggleState }).then(() => {
        console.log("Value is set to " + toggleState);
      });

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
}

document.getElementById("state").addEventListener("click", onClickHandler)
