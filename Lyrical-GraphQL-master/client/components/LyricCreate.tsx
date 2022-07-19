import { gql } from "graphql-tag";
import React, { useState } from "react";
import { useMutation } from "react-apollo";

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        content
      }
    }
  }
`;

const LyricCreate = ({ songId }: { songId: string }) => {
  const [content, setContent] = useState("");
  const [mutate, { data, loading, error }] = useMutation(mutation);

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setContent("Loadings");
    mutate({ variables: { content, songId } }).then(() => setContent(""));
  };
  return (
    <form onSubmit={onSubmit}>
      <label>Add a lyric</label>
      <input value={content} onChange={(e) => setContent(e.target.value)} />
    </form>
  );
};

export default LyricCreate;
