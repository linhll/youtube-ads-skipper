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
  'use strict';
  function getPlayer() {
    return document.getElementById('ytd-player')?.getPlayer();
  }
  let _t = setInterval(() => {
    const adsContainerNode = document.getElementsByClassName(
      'video-ads ytp-ad-module'
    )[0];
    if (adsContainerNode) {
      const config = { subtree: true, childList: true };
      const callback = (mutationList, observer) => {
        if (adsContainerNode.childNodes.length === 0) {
          getPlayer()?.playVideo();
          console.log('ads skipped');

          return;
        }
        console.log('skip ads');
        getPlayer().cancelPlayback();
      };

      const observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(adsContainerNode, config);
      window.setTimeout(callback, 3000);
      window.clearInterval(_t);
    }
  }, 1000);
})();
