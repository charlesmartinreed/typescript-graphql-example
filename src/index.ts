import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";

// RESOLVER TYPE ALIAS DEF
@Resolver()
class HelloResolver {
  // field for query, which returns...
  //   @Query(() => String, { name: "helloWorld" })
  @Query(() => String, { nullable: true, description: "Basic Hello World" })

  //   name of func is name of query by default, but we can pass an object with a name param to change what it returns
  async hello() {
    return "Hello World!";
  }
}

const main = async () => {
  // pulled from TypeGraphQL docs
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });

  // init apollo server - pass created schema
  const apolloServer = new ApolloServer({ schema });

  const app = Express();

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () =>
    console.log("Server started up on http://localhost:4000")
  );
};

main();
