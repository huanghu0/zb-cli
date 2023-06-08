const { program } = require('commander')
const { getCommonOptions,getDevelopLanguage } = require('./prompt')
const { createProject } = require('./create')

// 执行命令create name 创建项目
function action() {
  program
    .command('create <name> [other...]')
    .action( async(name,other) => {
      // 获取指令参数
      let options = await getCommonOptions()
      let dloptions = {}
      if(options.df !== 'vue2'){
        dloptions = await getDevelopLanguage()
      }
      // 创建项目
      await createProject({name,...options,...dloptions}) 
    })
  program.parse(process.argv)
}

module.exports = {
  action:action
}