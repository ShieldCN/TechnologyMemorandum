import Vue from 'vue';
import { basePath } from './api';
export default {
    getUserList(params = {}) {
        return Vue.http.get(basePath.baseUrl + 'user', { params: params });
    },
    userAdd(data) {
        return Vue.http.post(basePath.baseUrl + 'user', data);
    },
    userEdit(data) {
        return Vue.http.put(basePath.baseUrl + `user/${data.id}`, data);
    },
    userDelete(id) {
        return Vue.http.delete(basePath.baseUrl + `user/${id}`);
    }
};
