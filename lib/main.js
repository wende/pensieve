const humanize = t => require('humanize-duration')(t, {
  units: ['h', 'm', 's']
});

const fs = require('fs');

const fsExtra = require('fs-extra');

const timing = require('./timing.js');

const renderer = require('./renderer.js');

const path = require('path');

const writeFile = (name, content) => fs.writeFileSync(name, content);

const ensureDirExists = filePath => {
  let dirname = path.dirname(filePath);

  if (fs.existsSync(dirname)) {
    return true;
  }

  ensureDirExists(dirname);
  fs.mkdirSync(dirname);
};

const context = require('../data/projects.json');

const routing = require('../data/routing.json');

const PREFIX = __dirname + "/../";
fsExtra.emptyDir(PREFIX + "output");
timing.getTimeseries().then(timeseries => {
  for (let path in routing) {
    ensureDirExists(PREFIX + "output/" + path);
    let res = renderer.render(PREFIX + routing[path], {
      context,
      timeseries
    });
    writeFile(PREFIX + "output/" + path, res);
  }
});