export default {
  Query: {
    stuff: (_, __, { dataSources: { stuff } }) => stuff.get()
  },
  Mutation: {
    createStuff: (_, { stuff }, { dataSources }) => dataSources.stuff.create(stuff)
  }
}
