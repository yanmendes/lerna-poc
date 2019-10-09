function errorLogger () {
  return {
    willSendResponse (o) {
      const {
        context,
        graphqlResponse: { errors }
      } = o
      if (errors) {
        const log = context.req.log
        errors.forEach(err => {
          const original = err.originalError || err
          const level = original.name === 'UserInputError' ? 'warn' : 'error'
          const message = `${original.name}: ${original.message}`
          log
            .child({
              category: 'apollo_error',
              action: err.path && err.path[0],
              error: original.stack || message
            })
            [level](message)
        })
      }
      return o
    }
  }
}

export default [errorLogger]
