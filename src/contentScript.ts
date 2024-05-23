import { addExpandCollapseFieldsButtonsIfNecessary } from "./modules/expandCollapseFields";
import { addFullscreenButtonIfNecessary } from "./modules/fullScreen";

const observer = new MutationObserver(() => {

  const topbar = document.querySelector(".fire-card-action-bar.on-grey-theme-container") as HTMLDivElement | undefined;
  if (topbar) {

    // Check that we're on the firestore database page
    const moreMenuButton = document.querySelector("firestore-link-out-menu") as HTMLButtonElement | undefined;
    if (!moreMenuButton) {
      console.debug("Could not find more menu button, probably not on cloud firestore data page. Not inserting buttons");
      return;
    }

    // Remove the text of the button "More in Google Cloud" to earn space in the topbar
    const moreInGoogleCloudButton = topbar.querySelector('.menu-button-content')?.querySelector('span:first-of-type') as HTMLButtonElement | undefined;
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