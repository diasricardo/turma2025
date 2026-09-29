import { apiFetch, API_URL } from './api';

export const subCategoriaServico = {
    getAll: async() => {
        return await apiFetch(API_URL, './subcategorias');
    },
    create: async(data) =>{
        return await apiFetch(API_URL, '/subcategorias', 'POST', data)
    },
    update: async(id, data) =>{
        return await apiFetch(API_URL, `/subcategorias/${id}`, 'PUT',data);
    },
    delete: async(id) =>{
        return await apiFetch(API_URL, `/subcategorias/${id}`, 'DELETE')
    }
}