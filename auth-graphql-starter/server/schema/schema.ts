import { GraphQLSchema } from "graphql";

import RootQueryType from "./types/root_query_type";
import mutation from "./mutations";

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation,
});

export default schema;
