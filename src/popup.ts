const manifestData = chrome.runtime.getManifest();
const insertVersion = document.querySelector('#insert_version');
if (insertVersion) {
  insertVersion.innerHTML = `Version ${manifestData.version}`;
}