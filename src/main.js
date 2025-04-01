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
  document.querySelector(".icon-btn").addEventListener("click", () => {
    var panel = document.getElementById("toggle-panel");
    var display = getComputedStyle(panel).display;

    if (display == "none") {
      panel.style.display = "block";
    } else {
      panel.style.display = "none";
    }
  });
});
