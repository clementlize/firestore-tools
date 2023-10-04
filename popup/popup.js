const manifestData = chrome.runtime.getManifest();
const insertVersion = document.querySelector('#insert_version');
insertVersion.innerHTML = `Version ${manifestData.version}`;