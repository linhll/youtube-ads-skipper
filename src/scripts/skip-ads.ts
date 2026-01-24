enum EPlayerState {
  UNKNOWN = 0,
  PLAYING = 1,
  PAUSED = 2,
  STOPPED = 3,
}

const settings = {
  logEnabled: false,
  trySetupPlayerTimeout: 100,
  playVideoTimeout: 1000,
  enableSkipAds: true,
};

let isRunning = false;

window.addEventListener('message', (event) => {
  if (event.origin !== window.location.origin) return; // Optional: verify origin
  if (event.data.type && event.data.type === 'YT_ADS_SKIPPER_SETTINGS') {
    Object.assign(settings, event.data.settings);

    if (!isRunning && settings.enableSkipAds) {
      setupPlayer();
    }

    if (!settings.enableSkipAds) {
      cleanup();
    }
  }
});

function log(...message: any[]) {
  if (settings.logEnabled) {
    return console.log('[yt-ads-skipper]', ...message);
  }
}

function getPlayer(win: Window) {
  const elm = win.document.getElementById(
    'ytd-player'
  ) as unknown as IPlayerHostNode | null;

  return elm?.getPlayer?.();
}

const callback = () => {
  const win = window.documentPictureInPicture?.window ?? window;

  const player = getPlayer(win);

  if (!player) {
    log('Player not found');

    return;
  }
  if (
    win.document
      .getElementById('movie_player')
      ?.classList.contains('ad-showing')
  ) {
    log('Ads detected. Skip ads.');
    player.cancelPlayback!();

    setTimeout(() => {
      player.playVideo();
    }, settings.playVideoTimeout);
  }
};

const observer = new MutationObserver(callback);
const setupPlayer = () => {
  if (!settings.enableSkipAds) {
    return;
  }

  isRunning = true;

  const html5PlayerNode = document.getElementById('movie_player');

  log('Try to find html5PlayerNode');
  if (!html5PlayerNode) {
    window.setTimeout(setupPlayer, settings.trySetupPlayerTimeout);
    return;
  }

  log('Found html5PlayerNode. Setup observer.');

  // Start observing the target node for configured mutations
  observer.observe(html5PlayerNode!, {
    attributes: true,
  });

  callback();
};

const cleanup = () => {
  if (isRunning) {
    log('Cleanup observer.');
    isRunning = false;
    observer.disconnect();
  }
};
