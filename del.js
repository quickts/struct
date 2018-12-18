var fs = require("fs");

//获取从命令行传入的参数列表
function getParamList(val, config) {
    var valList = val.split("=");
    if (valList[0] === config) {
        return valList[1].split(",");
    } else {
        return [];
    }
}

//获取从命令行传入的参数列表（去除默认传入的两个）
var agrv = process.argv.slice(2);
if (agrv.length > 0) {
    agrv.forEach(function(val, index, array) {
        var list = getParamList(val, "--targets");
        console.log("list", list);
        list.forEach(function(ele, ind) {
            console.log(`正在清除 ${ele} 文件夹`);
            deleteTarget(ele || "./dist");
            console.log(`清除 ${ele} 文件夹成功`);
        });
    });
} else {
    //如果从命令中没有传入参数，则直接默认删除顶级目录下的dist目录。
    console.log(`正在清除 dist 文件夹`);
    deleteTarget("./dist");
    console.log(`清除 dist 文件夹成功`);
}

// 删除目标文件夹或文件
function deleteTarget(fileUrl) {
    // 如果当前url不存在，则退出
    if (!fs.existsSync(fileUrl)) return;
    // 当前文件为文件夹时
    if (fs.statSync(fileUrl).isDirectory()) {
        var files = fs.readdirSync(fileUrl);
        var len = files.length,
            removeNumber = 0;
        if (len > 0) {
            files.forEach(function(file) {
                removeNumber++;
                var stats = fs.statSync(fileUrl + "/" + file);
                var url = fileUrl + "/" + file;
                if (fs.statSync(url).isDirectory()) {
                    deleteTarget(url);
                } else {
                    fs.unlinkSync(url);
                }
            });
            if (removeNumber === len) {
                // 删除当前文件夹下的所有文件后，删除当前空文件夹（注：所有的都采用同步删除）
                fs.rmdirSync(fileUrl);
            }
        } else {
            fs.rmdirSync(fileUrl);
        }
    } else {
        // 当前文件为文件时
        fs.unlinkSync(fileUrl);
    }
}
