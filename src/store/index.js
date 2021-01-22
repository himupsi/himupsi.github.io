import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import _ from "lodash";
import Config from '@/config/Config.js'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        originPostList: [],
        filteredPostListByCategory: [],
        postList: [],
        postContentMap: {},
        category: undefined,
        categories: Config.CATEGORIES,
        categoryTags: [],
        categoryTagMap: {},
        categoriesTags: [],
        updateCnt: 0,
        orderby: undefined,
        isInitialized: false,
        lastPageNum: 1,
        maxPageNum: 1,
        error: undefined
    },
    getters: 
    {
        postContentMap: function (state) {
            return state.postContentMap;
        },
        postList: function (state) {
            let orderedPostList;

            orderedPostList = _.orderBy(state.postList, 'createDate', state.orderby !== undefined ? state.orderby.value : undefined);
            return orderedPostList.slice(0, Math.min(orderedPostList.length, state.lastPageNum * Config.PAGE_SIZE));
        },
        isInitialized: function (state) {
            return state.isInitialized;
        },
        hasNext: function (state) {
            return (state.lastPageNum < state.maxPageNum);
        },
        categories: function (state) {
            return state.categories;
        },
        categoryTags: function (state) {
            return state.categoryTags;
        },
        pageError: function (state)
        {
            return state.pageError;
        }
    },
    mutations: {
        setPostList(state, postList) {
            let i, post;

            state.originPostList = postList;
            state.maxPageNum = Math.ceil(postList.length / Config.PAGE_SIZE);
            for (i = 0; i < postList.length; i++)
            {
                post = postList[i];
                state.postContentMap[post.id] = post;
            }
        },
        setPostContent(state, postContent) {
            state.postContentMap[postContent.id] = postContent;
        },
        setCategory(state, category) {
            let i, tags, tag;

            state.category = category;
            tags = state.categoriesTags[category.value] || [];
            state.categoryTags = []
            state.categoryTagMap = {};
            for (i = 0; i < tags.length; i++)
            {
                tag = { name: tags[i] };
                setTagActive(tag, true);
                state.categoryTags.push(tag);
                state.categoryTagMap[tag.name] = tag;
            }
            state.filteredPostListByCategory = filterPostListByCategory(state.originPostList, state.category);
            state.postList = state.filteredPostListByCategory;
            state.lastPageNum = 1;
        },
        setCategoriesTags(state, categoriesTags) {
            state.categoriesTags = categoriesTags;
        },
        setIsInitialized(state, isInitailized)
        {
            state.isInitialized = isInitailized;
        },
        toggleTag(state, tag) {
            let categoryTag, variantIdx;

            categoryTag = state.categoryTagMap[tag.name];

            if (categoryTag === undefined)
                return;

            setTagActive(categoryTag, (! categoryTag.isActive));
            state.postList = filterPostListByTags(state.filteredPostListByCategory, state.categoryTagMap);
            state.lastPageNum = 1;
        },
        setOrderby(state, orderby) {
            state.orderby = orderby;
        },
        nextPage(state) {
            if (state.lastPageNum < state.maxPageNum)
                state.lastPageNum++;
        },
        selectAllTags(state)
        {
            let i;

            for (i = 0; i < state.categoryTags.length; i++)
            {
                setTagActive(state.categoryTags[i], true);
            }
            state.postList = state.filteredPostListByCategory;
            state.lastPageNum = 1;
        },
        deselectAllTags(state)
        {
            let i;

            for (i = 0; i < state.categoryTags.length; i++)
            {
                setTagActive(state.categoryTags[i], false);
            }
            state.postList = [];
            state.lastPageNum = 1;
        },
        setPageError(state, err)
        {
            state.pageError = err
        }
    },
    actions: {
        patchPostList({commit, state}) {

            axios.get(Config.POSTS_URL)
            .then(function (res)
            {
                let postsData;
            
                postsData = res.data;
                commit('setCategoriesTags', postsData.categoriesTags);
                commit('setPostList', postsData.posts);
            }, function (err)
            {
                commit('setPageError', err);
            })
            ['finally'](function ()
            {
                commit('setIsInitialized', true);
            });
        },
        setPostContent({commit}, postContent) {
            commit('setPostContent', postContent);
        },
        setCategory({commit}, category) {
            commit('setCategory', category);
        },
        setOrderby({commit}, orderby) {
            commit('setOrderby', orderby);
        },
        nextPage({commit}) {
            commit('nextPage');
        },
        toggleTag({commit}, tag) {
            if (tag === 'all')
                commit('selectAllTags');
            else
            if (tag === 'empty')
                commit('deselectAllTags');
            else
                commit('toggleTag', tag);
        }
    },
    modules: {}
});

function filterPostListByCategory(postList, category) {
    let i, filteredPostList;

    if (category === undefined || category.value === 'all')
        filteredPostList = postList;
    else
    {
        filteredPostList = [];
        for (i = 0; i < postList.length; i++)
        {
            if (postList[i].category === category.value)
                filteredPostList.push(postList[i]);
        }
    }
    return filteredPostList;
};

function filterPostListByTags(postList, tagMap) {
    let i, j, filteredPostList, tags;

    filteredPostList = [];
    for (i = 0; i < postList.length; i++)
    {
        tags = postList[i].tags;
        if (tags !== undefined)
        {
            for (j = 0; j < tags.length; j++)
            {
                if (tagMap[tags[j]] && tagMap[tags[j]].isActive)
                {
                    filteredPostList.push(postList[i])
                    break;
                }
            }
        }
    }

    return filteredPostList;
};

function setTagActive(tag, isAcitive)
{

    tag.isActive = isAcitive;
    if (isAcitive)
    {
        tag.class = 'u-tag-' + (Math.floor(Math.random() * 22) +1)
    }
    else
        tag.class = 'u-inactive-tag';
}

