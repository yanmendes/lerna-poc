export const port = process.env.PORT || '3050'

if (process.env.NODE_ENV === 'test') {
  process.env.MONGO_URI =
    'mongodb://localhost/health_gql_mongo_api_template_test'
}

export const mongoUri =
  process.env.MONGO_URI || 'mongodb://localhost/health_gql_mongo_api_template'
