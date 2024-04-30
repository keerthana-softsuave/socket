const express = require("express")
const router = express.Router()
const {reader, writeIntoZip, pause, empty, writer, read, wrap, push, map, testing,} = require("../controller/test")

router.get('/reader', reader)
router.get("/writeIntoZip", writeIntoZip)
router.get("/pause", pause)
router.get("/empty", empty)
router.get("/writer", writer)
router.get("/read", read)
router.get("/wrap", wrap)
router.get("/push",push)
router.get("/map", map)
router.get("/testing",testing)



module.exports= router