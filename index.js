import { program } from 'commander'
import process from 'node:process'
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import ora  from 'ora'
import handlebars from 'handlebars'
import downloade from 'download-git-repo'


const repoTempaltePath = {
    'react-javascript': 'https://github.com/huanghu0/zb-react-template.git#main', // 后面一定要加分支,否则download-git-repo下载会报错,且需要https开头
    'react-typescript': 'https://github.com/huanghu0/zb-reacte-template-ts.git#main',
    'vue3-javascript': 'https://github.com/huanghu0/zb-vue3-template.git#main',
    'vue3-typescript': 'https://github.com/huanghu0/zb-vue3-template-ts.git#main',
    'vue2': 'https://github.com/huanghu0/zb-vue2-template.git#main'
}

function getCommonOptions() {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'version',
            message: chalk.yellow('请输入项目版本号？') ,
            default: '1.0.0',
        },
        {
            type: 'input',
            name: 'author',
            message: chalk.gray('请输入项目作者？'),
            default: '',
        },
        {
            type: 'list',
            name: 'df',
            message: '请选择开发框架？',
            choices: ['react' , 'vue2' , 'vue3'],
            default: 'react'
        }
    ])
}

function getDevelopLanguage() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'dl',
            message: '请选择开发语言？',
            choices: ['javascript', 'typescript'],
            default: 'javascript'
        }
    ])
}

function isOverWrite(name) {
    return inquirer.prompt({
        type: 'list',
        name: 'isOverWrite',
        message: `当前目录已经存在${name}文件是否覆盖？`,
        choices: ['yes', 'no'],
        default: 'no'
    })
}

// 克隆文件到本地
async function cloneProject(clonePath, targetPath, handleParams) {
    const loading = ora(chalk.blue('下载中'));
    loading.color = 'blue';
    loading.spinner = {
        "interval": 80,//转轮动画每帧之间的时间间隔 
        "frames": [
            '|',
        ],
    }
    loading.start();

    await downloade(`direct:${clonePath}`, targetPath, { clone: true }, function (err) {
        loading.stop()
        if (err) {
            loading.fail(chalk.red(`项目创建失败,${err}`));
        } else {
            const jsonPath = path.resolve(targetPath, `./package.json`)
            if (fs.existsSync(jsonPath)) {
                const jsonPath = path.resolve(targetPath, `./package.json`)
                const jsonTemplate = fs.readFileSync(jsonPath, 'utf-8')
                const jsonResult = handlebars.compile(jsonTemplate)(handleParams)
                fs.writeFileSync(jsonPath, jsonResult)
                loading.succeed(chalk.green(`项目创建成功,请到./${handleParams.name}文件夹下安装依赖并启动项目`));
            }
        }
    })
}

// 创建项目
async function createProject(options) {
    const { name, version, author, df, dl } = options
    // 找到项目要创建的模板
    let type = ''
    if (dl) {
        type = repoTempaltePath[`${df}-${dl}`]
    } else {
        type = repoTempaltePath[df]
    }
    let repoClonePath = type.trim() // 找到远程代码仓库
    let targetPath = path.resolve(process.cwd(), `./${name}`)
    const jsonParams = {
        name,
        version,
        author
    }
    // console.log(repoClonePath,targetPath,'ss------------------')
    // 判断文件是否存在 是覆盖还是取消
    if (fs.existsSync(targetPath)) {
        let res = await isOverWrite(name)
        if (res.isOverWrite === 'yes') {
            await fs.emptyDir(targetPath)
            cloneProject(repoClonePath, targetPath, jsonParams)
        }
    } else {
        cloneProject(repoClonePath, targetPath, jsonParams)
    }
}


function init() {
    program.command('create <name>')
        .action(async (name) => {
            // console.log(name, 'name ----------------')
            // 获取指令参数
            try{
                let options = await getCommonOptions()
                let dloptions = {}
                if(options.df !== 'vue2'){
                    dloptions = await getDevelopLanguage()
                }
                // 创建项目
                await createProject({name,...options,...dloptions})             
            }catch(e){
                console.log(e.message)
                return
            }

        })
    program.parse(process.argv)
}

init()