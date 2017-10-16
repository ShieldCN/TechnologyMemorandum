import Vue from 'vue';
import { basePath } from './api';
export default {
    getMemorandumList(params = {}) {
        return Vue.http.get(basePath.baseUrl + 'memorandum', { params: params });
    },
    memorandumAdd(data) {
        return Vue.http.post(basePath.baseUrl + 'memorandum', data);
    },
    memorandumEdit(data) {
        return Vue.http.put(basePath.baseUrl + `memorandum/${data.id}`, data);
    },
    memorandumDelete(id) {
        return Vue.http.delete(basePath.baseUrl + `memorandum/${id}`);
    },
    getMemorandumDetails(id) {
        return Vue.http.get(basePath.baseUrl + `memorandum/${id}`);
    }
};