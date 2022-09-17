import { gql } from "graphql-tag";

const query = gql`
  {
    user {
      id
      email
    }
  }
`;

export default query;
