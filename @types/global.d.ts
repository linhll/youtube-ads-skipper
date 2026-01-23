interface DocumentPictureInPicture {
  window: Window | null;
}

interface Window {
  documentPictureInPicture?: DocumentPictureInPicture;
}
