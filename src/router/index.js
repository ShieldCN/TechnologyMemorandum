import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import test from '@/pages/test'

Vue.use(Router)

export default new Router({
	mode:'history',
    routes: [{
        path: '/',
        name: 'home',
        component: test
    },
    {
        path: '/hello',
        name: 'hello',
        component: Hello
    }
    ]
})
