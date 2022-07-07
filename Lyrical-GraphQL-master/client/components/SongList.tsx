import React from "react";
import { useQuery } from "react-apollo";
import query from "../queries/fetchSongs";
import { gql } from "graphql-tag";
import { useMutation } from "react-apollo";
import { Link } from "react-router-dom";

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

const SongList = () => {
  const { loading, error, data, refetch } = useQuery(query);
  const [mutate] = useMutation(mutation);

  console.log(data);

  if (loading) return <p>Loading ...</p>;
  const deleteSong = (id: string) => () => {
    mutate({ variables: { id: id } }).then(() => refetch());
  };
  return (
    <ul>
      :
      {data.songs.map(({ title, id }) => (
        <li key={id}>
          <Link to={`${id || ""}`}> {title}</Link>
          <button onClick={deleteSong(id)}>X</button>
        </li>
      ))}
    </ul>
  );
};

export default SongList;
