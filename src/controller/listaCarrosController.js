import * as db from '../repository/listaCarrosRepository.js';

import { Router } from 'express';
const endpoints = Router();

endpoints.get('/listaCarros', async (req, resp) => {
    try {

    let registros = await db.consultarListaCarros();
    resp.send(registros);
    }

    catch (err) {
        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.post('/listaCarros/', async (req, resp) => {
    try {
        let pessoa = req.body;
        let id = await db.inserirListaCarros(pessoa);

        resp.send({
            novoId: id
        })
    }
    catch (err) {

        resp.status(400).send({
            erro: err.message
        })
    }
});

endpoints.put('/listaCarros/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let carros = req.body;

        let linhasAfetadas = await db.alterarListaCarros(id, carros);

        if (linhasAfetadas >= 1) {
            resp.send();
        } else {
            resp.status(400).send({
                error: 'Nenhum registro encontrado'
            });
        }
    
    } catch (err) {

        resp.status(400).send ({

            erro: err.message
        })
    }
});

endpoints.delete('/listaCarros/:id', async (req, resp) => {
    try{

        let id = req.params.id;

        let linhasAfetadas = await db.removerListaCarros(id);

        if (linhasAfetadas >= 1) {
            resp.send();
        } else {
            resp.status(400).send({
                error: 'Nenhum registro encontrado'
            });
        }
        
    }  catch (err) {
        resp.status(404).send({
            erro: err.message
        })
    }
});

export default endpoints;