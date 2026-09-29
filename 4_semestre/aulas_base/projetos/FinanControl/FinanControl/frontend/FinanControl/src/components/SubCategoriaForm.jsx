import { useState } from "react";

export default function SubCategoriaForm({onSubmit, initialData = null, onCancel, categories  =[]}){
    const defaultCategoryId = categories.length > 0 ? (categories[0].id_categoria || categories[0].id) : '';
    const [nome, setNome] = useState(initialData?.nome || '');
    const [idCategoria, setIdCategoria] = useState(initialData?.id_categoria || initialData?.id_categoria.pai || defaultCategoryId);

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectCategory = idCategoria || defaultCategoryId;
        if(!nome.trim() || !selectCategory) return;

        onSubmit({
            nome,
            id_categoria: Number(selectCategory),
        })

        if(!initialData){
            setNome('');
        }
    }
}