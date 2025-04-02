const { invoke } = window.__TAURI__.core;

// let greetInputEl;
// let greetMsgEl;

// async function greet() {
//   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
//   greetMsgEl.textContent = await invoke("greet", { name: greetInputEl.value });
// }

// window.addEventListener("DOMContentLoaded", () => {
//   greetInputEl = document.querySelector("#greet-input");
//   greetMsgEl = document.querySelector("#greet-msg");
//   document.querySelector("#greet-form").addEventListener("submit", (e) => {
//     e.preventDefault();
//     greet();
//   });
// });

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#files").addEventListener("click", () => {
    var panel = document.getElementById("toggle-panel");
    var display = getComputedStyle(panel).display;

    if (display == "none") {
      panel.style.display = "block";
      // document.getElementById("toggle-run").style.display = "none";
    } else {
      panel.style.display = "none";
    }
  });
});

function enableTab(id) {
  var el = document.getElementById(id);
  el.onkeydown = function (e) {
    if (e.keyCode === 9) {
      e.preventDefault();
      // Tab key code
      // Get current cursor position
      var start = this.selectionStart;
      var end = this.selectionEnd;

      // Insert tab character
      var tabSpaces = "    ";
      this.value =
        this.value.substring(0, start) + tabSpaces + this.value.substring(end);

      // Set cursor position back
      this.selectionStart = this.selectionEnd = start + 4;

      // Prevent default tab behavior (moving focus)
      return false;
    }
  };
}

enableTab("editor");
