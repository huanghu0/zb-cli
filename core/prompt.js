const inquirer = require('inquirer')

function getCommonOptions() {
  return inquirer.prompt([
		{
      type:'input',
			name: 'name',
			message: '项目名称？',
			default: '',
		},
		{
      type:'input',
			name: 'version',
			message: '项目版本号？',
			default: '1.0.0',
		},
    {
      type:'input',
      name:'author',
      message:'项目作者？',
      default:'',
    },
    {
      type:'list',
      name:'df',
      message:'开发框架？',
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
      message:'开发语言？',
      choices: ['javascript','typescript'],
      default:'react'
    }
	])
}

module.exports = {
  getCommonOptions:getCommonOptions,
  getDevelopLanguage:getDevelopLanguage
}