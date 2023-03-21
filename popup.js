// function to update content.js variable
const updateToggleState = (toggleState) => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {toggleState: toggleState});
    });
};

// function which restores stuff
function restoreOptions() {
    chrome.storage.sync.get({ toggleState: false }, function (items) {
        document.getElementById("state").checked = items.toggleState;
        updateToggleState(items.toggleState);
    });
}

// restore stuff on opening
document.addEventListener("DOMContentLoaded", function () {
    restoreOptions();
});

// handler to save toggle state
const onClickHandler = () => {
    try {
        const toggleState = document.getElementById("state").checked;

        chrome.storage.sync.set({ toggleState: toggleState }).then(() => {
            console.log("Value is set to " + toggleState);
            updateToggleState(toggleState);
        });
    } catch (error) {
        console.log(error);
    }
};

// assigning click event handler with function
document.getElementById("state").addEventListener("click", onClickHandler);

// handle new tab opening
chrome.tabs.onCreated.addListener(() => {
    chrome.storage.sync.get({ toggleState: false }, function (items) {
        updateToggleState(items.toggleState);
    });
});
