import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql } from "graphql-tag";
import { useMutation } from "react-apollo";
import query from "../queries/fetchSongs";

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

const SongCreate: React.FC = () => {
  const [input, setInput] = useState<string | undefined>("");
  const navigate = useNavigate();
  const [mutate, { data, loading, error }] = useMutation(mutation);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    event.preventDefault();
    mutate({ variables: { title: input }, refetchQueries: [{ query }] }).then(
      () => {
        navigate("/songs");
      }
    );
  };

  return (
    <div>
      <div>Create a new song</div>
      <form onSubmit={handleSubmit}>
        <label>Song title</label>
        <input onChange={(e) => setInput(e.target.value)} value={input} />
        <button type="submit" onSubmit={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
};

export default SongCreate;
