const { invoke } = window.__TAURI__.core;

// let greetInputEl;
// let greetMsgEl;

// window.addEventListener("DOMContentLoaded", () => {
//   greetInputEl = document.querySelector("#greet-input");
//   greetMsgEl = document.querySelector("#greet-msg");
//   document.querySelector("#greet-form").addEventListener("submit", (e) => {
//     e.preventDefault();
//     greet();
//   });
// });
//
function toggleVisibility(toggleID) {
  var panel = document.getElementById(toggleID);
  var display = getComputedStyle(panel).display;

  if (display == "none") {
    panel.style.display = "block";
    // document.getElementById("toggle-run").style.display = "none";
  } else {
    panel.style.display = "none";
  }
}

function setupToggleButton(clickID, toggleID) {
  document.getElementById(clickID).addEventListener("click", () => {
    toggleVisibility(toggleID);
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setupFilePanel("../Yamuna");

  setupToggleButton("files", "toggle-panel");
  setupToggleButton("terminal-btn", "terminal");

  enableTab("editor");

  // Use an immediately-invoked async function to call loadTabs
  (async () => {
    await loadTabs();
  })();

  document.addEventListener("keydown", function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === "r") {
      toggleVisibility("toggle-panel");
    }
    if ((e.metaKey || e.ctrlKey) && e.key === "j") {
      toggleVisibility("terminal");
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

async function loadTabs() {
  let tablist = ["script.js", "foo.rs", "main.py"];
  let tabBar = document.getElementById("tab-bar");
  let activeTab = "main.py";
  let codeArea = document.getElementById("editor");

  // Clear existing tabs
  tabBar.innerHTML = "";

  // Load the active tab content when the page loads
  let initialContent = await get_content(activeTab);
  codeArea.value = initialContent;

  for (let i = 0; i < tablist.length; i++) {
    // Create the tab span element that will receive styling
    let tabSpan = document.createElement("span");
    tabSpan.textContent = tablist[i];

    // Add the active-tab class if this is the active tab
    if (tablist[i] === activeTab) {
      tabSpan.classList.add("active-tab");
    }

    // Add click event to switch active tab
    tabSpan.addEventListener("click", async function () {
      // Remove active class from all tabs
      document.querySelectorAll("#tab-bar span").forEach((tab) => {
        tab.classList.remove("active-tab");
      });

      // Add active class to clicked tab
      this.classList.add("active-tab");

      // Load the file content when tab is clicked
      let fileContent = await get_content(this.textContent);
      codeArea.value = fileContent;
    });

    // Add the tab span directly to the tab bar
    tabBar.appendChild(tabSpan);
  }
}

async function get_content(file) {
  try {
    // Wait for the Promise to resolve
    return await invoke("contents", { file });
  } catch (error) {
    console.error("Error loading file:", error);
    return "Error loading file: " + error;
  }
}

function files(dir) {
  return invoke("files", {
    dir: dir,
  });
}

function setupFilePanel(dir) {
  let file_list = files(dir);
  let parentDiv = document.getElementById(dir);

  for (let i = 0; i < file_list.length; i++) {
    let eachContent = document
      .createElement("button")
      .appendChild(document.createElement("span").append(file_list[i]));

    parentDiv.append(eachContent.classList.add("eachContent"));
  }
}
