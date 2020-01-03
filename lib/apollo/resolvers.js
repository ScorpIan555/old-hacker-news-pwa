export const resolvers = {
  Query: {
    viewer(_parent, _args, _context, _info) {
      return { id: 1, name: "John Smith", status: "cached" };
    }
    // allPosts(_parent, _args, _context, _info) {
    //   return { id: _args.id };
    // }
  }
  // Mutation: {
  //   count($input: )
  // }
};
