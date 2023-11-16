
let observerTriggerCount = 0;
const MAX_OBSERVER_TRIGGER_COUNT = 200;

let isFullScreen = false;
const TOGGLE_BUTTON_CLASS = 'toggle-fullscreen-button';

// TODO: use TS
const PAGE_FIRESTORE = "firestore";
const PAGE_LOGS_EXPLORER = "logs-explorer";

// TODO: use TS
const configs = {
  [PAGE_FIRESTORE]: {
    buttonContainerQuery: ".fire-card-action-bar.on-grey-theme-container",
    queriesToCheckOnGoodPage: [
      "firestore-link-out-menu"
    ],
    elementToToggleQueries: [
      "f7e-data-panel-viewer",
      ".data-panel-viewer",
    ],
    buttonAdditionalStyle: "",
  },
  [PAGE_LOGS_EXPLORER]: {
    // buttonContainerQuery: ".mat-mdc-card-header.ng-tns-c2823155722-5",
    buttonContainerQuery: ".mat-mdc-card-header.ng-tns-c2823155722-4",
    queriesToCheckOnGoodPage: [],
    elementToToggleQueries: [
      // ".logs-card.logs-viewer-card.query-results",
      ".logs-card.consolidated-cards.ng-tns-c2823155722-4.default.ng-star-inserted",
    ],
    buttonAdditionalStyle: "padding:0;margin-right:1.5rem;margin-top:0.15rem;",
  }
}

const getButtonText = (isFullScreen) => {
  return `${isFullScreen ? "Exit" : "Enter"} fullscreen`;
}

const observer = new MutationObserver((mutations) => {

  observerTriggerCount++;
  if (observerTriggerCount > MAX_OBSERVER_TRIGGER_COUNT) {
    console.info("Too many observer triggers, disconnecting..");
    observer.disconnect();
  }

  let page = null;
  let currentConfig = null;

  let toggleButtonContainer = null;
  for (const [configKey, config] of Object.entries(configs)) {
    // Take only the 1st one matching, we shouldn't be on multiple pages at once
    if (!toggleButtonContainer) {
      toggleButtonContainer = document.querySelector(config.buttonContainerQuery);
      // Found -> we keep trace on which page we're on
      if (toggleButtonContainer) {
        page = configKey;
        currentConfig = config;
      }
    }
  }

  if (page && currentConfig && toggleButtonContainer) {
    
    console.debug("Found container for toggle button", toggleButtonContainer);
    
    // Add toggle button if not added yet
    if (!document.querySelector(`.${TOGGLE_BUTTON_CLASS}`)) {

      console.debug("Checking that we're on the right page using queries from config...");
      for (const query of currentConfig.queriesToCheckOnGoodPage) {
        console.debug(`Checking that we're on ${page} page by looking for ${query}...`)
        const foundElement = document.querySelector(query);
        if (!foundElement) {
          console.debug(`Could not find element ${query}, probably not on ${page} page. Not inserting button.`);
          return;
        }
      }
      console.debug(`We're on ${page} page, inserting button.`);

      console.log("Adding toggle button...");
      const toggleButton = document.createElement('button');
      toggleButton.classList.add("mat-mdc-menu-trigger", "menu-button", "mdc-button", "mat-mdc-button", "mat-primary", "mat-mdc-button-base", TOGGLE_BUTTON_CLASS);
      toggleButton.style.cssText += currentConfig.buttonAdditionalStyle;
      toggleButton.textContent = getButtonText(isFullScreen);
      toggleButtonContainer.insertAdjacentElement("afterbegin", toggleButton);
      console.debug("Added toggle button", { toggleButtonContainer, toggleButton});

      console.log("Adding event listener...");
      toggleButton.addEventListener('click', () => {

        isFullScreen = !isFullScreen;
        toggleButton.textContent = getButtonText(isFullScreen);
        
        // Toggle class "fullscreen" on specific elements
        const elementsToToggle = [];
        currentConfig.elementToToggleQueries.forEach((query) => {
          elementsToToggle.push(document.querySelector(query));
        });

        elementsToToggle.forEach((element) => {
          if (element) {
            element.classList.toggle("fullscreen");
          }
          else {
            console.error("Could not find element to toggle");
          }
        });

        document.body.classList.toggle("fullscreen");
        console.debug(`Toggled fullscreen to ${isFullScreen}`);
      });
    }
  }
  else {
    console.debug("Could not find container for toggle button (or determine page)");
  }
});
observer.observe(document, { childList: true, subtree: true });