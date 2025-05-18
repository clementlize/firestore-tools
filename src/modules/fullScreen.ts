import { BASE_BUTTON_CLASSES } from "../helpers/constants";

const TOGGLE_FULLSCREEN_BUTTON_CLASS = 'toggle-fullscreen-button';
let isFullScreen = false;

const getFullscreenButtonText = (isFullScreen: boolean) => {
  return `${isFullScreen ? "Exit" : "Enter"} fullscreen`;
}

export const addFullscreenButtonIfNecessary = (topbar: HTMLDivElement) => {

  if (!document.querySelector(`.${TOGGLE_FULLSCREEN_BUTTON_CLASS}`)) {

    console.log("Adding toggle fullscreen button...");
    const toggleFullscreenButton = document.createElement('button');
    toggleFullscreenButton.classList.add(...BASE_BUTTON_CLASSES, TOGGLE_FULLSCREEN_BUTTON_CLASS);
    toggleFullscreenButton.textContent = getFullscreenButtonText(isFullScreen);
    topbar.insertAdjacentElement("afterbegin", toggleFullscreenButton);
    console.debug("Added toggle fullscreen button");

    console.log("Adding toggle fullscreen event listener...");
    toggleFullscreenButton.addEventListener('click', (e) => {

      e.stopPropagation();

      isFullScreen = !isFullScreen;
      toggleFullscreenButton.textContent = getFullscreenButtonText(isFullScreen);

      // Toggle class on specific elements
      const elementsToToggle: (HTMLElement | null | undefined)[] = [];
      elementsToToggle.push(document.querySelector("f7e-data-panel-viewer-card-action-bar")?.closest("mat-card") as HTMLElement | null);
      elementsToToggle.forEach((element) => {
        if (element) {
          element.classList.toggle("firestore-tools-fullscreen");
        }
        else {
          console.error("Could not find element to toggle");
        }
      });

      // document.body.classList.toggle("fullscreen");
      console.debug(`Toggled fullscreen to ${isFullScreen}`);
    });
    console.log("Added toggle fullscreen event listener...");
  }
}