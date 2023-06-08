const inquirer = require('inquirer')

function getCommonOptions() {
  return inquirer.prompt([
		{
      type:'input',
			name: 'version',
			message: '请输入项目版本号？',
			default: '1.0.0',
		},
    {
      type:'input',
      name:'author',
      message:'请输入项目作者？',
      default:'',
    },
    {
      type:'list',
      name:'df',
      message:'请选择开发框架？',
      choices: ['react','vue2','vue3'],
      default:'react'
    }
	])
}

function getDevelopLanguage(){
  return inquirer.prompt([
    {
      type:'list',
      name:'dl',
      message:'请选择开发语言？',
      choices: ['javascript','typescript'],
      default:'javascript'
    }
	])
}

function isOverWrite(name){
  return inquirer.prompt({
    type:'list',
    name:'isOverWrite',
    message: `当前目录已经存在${name}文件是否覆盖？`,
    choices: ['yes','no'],
    default:'no'
  })
}

module.exports = {
  getCommonOptions:getCommonOptions,
  getDevelopLanguage:getDevelopLanguage,
  isOverWrite:isOverWrite
}