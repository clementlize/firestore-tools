const TOGGLE_FULLSCREEN_BUTTON_CLASS = 'toggle-fullscreen-button';
let isFullScreen = false;

const getFullscreenButtonText = (isFullScreen: boolean) => {
  return `${isFullScreen ? "Exit" : "Enter"} fullscreen`;
}

export const addFullscreenButtonIfNecessary = (topbar: HTMLDivElement) => {

  if (!document.querySelector(`.${TOGGLE_FULLSCREEN_BUTTON_CLASS}`)) {

    console.log("Adding toggle fullscreen button...");
    const toggleFullscreenButton = document.createElement('button');
    toggleFullscreenButton.classList.add("mat-mdc-menu-trigger", "menu-button", "mdc-button", "mat-mdc-button", "mat-primary", "mat-mdc-button-base", TOGGLE_FULLSCREEN_BUTTON_CLASS);
    toggleFullscreenButton.textContent = getFullscreenButtonText(isFullScreen);
    topbar.insertAdjacentElement("afterbegin", toggleFullscreenButton);
    console.debug("Added toggle fullscreen button");

    console.log("Adding event listener...");
    toggleFullscreenButton.addEventListener('click', () => {

      isFullScreen = !isFullScreen;
      toggleFullscreenButton.textContent = getFullscreenButtonText(isFullScreen);

      // Toggle class on specific elements
      const elementsToToggle: (HTMLElement | undefined)[] = [];
      elementsToToggle.push(document.querySelector("f7e-data-panel-viewer"));
      elementsToToggle.push(document.querySelector(".data-panel-viewer"));
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