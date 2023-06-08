const chalk = require('chalk')
const fs = require('fs-extra')
const path = require('path')
const handlebars = require('handlebars')
const { tempaltePath } = require('./config')
const { isOverWrite } = require('./prompt')

// 克隆文件到本地
async function cloneProject(clonePath,targetPath,handleParams){
  await fs.copy(clonePath,targetPath)
  const jsonPath = path.resolve(targetPath,`./package.json`)
  if(fs.existsSync(jsonPath)){
    const jsonPath = path.resolve(targetPath,`./package.json`)
    const jsonTemplate = fs.readFileSync(jsonPath,'utf-8')
    const jsonResult = handlebars.compile(jsonTemplate)(handleParams)
    fs.writeFileSync(jsonPath, jsonResult)
  }
  console.log(chalk.green(`项目创建成功,请到./${handleParams.name}文件夹下安装依赖并启动项目`))
}

// 创建项目
async function createProject(options){
  const { name,version,author,df,dl } = options
  // 找到项目要创建的模板
  let type = ''
  if(dl){
    type = tempaltePath[`${df}-${dl}`]
  }else{
    type = tempaltePath[df]
  }
  // 找到模板文件所在位置 已经要copy那个位置
  let clonePath = path.resolve(__dirname,`../template/${type}`)
  let targetPath = path.resolve(process.cwd(),`./${name}`) 
  const jsonParams = {
    name,
    version,
    author
  }  
  // 判断文件是否存在 是覆盖还是取消
  if(fs.existsSync(targetPath)){
    let res = await isOverWrite(name)
    if(res.isOverWrite === 'yes'){
      await fs.emptyDir(targetPath)
      cloneProject(clonePath,targetPath,jsonParams)
    }
  }else{
    cloneProject(clonePath,targetPath,jsonParams)
  }
}

module.exports = {
  createProject:createProject
}