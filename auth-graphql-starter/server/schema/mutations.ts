import { GraphQLObjectType, GraphQLString } from "graphql";
import UserType from "./types/user_type";
import { signup, login } from "../services/auth";

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
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout(function (err) {
          // if (err) { return next(err); }
          // res.redirect('/');
          console.log(err);
        });

        return user;
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req) {
        return login({ email, password, req });
      },
    },
  },
});

export default mutation;


// mutation {
//   signup(email: "test", password: "testP") {
//     email
//   }
// }

// mutation {
//   logout {
//     email
//   }
// }

// mutation {
//   login(email: "test", password: "testP") {
//     email
//   }
// }