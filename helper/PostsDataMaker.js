'use strict'

const fs = require('fs-extra');
const moment = require('moment');
const PostParser = require('./PostParser');

const POSTS_PATH = './posts/';
const DEFAULT_OUTPUT_PATH = './docs/'

function main()
{
    let args = process.argv.slice(2);
    let outputPath = args[0] ? args[0] : DEFAULT_OUTPUT_PATH

    fs.readdir(POSTS_PATH, function (err, fileNames)
    {
        let i, j, post, posts, categoryTags, tag, tags, fileBuff, output;

        output = {};
        posts = [];
        categoryTags = {};
        tags = [];
        for (i = 0; i < fileNames.length; i++)
        {
            if (fileNames[i] === 'images')
                continue;
            try
            {
                fileBuff = fs.readFileSync(POSTS_PATH + fileNames[i])
                post = PostParser.parse(fileNames[i], fileBuff.toString())
                if (post !== undefined)
                {
                    posts.push(post);
                    if (categoryTags[post.category] === undefined)
                        categoryTags[post.category] = []
                    post.tags = post.tags || [];
                    for (j = 0; j < post.tags.length; j++)
                    {
                        tag = post.tags[j];
                        if (tags.indexOf(tag) === -1)
                            tags.push(tag);
                        if (categoryTags[post.category].indexOf(tag) === -1)
                            categoryTags[post.category].push(tag);
                    }
                }
            }
            catch(e)
            {
                console.log(fileNames[i] + ':', e)
            }
        }
        output.createDat = moment().format('YYYYMMDDhhmm');
        output.categoriesTags = categoryTags;
        output.categoriesTags['all'] = tags;
        output.posts = posts;
        fs.writeFileSync(outputPath + '/posts.json', JSON.stringify(output, null, '\t'));
    });

}

main();