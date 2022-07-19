import React from "react";
import { useParams } from "react-router";
import { useQuery } from "react-apollo";
import query from "../queries/getSong";
import { Link } from "react-router-dom";
import LyricCreate from "./LyricCreate";
import LyricList from "./LyricList";

const SongDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data, refetch } = useQuery(query, {
    variables: { id },
  });
  console.log("data");
  console.log(data);
  if (loading) return <p>Loading ...</p>;

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>Song Detail {id}</h3>
      <h3>{data?.song?.title}</h3>
      <LyricList lyrics={data?.song?.lyrics} />
      <LyricCreate songId={id} />
    </div>
  );
};

export default SongDetail;
