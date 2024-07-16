import { Table, Button, Image } from "antd";
import PropTypes from "prop-types";

function Playlist({ playlistData, setVotes }) {
  const columns = [
    {
      title: "Album",
      dataIndex: ["track", "album", "images"],
      key: "albumCover",
      render: (images, record) => (
        <Image
          src={images[2].url}
          width={32}
          height={32}
          alt={`Album cover image for ${record.track.name}`}
          preview={false}
        />
      ),
      align: "right",
    },
    {
      title: "Artist",
      dataIndex: ["track", "album", "artists"],
      key: "artist",
      render: (artists) =>
        artists.map(
          (artist, index) =>
            `${artist.name}${index !== artists.length - 1 ? "," : ""}`
        ),
      width: 1,
    },
    {
      title: "Track Name",
      dataIndex: ["track", "name"],
      key: "name",
    },
    {
      title: "Vote",
      fixed: "right",
      key: "vote",
      render: (_, record, index) => (
        <Button
          onClick={() => {
            setVotes((prevCounts) => ({
              ...prevCounts,
              [index]: (prevCounts[index] || 0) + 1,
            }));
          }}
        >
          Vote
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={playlistData.tracks.items}
      rowKey={(record, index) => index}
      size="small"
      pagination={false}
      style={{ marginTop: 50 }}
    />
  );
}

Playlist.propTypes = {
  playlistData: PropTypes.shape({
    tracks: PropTypes.shape({
      items: PropTypes.array,
    }),
  }),
  setVotes: PropTypes.func.isRequired,
};

export default Playlist;
