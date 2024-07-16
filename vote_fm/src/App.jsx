import axios from "axios";
import { useEffect, useState } from "react";
import TabBar from "./components/TabBar";

const App = () => {
  const [playlistData, setPlaylistData] = useState(null);
  const [votes, setVotes] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const loadToken = await axios.post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_secret: `${import.meta.env.VITE_CLIENT_SECRET}`,
          client_id: import.meta.env.VITE_CLIENT_ID,
        }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      const loadPlaylist = await axios.get(
        `https://api.spotify.com/v1/users/${
          import.meta.env.VITE_SPOTIFY_USER_ID
        }/playlists/${import.meta.env.VITE_SPOTIFY_PLAYLIST_ID}`,
        { headers: { Authorization: `Bearer ${loadToken.data.access_token}` } }
      );
      setPlaylistData(loadPlaylist.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {playlistData && (
        <TabBar playlistData={playlistData} votes={votes} setVotes={setVotes} />
      )}
    </div>
  );
};

export default App;
