const express = require('express')
const app = express()
const port = 5000
const connectToMongo = require("./db")
const cors = require('cors')

connectToMongo()

app.use(cors())
app.use(express.json())
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

app.listen(port, () => {
  console.log(`iNotebook running on http://localhost:${port}`)
})
