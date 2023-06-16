const app = require('./application/app')
const config = require('./domain/config')

const { port } = config
app.listen(port, () => {
  console.info(`⚡️[server]: Server is running at http://localhost:${port}`)
})
