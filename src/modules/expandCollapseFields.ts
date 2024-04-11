const COLLAPSE_FIELDS_BUTTON_CLASS = 'collapse-fields-button';
const EXPAND_FIELDS_BUTTON_CLASS = 'expand-fields-button';

const getPageButtons = (type: "Expand" | "Collapse"): HTMLButtonElement[] => {
  return (Array.from(document.querySelectorAll(`[aria-label^='${type}']`)) as HTMLButtonElement[])
    .filter((button) => {

      let loopCount = 0;
      let currentElement: HTMLElement = button;
      let foundElement: HTMLElement | undefined;

      while (loopCount <= 5 && !foundElement) {  // No more than 5 parents
        currentElement = currentElement.parentElement;
        if (
          currentElement
          && currentElement.classList.contains("database-node")
          && (
            currentElement.classList.contains("type-map")
            || currentElement.classList.contains("type-array")
          )
        ) {
          foundElement = currentElement;
        }
        loopCount++;
      }

      return Boolean(foundElement);
    });
}

const getButtonToInsert = (text: string, className: string) => {

  const button = document.createElement('button');
  button.classList.add("mat-mdc-menu-trigger", "menu-button", "mdc-button", "mat-mdc-button", "mat-primary", "mat-mdc-button-base", className);
  button.textContent = text;

  button.style.marginLeft = "0px";
  button.style.paddingLeft = "12px";
  button.style.paddingRight = "12px";
  button.style.marginRight = "8px";

  return button;
}

export const addExpandCollapseFieldsButtonsIfNecessary = (topbar: HTMLDivElement) => {

  if (!document.querySelector(`.${COLLAPSE_FIELDS_BUTTON_CLASS}`)) {

    console.log("Adding collapse button...");
    const button = getButtonToInsert("Collapse fields", COLLAPSE_FIELDS_BUTTON_CLASS);
    topbar.insertAdjacentElement("beforeend", button);
    console.debug("Added collapse button");

    console.log("Adding event listener...");
    button.addEventListener('click', () => {
      const pageButtons = getPageButtons("Collapse");
      pageButtons.forEach((pageButton) => {
        pageButton.click();
      })
    });
  }

  if (!document.querySelector(`.${EXPAND_FIELDS_BUTTON_CLASS}`)) {

    console.log("Adding expand button...");
    const button = getButtonToInsert("Expand fields", EXPAND_FIELDS_BUTTON_CLASS);
    topbar.insertAdjacentElement("beforeend", button);
    console.debug("Added expand button");

    console.log("Adding event listener...");
    button.addEventListener('click', () => {
      const pageButtons = getPageButtons("Expand");
      pageButtons.forEach((pageButton) => {
        pageButton.click();
      })
    });
  }
}