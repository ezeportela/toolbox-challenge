const express = require('express')
const AppController = require('./controller')

const router = express.Router()

const controller = new AppController()
router.get('/healthcheck', controller.healtcheck)
router.get('/files/data', controller.getFilesContent.bind(controller))

module.exports = router
