const fs = require('fs');
const zlib = require('zlib');
const { parser } = require('stream-json');
const { streamValues } = require('stream-json/streamers/StreamValues');
const Chain = require('stream-chain');
const toArray = require('stream-to-array');

Array.prototype.flatten = (xs) => [].concat.apply([], this)

const reducers = require('./reducers.js')

const TIMING_FOLDER = "data/timing/"

module.exports.projectTimes = reducers.projectTimes;
module.exports.favWebsites = reducers.favWebsites

type Timeseries = {
    project: string,
    duration: number,
    path: string
}

module.exports.getTimeseries = (cb) : Promise<[Timeseries]>  => {
    let allFiles = fs.readdirSync(TIMING_FOLDER).filter((name) => {
        return name.endsWith(".gz")
    }).map((sourceFile) => {
        const pipeline = Chain.chain([
            fs.createReadStream(TIMING_FOLDER + sourceFile),
            zlib.createGunzip(),
            parser(),
            streamValues()]
        )
        return toArray(pipeline).then((arr) => arr.flatten())
    })
    return Promise.all(allFiles)
}
