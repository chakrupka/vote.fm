import { Table, Image, Typography, Row, Col } from "antd";
import PropTypes from "prop-types";

const { Title, Text } = Typography;

function Queue({ playlistData, votes }) {
  const columns = [
    {
      title: "Rank",
      key: "rank",
      render: (text, record, index) => index + 1,
      width: 1,
      align: "center",
    },
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
      width: 1,
      align: "center",
    },
    {
      title: "Artist",
      dataIndex: ["track", "album", "artists"],
      key: "artist",
      render: (artists) =>
        artists.map(
          (artist, index) =>
            `${artist.name}${index !== artists.length - 1 ? ", " : ""}`
        ),
      width: 120,
    },
    {
      title: "Track Name",
      dataIndex: ["track", "name"],
      key: "name",
    },
    {
      title: "Votes",
      dataIndex: "voteCount",
      key: "voteCount",
      sorter: (a, b) => b.voteCount - a.voteCount,
      defaultSortOrder: "ascend",
      align: "center",
    },
  ];

  const dataWithVotes = playlistData.tracks.items
    .map((item, index) => ({
      ...item,
      voteCount: votes[index] || 0,
    }))
    .filter((item) => item.voteCount > 0)
    .sort((a, b) => b.voteCount - a.voteCount);

  const topTrack = dataWithVotes[0];

  const UpNextHeader = () => (
    <Row justify="center" style={{ marginBottom: 20, marginTop: 70 }}>
      {topTrack ? (
        <Col>
          <Row gutter={[16, 16]} align="middle">
            <Col>
              <Title level={4} style={{ margin: 0 }}>
                Up Next:
              </Title>
            </Col>
            <Col>
              <Image
                src={topTrack.track.album.images[0].url}
                width={75}
                height={75}
                alt={`Album cover for ${topTrack.track.name}`}
                preview={false}
              />
            </Col>
            <Col>
              <Text strong>{topTrack.track.name}</Text>
              <br />
              <Text type="secondary">
                {topTrack.track.artists.map((artist) => artist.name).join(", ")}
              </Text>
            </Col>
          </Row>
        </Col>
      ) : (
        <Col>
          <Title level={4}>No tracks with votes</Title>
        </Col>
      )}
    </Row>
  );

  return (
    <>
      <UpNextHeader />
      <Table
        columns={columns}
        dataSource={dataWithVotes}
        rowKey={(record, index) => index}
        size="small"
        pagination={false}
      />
    </>
  );
}

Queue.propTypes = {
  playlistData: PropTypes.shape({
    tracks: PropTypes.shape({
      items: PropTypes.array,
    }),
  }),
  votes: PropTypes.objectOf(PropTypes.number),
};

export default Queue;
