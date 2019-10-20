const url = require('url');

const add = (arr, key, val) => arr[key] = arr[key] ? arr[key] + val : val
let memo = {}

let projectTimes = module.exports.projectTimes = {}
module.exports.addTime = (entry) => entry.project ? add(projectTimes, entry.project, entry.duration) : nil

let favWebsites = module.exports.favWebsites = {}
module.exports.addFav = (entry) => {
    if(entry.path && entry.path.indexOf("http") != -1) {
        add(favWebsites, url.parse(entry.path).host, entry.duration)
    }
}