'use strict'

const convert = require('xml-js');
const fs = require('fs-extra');
const moment = require('moment');
const PostParser = require('./PostParser');

const POSTS_PATH = './posts/';
const DEFAULT_OUTPUT_PATH = './docs/'
const BLOG_URL = 'https://himupsi.github.io/'

function main()
{
    let args = process.argv.slice(2);
    let outputPath = args[0] ? args[0] : DEFAULT_OUTPUT_PATH;

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
        fs.writeFileSync(outputPath + '/sitemap.xml', createSiteMapXml(BLOG_URL, posts));
    });

}

function createSiteMapXml(defaultUrl, posts)
{
    let siteMapObj, url, i;

    url = [
        {
            loc: BLOG_URL,
            changefreq: 'weekly',
            priority: 0.8,
            lastmod: moment().format('YYYY-MM-DD')
        }
    ];
    
    siteMapObj = 
    {
        _declaration:
        {
            _attributes:
            {
                version: "1.0",
                encoding: "utf-8"
            }
        },
        urlset:
        {
            _attributes:
            {
                xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
            },
            url: url
        }
    }
    for (i = 0; i < posts.length; i++)
    {
        url.push(createPostUrlObj(posts[i]))
    }

    return convert.js2xml(siteMapObj, {compact: true, ignoreComment: true, spaces: 4});
}

function createPostUrlObj(post)
{
    let urlObj, dateMoment;


    urlObj = {
        loc: BLOG_URL + 'post/' +  post.id,
        changefreq: 'monthly',
        priority: 0.5
    };

    if (post.createDate !== undefined)
    {
        dateMoment = moment(post.createDate, 'YYYYMMDDhhmm')
        urlObj.lastmod = dateMoment.format("YYYY-MM-DD") 
    }

    return urlObj;
}

main();