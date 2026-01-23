function sendSettingsToMainWorld(settings: any) {
  window.postMessage({ type: 'YT_ADS_SKIPPER_SETTINGS', settings }, '*');
}

chrome.storage.local.get('settings', (result) => {
  sendSettingsToMainWorld(result.settings);
});

chrome.storage.onChanged.addListener(
  (changes: {
    [key: string]: {
      newValue: any;
    };
  }) => {
    if (!changes.settings?.newValue) {
      return;
    }

    sendSettingsToMainWorld(changes.settings.newValue);
  }
);
