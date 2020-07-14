
var injectedIframe;

if (window.location !== window.parent.location) {


}


window.addEventListener("blur", function () {
  disable();
});

function enable() { injectedIframe.style.display = "block"; }
function disable() { injectedIframe.remove() }


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log("Got message: ", request);
    if (request.message === "toggle_command_palette") {

      injectedIframe = document.createElement('iframe');
      console.log("Injected", injectedIframe);
      injectedIframe.id = "#injected-iframe";
      injectedIframe.src = chrome.extension.getURL("index.html")
      injectedIframe.style.cssText = `
width: 100%;
height: 100%;
position: fixed;
top: 0px;
right: 0px;
z-index: 2147483647;
border: none;
display: block;`

      document.body.appendChild(injectedIframe);

      //enable();
      console.log(request.image);
      var img = document.createElement('img');
      img.src = request.image;
      document.body.appendChild(img);

    }
  }
);



export { }
