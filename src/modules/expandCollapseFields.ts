const COLLAPSE_FIELDS_BUTTON_CLASS = 'collapse-fields-button';
const EXPAND_FIELDS_BUTTON_CLASS = 'expand-fields-button';

const getPageButtons = (type: "expand" | "collapse"): HTMLButtonElement[] => {

  const allToggleButtons: HTMLButtonElement[] = Array.from(document.querySelectorAll(".database-expand-collapse-button"));
  console.debug(`Found ${allToggleButtons.length} toggle buttons (before filtering)`);

  const onlyArrayAndMapButtons = allToggleButtons.filter((button) => {

    let loopCount = 0;
    let currentElement: HTMLElement | null | undefined = button;
    let foundMatchingNode: HTMLElement | undefined;

    while (loopCount <= 5 && !foundMatchingNode) {  // No more than 5 parents
      currentElement = currentElement?.parentElement;
      if (
        currentElement
        && currentElement.classList.contains("database-node")
        && (
          currentElement.classList.contains("type-map")
          || currentElement.classList.contains("type-array")
        )
      ) {
        foundMatchingNode = currentElement;
      }
      loopCount++;
    }

    return Boolean(foundMatchingNode);
  });
  console.debug(`Found ${onlyArrayAndMapButtons.length} toggle buttons (array and map only)`);

  const buttonsWithMatchingType = onlyArrayAndMapButtons.filter((button) => {

    const icon = button.children[0] as HTMLElement | undefined;
    if (icon) {
      const innerText = icon.innerHTML.trim();
      if (type === "expand" && innerText === "arrow_right") {
        return true;
      }
      if (type === "collapse" && innerText === "arrow_drop_down") {
        return true;
      }
    }

    return false;
  });
  console.debug(`Found ${buttonsWithMatchingType.length} toggle buttons (after type filtering)`);

  return buttonsWithMatchingType;
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

    console.log("Adding collapse button event listener...");
    button.addEventListener('click', () => {
      const pageButtons = getPageButtons("collapse");
      pageButtons.forEach((pageButton) => {
        pageButton.click();
      })
    });
    console.log("Added collapse button event listener.");
  }

  if (!document.querySelector(`.${EXPAND_FIELDS_BUTTON_CLASS}`)) {

    console.log("Adding expand button...");
    const button = getButtonToInsert("Expand fields", EXPAND_FIELDS_BUTTON_CLASS);
    topbar.insertAdjacentElement("beforeend", button);
    console.debug("Added expand button");

    console.log("Adding expand button event listener...");
    button.addEventListener('click', () => {
      const pageButtons = getPageButtons("expand");
      pageButtons.forEach((pageButton) => {
        pageButton.click();
      })
    });
    console.log("Added expand button event listener.");
  }
}