const destination = process.env.NODE_ENV === 'test'
  ? require('fs').createWriteStream('/dev/null')
  : process.stdout

const prettyPrint = process.env.NODE_ENV === 'production'
  ? false
  : { levelFirst: true, colorize: true, translateTime: true }

export default require('pino')({
  prettyPrint,
  useLevelLabels: true
}, destination)

export const categories = {
  DATABASE_ERROR: 'Database Error',
  INVALID_QUOTE: 'invalid_quote'
}
