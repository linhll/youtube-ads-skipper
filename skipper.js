// ==UserScript==
// @name         Auto skip youtube ads
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  const adsContainerNode = document.getElementsByClassName(
    "video-ads ytp-ad-module"
  )[0];
  if (adsContainerNode) {
    const config = { subtree: true, childList: true };
    const callback = (mutationList, observer) => {
      let playButton = document.querySelector("button.ytp-play-button");
      if (adsContainerNode.childNodes.length === 0) {
        console.log("ads skipped");
        if (
        playButton?.getAttribute("data-title-no-tooltip")?.toLowerCase() ===
        "play"
      ) {
        playButton.click();
      }
        return;
      }

      if (
        playButton?.getAttribute("data-title-no-tooltip")?.toLowerCase() ===
        "play"
      ) {
        playButton.click();
      }
       if(!Array.isArray(mutationList)){
         return;
       }
      for (const mutation of mutationList) {
        if (mutation.type == "childList") {
          let button = adsContainerNode.querySelector(
            "button.ytp-ad-skip-button.ytp-button"
          );
          if (button) {
            console.log("legacy button detected");
            button.click();
            button = undefined;
          }
          button = adsContainerNode.querySelector(
            "button.ytp-ad-skip-button-modern.ytp-button"
          );
          if (button) {
            console.log("modern button detected");
            button.click();
            button = undefined;
          }
        }
      }
    };
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(adsContainerNode, config);
    window.setTimeout(callback, 3000);

  }
})();
