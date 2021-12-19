import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-top-read",

  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",

  "user-read-recently-played",
  "user-follow-modify",

  "user-follow-read",
  "user-read-private",
  "user-library-modify",
  "user-library-read",
  "user-read-playback-position",
  "playlist-modify-private",
  "app-remote-control",
  "playlist-modify-public",
].join(",");

const params = {
  scope: scopes,
};

const queryParamsString = new URLSearchParams(params);

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamsString.toString()}`;

const spotifyApi = new SpotifyWebApi({
  clintId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export { LOGIN_URL };
export default spotifyApi;
