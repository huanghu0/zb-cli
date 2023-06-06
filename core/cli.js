const { getCommonOptions,getDevelopLanguage } = require('./prompt')
const { program } = require('commander')
// program
//   .action(async () => {
//     let options = await getOptions()
//     let dlOptions = {}
//     if(options.df !== 'vue2'){
//       dlOptions = await getDevelopLanguage();
//     }
    
//   }).parse(process.argv)



async function getOptions() {
  let options = await getCommonOptions()
  let dloptions = {}
  if(options.fd !== 'vue2'){
    dloptions = await getDevelopLanguage()
  }
  return {...options,...dloptions}
}

async function cli() {
  let options = await getOptions();
  console.log(options,'options')
  // return options 
}

module.exports = {
  cli:cli
}