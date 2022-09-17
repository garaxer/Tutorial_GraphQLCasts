import { GraphQLObjectType, GraphQLID } from "graphql";
import UserType from "./user_type";

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        // If the user is null, then they are not authenticated
        return req.user;
      },
    },
  },
});

// Example query
// {
//   user {
//     email
//   }
// }
export default RootQueryType;
