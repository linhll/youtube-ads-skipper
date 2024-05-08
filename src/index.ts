function log(...message: any[]) {
  return console.log("[yt-ads-skipper]", ...message);
}

function getPlayer() {
  const elm = document.getElementById(
    "ytd-player"
  ) as unknown as IPlayerHostNode;

  return elm.getPlayer?.();
}

function getAdsParent(el: Element | null) {
  if (!el) {
    return null;
  }
  if (el.tagName === "ytd-rich-item-renderer") {
    return el;
  }
  return getAdsParent(el.parentElement);
}

const callback = () => {
  const ads = Array.from(document.getElementsByTagName("ytd-ad-slot-renderer"));
  ads.forEach((e) => {
    getAdsParent(e)?.remove();
    try {
      e.remove();
    } catch {}
  });
  const player = getPlayer();

  if (!player) {
    log("Player not found");

    return;
  }
  if (
    document.getElementById("movie_player")?.classList.contains("ad-showing")
  ) {
    log("skip ads");
    player.cancelPlayback!();

    setTimeout(() => {
      player.playVideo!();
    }, 1000);
  }
};

const observer = new MutationObserver(callback);

let _t = setInterval(() => {
  const html5PlayerNode = document.getElementById("movie_player");

  log("Try to find html5PlayerNode");
  if (!html5PlayerNode) {
    return;
  }

  log("Found html5PlayerNode");

  clearInterval(_t);

  // Start observing the target node for configured mutations
  observer.observe(html5PlayerNode!, {
    attributes: true,
  });
}, 500);
