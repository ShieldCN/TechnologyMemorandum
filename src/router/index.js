import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import test from '@/views/test'
import categoryList from '@/views/configs/category/category-list'
import memorandumList from '@/views/memorandum/memorandum-list'
import memorandumDetails from '@/views/memorandum/memorandum-details'

Vue.use(Router)

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/category',
            name: 'categoryList',
            component: categoryList,
            meta:{title:"分类列表"}
        },
        {
            path: '/memorandum',
            name: 'memorandumList',
            component: memorandumList,
            meta:{title:"记录列表"}
        },
        {
            path: '/memorandum/add',
            name: 'memorandumAdd',
            component: memorandumDetails,
            meta:{title:"添加记录"}
        },
        {
            path: '/memorandum/:id',
            name: 'memorandumEdit',
            component: memorandumDetails,
            meta:{title:"修改记录"}
        },
        {
            path: '/test',
            name: 'test',
            component: test,
            meta:{title:"测试"}
        }
    ]
})
