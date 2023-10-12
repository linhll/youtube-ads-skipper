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
  let t_auto = setInterval(() => {
    const adsContainerNode = document.getElementsByClassName(
      'video-ads ytp-ad-module'
    )[0];
    if (adsContainerNode) {
      const config = { subtree: true, childList: true };
      const callback = () => {
        if (adsContainerNode.childNodes.length === 0) {
          getPlayer()?.playVideo();
          console.log('ytadskiper', 'ads skipped');

          return;
        }
      };

      const observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(adsContainerNode, config);
      window.setTimeout(callback, 3000);
      window.clearInterval(t_auto);
    }
  }, 1000);

  let t_skip = setInterval(() => {
    const html5PlayerNode = document.getElementById('movie_player');

    if (html5PlayerNode) {
      const config = { attributes: true };
      const callback = () => {
        if (html5PlayerNode.classList.contains('ad-showing')) {
          console.log('ytadskiper', 'skip ads');
          getPlayer().cancelPlayback();
          return;
        }
      };

      const observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(html5PlayerNode, config);
      window.setTimeout(callback, 3000);
      window.clearInterval(t_skip);
    }
  });
})();
