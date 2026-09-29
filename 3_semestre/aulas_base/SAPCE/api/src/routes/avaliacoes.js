import { Router } from "express";
import { BD } from "../../db.js";


const router = Router();

router.post('/avaliacoes', async (req, res) => {
    const { aluno_id, unidade_curricular_id, itens } = req.body;

    try {
        // LÓGICA DA PLANILHA SENAI
        const falhouEmCritico = itens.some(item => item.tipo_criterio === 'C' && !item.atingiu);
        let notaFinal = 0.00;

        if (falhouEmCritico) {
            notaFinal = 50.00; // Retenção automática
        } else {
            const desejaveis = itens.filter(item => item.tipo_criterio === 'D');
            const totalD = desejaveis.length;
            const atingidosD = desejaveis.filter(item => item.atingiu).length;

            if (totalD === 0) {
                notaFinal = 100.00;
            } else {
                // Proporções dinâmicas baseadas na sua regra
                const perc = atingidosD / totalD;
                if (perc === 1) notaFinal = 100.00;
                else if (perc >= 0.75) notaFinal = 90.00;
                else if (perc >= 0.41) notaFinal = 80.00;
                else if (perc >= 0.25) notaFinal = 70.00;
                else notaFinal = 60.00;
            }
        }

        // SALVAR AVALIAÇÃO PRINCIPAL
        const queryAvaliacao = `
            INSERT INTO avaliacoes_alunos (aluno_id, unidade_curricular_id, nota_final)
            VALUES ($1, $2, $3)
            ON CONFLICT (aluno_id, unidade_curricular_id) 
            DO UPDATE SET nota_final = EXCLUDED.nota_final, data_avaliacao = CURRENT_DATE
            RETURNING id;
        `;
        const resAvaliacao = await BD.query(queryAvaliacao, [aluno_id, unidade_curricular_id, notaFinal]);
        const avaliacaoId = resAvaliacao.rows[0].id;

        // SALVAR CADA ITEM (CHECKBOX) MARCADO
        const queryItem = `
            INSERT INTO itens_avaliacao (avaliacao_aluno_id, criterio_id, atingiu, observacao)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (avaliacao_aluno_id, criterio_id) DO UPDATE SET atingiu = EXCLUDED.atingiu;
        `;
        for (const item of itens) {
            await BD.query(queryItem, [avaliacaoId, item.criterio_id, item.atingiu, item.observacao || null]);
        }

        return res.status(201).json({ message: "Avaliação salva!", nota_calculada: notaFinal });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;