import "chrome-extension-async"



go()   // <---- The function you're measuring time for 




async function go() {
  var t0 = performance.now()
  console.log(await chrome.windows.getAll({ populate: true }));
  var t1 = performance.now()
  console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")
  chrome.commands.onCommand.addListener(function (command) {
    console.log('Command:', command);


  });
}


chrome.windows.getLastFocused({}, (x) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    if (activeTab.id) {
      chrome.tabs.captureVisibleTab((url) => {
        chrome.tabs.sendMessage(activeTab.id, { "message": "toggle_command_palette", "image": url });
        console.log("sent toggle command", tabs[0]);
      })
      chrome.tabs.move(activeTab.id, { index: 0 })
    }
    else alert("error");
  });
});

export { };