import React from "react";
import { useQuery } from "react-apollo";
import query from "../queries/fetchSongs";
import { gql } from "graphql-tag";
import { useMutation } from "react-apollo";
import { Link } from "react-router-dom";
const deleteMutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;
const likeMutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

const LyricList = ({
  lyrics,
}: {
  lyrics: { id: string; content: string; likes: number }[];
}) => {
  const [deleteM] = useMutation(deleteMutation);
  const [likeM] = useMutation(likeMutation);

  const deleteSong = (id: string) => () => {
    deleteM({ variables: { id: id } }).then();
  };
  const onLike = (id: string, likes: number) => {
    likeM({
      variables: { id: id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id: id,
          __typename: "LyricType",
          likes: likes + 1,
        },
      },
    }).then();
  };
  return (
    <ul>
      Lyrics
      {lyrics.map(({ content, id, likes }) => (
        <li key={id}>
          <Link to={`${id || ""}`}> {content}</Link>
          <h3>
            <span onClick={() => onLike(id, likes)}>👍</span> likes: {likes}
          </h3>
        </li>
      ))}
    </ul>
  );
};

export default LyricList;
