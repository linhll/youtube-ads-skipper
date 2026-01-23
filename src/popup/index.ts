import './style.scss';

const enableSkipAdsInput = document.getElementById(
  'enable-skip-ads-switch'
) as HTMLInputElement;

const logEnabledInput = document.getElementById(
  'log-enabled-switch'
) as HTMLInputElement;
const store = {
  settings: {
    logEnabled: false,
    enableSkipAds: true,
  },
};

chrome.storage.local.get('settings', (result) => {
  Object.assign(store.settings, result.settings);
  logEnabledInput.checked = result.settings.logEnabled ?? false;
  enableSkipAdsInput.checked = result.settings.enableSkipAds ?? true;
});

const setSetting = (key: keyof typeof store.settings, value: any) => {
  store.settings[key] = value;
  chrome.storage.local.set({
    settings: store.settings,
  });
};

logEnabledInput.addEventListener('change', (event) => {
  setSetting('logEnabled', (event.target as HTMLInputElement).checked);
});

enableSkipAdsInput.addEventListener('change', (event) => {
  setSetting('enableSkipAds', (event.target as HTMLInputElement).checked);
});
