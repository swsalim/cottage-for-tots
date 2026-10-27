import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const next = require('eslint-config-next')

const config = [
  ...next,
  {
    ignores: ['.contentlayer/**', 'public/**'],
  },
]

export default config
