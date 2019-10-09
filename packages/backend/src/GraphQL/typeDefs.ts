import { gql } from 'apollo-server-express'

export default gql`
  type Mutation {
    createStuff(stuff: StuffInput!): Stuff
  }

  type Query {
    stuff: [Stuff]
  }

  # Types

  type Stuff {
    name: String
    type: StuffType
  }

  # Inputs

  input StuffInput {
    name: String
    type: StuffType
  }

  # Enums

  enum StuffType {
    regular_stuffy
    extra_stuffy
  }
`
