import { addExpandCollapseFieldsButtonsIfNecessary } from "./modules/expandCollapseFields";
import { addFullscreenButtonIfNecessary } from "./modules/fullScreen";

const observer = new MutationObserver(() => {

  const topbar: HTMLDivElement | undefined = document.querySelector(".fire-card-action-bar.on-grey-theme-container");
  if (topbar) {

    // Check that we're on the firestore database page
    const moreMenuButton: HTMLButtonElement | undefined = document.querySelector("firestore-link-out-menu");
    if (!moreMenuButton) {
      console.debug("Could not find more menu button, probably not on cloud firestore data page. Not inserting buttons");
      return;
    }

    // Remove the text of the button "More in Google Cloud" to earn space in the topbar
    const moreInGoogleCloudButton: HTMLButtonElement | undefined = topbar.querySelector('.menu-button-content').querySelector('span:first-of-type');
    if (moreInGoogleCloudButton) {
      moreInGoogleCloudButton.textContent = "";
    }
    else {
      console.debug("Could not find 'more in Google Cloud' button");
    }

    addFullscreenButtonIfNecessary(topbar);
    addExpandCollapseFieldsButtonsIfNecessary(topbar);
  }
  else {
    console.debug("Could not find container for buttons");
  }
});

observer.observe(document, { childList: true, subtree: true });
console.log("TESTT");