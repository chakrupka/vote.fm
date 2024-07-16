import { Tabs } from "antd";
import Playlist from "./Playlist";
import PropTypes from "prop-types";
import Queue from "./Queue";

const TabBar = ({ playlistData, votes, setVotes }) => {
  const items = [
    {
      key: "1",
      label: "Playlist",
      children: (
        <Playlist
          playlistData={playlistData}
          votes={votes}
          setVotes={setVotes}
        />
      ),
    },
    {
      key: "2",
      label: "Queue",
      children: (
        <Queue playlistData={playlistData} votes={votes} setVotes={setVotes} />
      ),
    },
  ];

  return (
    <Tabs
      size="large"
      centered
      defaultActiveKey="1"
      items={items}
      tabBarStyle={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "white",
        margin: 0,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
      }}
    ></Tabs>
  );
};

TabBar.propTypes = {
  playlistData: PropTypes.shape({
    tracks: PropTypes.shape({
      items: PropTypes.array,
    }),
  }),
  votes: PropTypes.object,
  setVotes: PropTypes.func.isRequired,
};

export default TabBar;
