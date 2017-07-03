import Vue from 'vue';
import { basePath } from './api';
export default {
    getCategoryList(params = {}) {
        return Vue.http.get(basePath.baseUrl + 'category', { params: params });
    },
    categoryAdd(data) {
        return Vue.http.post(basePath.baseUrl + 'category', data);
    },
    categoryEdit(data) {
        return Vue.http.put(basePath.baseUrl + `category/${data.id}`, data);
    },
    categoryDelete(id) {
        return Vue.http.delete(basePath.baseUrl + `category/${id}`);
    }
};
