const express = require('express')
const app = express()
const port = 3000

app.get('/page', (request, response) => {
  const cypress = require('cypress')
  const pageId = request.query.id;

  cypress.open({
    project: pageId
  });
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
