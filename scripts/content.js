
const getToggleButtonContainer = async () => {

  // Loading takes time, wait for the button to appear before adding the toggle
  const MAX_ITERATIONS = 20;  // 10 seconds
  const WAIT_TIME_MS = 500;

  for (let i=0; i<MAX_ITERATIONS; i++) {
    
    const foundContainer = document.querySelector(".fire-card-action-bar.on-grey-theme-container");
    console.debug(`Found container for toggle button at iteration ${i}`, foundContainer);

    if (foundContainer) {
      return foundContainer;
    }
    
    await new Promise(r => setTimeout(r, WAIT_TIME_MS));
  }
}

const getButtonText = (isFullScreen) => {
  return `${isFullScreen ? "Exit" : "Enter"} fullscreen`;
}

(async() => {

  console.debug("Starting script");

  // Will be changed by using the toggle on screen
  let isFullScreen = false;
  
  // Add the button to toggle fullscreen
  const TOGGLE_BUTTON_CLASS = 'toggle-fullscreen-button';
  const toggleButtonContainer = await getToggleButtonContainer();
  if (toggleButtonContainer) {
    const toggleButton = document.createElement('button');
    // toggleButton.classList.add("menu-button", "mdc-button", "mat-primary", "mat-mdc-button-base", TOGGLE_BUTTON_CLASS);
    toggleButton.classList.add("mat-mdc-menu-trigger", "menu-button", "mdc-button", "mat-mdc-button", "mat-primary", "mat-mdc-button-base", TOGGLE_BUTTON_CLASS);
    toggleButton.textContent = getButtonText(isFullScreen);
    toggleButtonContainer.insertAdjacentElement("afterbegin", toggleButton);
    console.debug("Added toggle button");
  }

  const toggleButton = document.querySelector(`.${TOGGLE_BUTTON_CLASS}`);
  console.debug("Found button", toggleButton);

  // Toggle fullscreen when the button is clicked
  toggleButton.addEventListener('click', () => {

    isFullScreen = !isFullScreen;
    toggleButton.textContent = getButtonText(isFullScreen);
    
    // Toggle class on specific elements
    const elementsToToggle = [];
    elementsToToggle.push(document.querySelector(".mat-card.mat-focus-indicator.f7e-card"));
    elementsToToggle.push(document.querySelector(".f7e-viewer.ng-star-inserted"));
    elementsToToggle.forEach((element) => {
      element.classList.toggle("fullscreen");
    });

    document.body.classList.toggle("fullscreen");
    console.debug(`Toggled fullscreen to ${isFullScreen}`);
  });
})();