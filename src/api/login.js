import Vue from 'vue';
import { basePath } from './api';
export default {
    login(data) {
        return Vue.http.post(basePath.baseUrl + 'login', data);
    }
};
