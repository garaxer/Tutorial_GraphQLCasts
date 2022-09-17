import { GraphQLObjectType, GraphQLString } from "graphql";
import UserType from "./types/user_type";
import { signup } from "../services/auth";

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req) {
        return signup({ email, password, req });
      },
    },
  },
});

export default mutation;
