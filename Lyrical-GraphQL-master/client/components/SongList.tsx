import React from "react";
import { gql } from "graphql-tag";
import { useQuery } from "react-apollo";

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

const SongList = () => {
  const { loading, error, data } = useQuery(query);
  console.log(data);

  if (loading) return <p>Loading ...</p>;

  return (
    <ul>
      {data.songs.map(({ title }) => (
        <li key={title}>{title}</li>
      ))}
    </ul>
  );
};

export default SongList;
