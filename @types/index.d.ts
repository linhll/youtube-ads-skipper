interface IPlayerHostNode extends Element {
  getPlayer?: () => IYoutubePlayer | null;
}

interface IYoutubePlayer {
  cancelPlayback: () => void;
  playVideo: () => void;
}
