const YAML = require('yamljs');

exports.parse = function (fileName, fileStr)
{
    let yamlStr, postObj, idx, postid;
    
    if (! fileName.includes('.md'))
    {
        console.error(fileName + ' is skipped');
        return;
    }
    idx = fileStr.indexOf('-----');
    fileStr = fileStr.replace('-----', '');
    idx = fileStr.indexOf('-----');
    if (idx === -1)
    {
        console.error(fileName + ': \'-----\' is required');
        return;
    }
    yamlStr = fileStr.slice(0, idx);
    postid = fileName.replace(/.md$/, '');
    yamlStr = fileStr.slice(0, idx);
    postObj = YAML.parse(yamlStr);
    
    postObj.id = postid;
    postObj.name = fileName;
    postObj.md = fileStr.substring(idx + 5).trim();

    return postObj;
}