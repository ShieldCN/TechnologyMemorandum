import Vue from 'vue';
import {basePath} from './api';
export default {
    getCategoryList(params={}) {
        return Vue.http.get(basePath.baseUrl + 'categoryList',{params:params});
    },
    categoryDelete(id) {
        console.log('delete')
        console.log(Vue.http)
        return Vue.http.delete(basePath.baseUrl + 'category/delete/'+'id');
    }
};
