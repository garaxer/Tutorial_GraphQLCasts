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

const LyricList = ({
  lyrics,
}: {
  lyrics: { id: string; content: string }[];
}) => {

  const [mutate] = useMutation(mutation);


  const deleteSong = (id: string) => () => {
    mutate({ variables: { id: id } }).then( );
  };
  return (
    <ul>
      Lyrics
      {lyrics.map(({ content, id }) => (
        <li key={id}>
          <Link to={`${id || ""}`}> {content}</Link>
        </li>
      ))}
    </ul>
  );
};

export default LyricList;
