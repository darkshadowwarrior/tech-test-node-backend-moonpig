import { app } from './handlers/server'

const PORT = 7000

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}…`)
})
