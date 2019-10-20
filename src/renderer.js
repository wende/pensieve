const nunjucks = require('nunjucks');
const timing = require('./timing.js')

const fs = require('fs');
let env = new nunjucks.Environment(new nunjucks.FileSystemLoader('views'));
let writeFile = (name, content) => fs.writeFileSync(name, content)

env.addFilter("link", (context, templatePath, renderPath, displayedName) => {
    displayedName = displayedName ? displayedName : renderPath.replace(".md", "")
    let res = env.render(templatePath, context)
    writeFile(__dirname + "/../output/" + renderPath, res)
    return `[${displayedName}](./${renderPath})`
})


module.exports.render = function(name){
    return env.render(name, {})
              .split("\n")
              .map((a) => a.trimStart())
              .join("\n")
}
module.exports.addGlobal = function(name, context){
    env.addGlobal(name, context)
}