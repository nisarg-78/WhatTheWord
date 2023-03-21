const wrapper = document.createElement("div")
wrapper.setAttribute("id", "wrapper")
document.body.appendChild(wrapper)
$("#wrapper").draggable()

function hideDiv() {
	wrapper.style.display = "none"
}

function showDiv() {
	wrapper.style.display = "block"
}

const content = document.createElement("div")
content.setAttribute("id", "content")
wrapper.appendChild(content)

wrapperStyles = {
	position: "fixed",
	bottom: "0px",
	left: "0px",
	width: "500px",
	height: "300px",
	color: "black",
	fontStyle: "",
	backgroundColor: "#ced4da",
	display: "flex",
	border: "2px solid gray",
	"overflow-y": "scroll",
	"z-index": "1000",
}

contentStyles = {
	width: "100%",
}

defStyles = {
	display: "block",
	width: "100%",
	borderBottom: "1px solid #adb5bd",
}

defPStyles = {
	padding: "0.5em",
	margin: "0",
}

Object.assign(wrapper.style, wrapperStyles)
Object.assign(content.style, contentStyles)

hideDiv()

function definitionNode(text) {
	const definition = document.createElement("div")
	definition.setAttribute("class", "def")

	const para = document.createElement("p")
	para.innerText = text

	definition.appendChild(para)

	Object.assign(definition.style, defStyles)
	Object.assign(para.style, defPStyles)

	return definition
}

let searchWord
let definition

async function placeDiv(word) {
	try {
		word = word.trim()
		if (word !== searchWord && word != "") {
			const res = await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
			)
			const json = await res.json()
			const meanings = json[0]?.meanings
			$(".def").remove()
			for (meaning of meanings) {
				const defs = meaning.definitions
				for (def of defs) {
					content.appendChild(definitionNode(def.definition))
				}
			}
		}
	} catch (error) {}
}

let toggleState = false;

chrome.runtime.onMessage.addListener((message) => {
    toggleState = message.toggleState;
});

document.addEventListener("selectionchange", async (event) => {
    if (toggleState) {
        s = window.getSelection();
        if (s && s.toString()) {
            word = s.toString();
            placeDiv(word);
            searchWord = word;
            showDiv();
        } else {
            hideDiv();
        }
    }
});

document.addEventListener("selectionchange", async (event) => {
	s = window.getSelection()
	if (isEnabled && s && s.toString()) {
		word = s.toString()
		placeDiv(word)
		searchWord = word
		showDiv()
	} else {
		hideDiv()
	}
})
