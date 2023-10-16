// ==UserScript==
// @name         Youtube ads
// @namespace    https://github.com/linhll/youtube-ads-skipper
// @version      0.2
// @description  try to take over the world!
// @author       https://github.com/linhll
// @match        https://www.youtube.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  // Object.prototype.adBlocksFound = 0;
  // Object.prototype.hasAllowedInstreamAd = true;

  function getPlayer() {
    return document.getElementById('ytd-player')?.getPlayer();
  }
  function getAdsParent(el) {
    if (!el) {
      return null;
    }
    if (el.tagName === 'ytd-rich-item-renderer') {
      return el;
    }
    return getAdsParent(el.parentElement);
  }

  let t_skip = setInterval(() => {
    const html5PlayerNode = document.getElementById('movie_player');

    if (html5PlayerNode) {
      const config = { attributes: true };
      const callback = () => {
        const ads = Array.from(
          document.getElementsByTagName('ytd-ad-slot-renderer')
        );
        ads.forEach((e) => {
          getAdsParent(e)?.remove();
          try {
            e.remove();
          } catch {}
        });

        const player = getPlayer();
        if (!player) {
          return;
        }
        if (html5PlayerNode.classList.contains('ad-showing')) {
          console.log('ytadskiper', 'skip ads');
          getPlayer().cancelPlayback();

          setTimeout(() => {
            getPlayer().playVideo();
          }, 1000);
        }

        if (window.yt) {
          window.yt.ads = {};
          window.yt.ads_ = {};
          window.yt.www.ads = {};
          // if (window.yt.config_?.openPopupConfig?.supportedPopups) {
          //   window.yt.config_.openPopupConfig.supportedPopups.adBlockMessageViewModel = false;
          // }
        }

        // if (window.ytplayer?.config?.args?.raw_player_response) {
        //   window.ytplayer.config.args.raw_player_response.adPlacements = [];
        // }

        if (window.ytads) {
          window.ytads.bulleit = {};
        }

        if (player._customized) {
          return;
        }
        player._customized = true;
        player._getPlayerResponse = player.getPlayerResponse;
        player.getPlayerResponse = function () {
          const obj = player._getPlayerResponse();
          obj.adPlacements.length = 0;
          obj.adBreakHeartbeatParams = '';
          obj.playerAds.length = 0;
          obj.adSlots.length = 0;
          return obj;
        };
      };

      const observer = new MutationObserver(callback);

      // Start observing the target node for configured mutations
      observer.observe(html5PlayerNode, config);
      window.setTimeout(callback, 3000);
      window.clearInterval(t_skip);
    }
  });
})();
