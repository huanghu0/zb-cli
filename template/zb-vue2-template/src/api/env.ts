let baseUrl = "";
const url = window.location.href;
/*----------------------------dev（本机环境）---------------------------------*/
if (url.indexOf("localhost") > -1) {
  console.log("目前运行环境为---dev");
  baseUrl = "localhost"; //
}

export { baseUrl };
