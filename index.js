const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

app.use(express.json());
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'senaibattle',
    password: 'ds564',
    port: 7007,
});
app.get('/lutadoressenai', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM lutadoressenai ');
        res.json({
            total: result.rowCount,
            lutadores: result.rows
        })
    } catch (error) {
        console.error('Erro ao buscar os lutadores');
        res.status(500).send({ message: 'Erro ao buscar os lutadores' });
    }
});
app.get('/lutadoressenai/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM lutadoressenai WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status(404).send({ mensagem: 'Usuário não encontrado' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Erro ao obter lutador por ID:', error);
        res.status(500).send('Erro ao obter lutador por ID');
    }
});
app.get('/lutadoressenai/letra/:letra', async (req, res) => {
    try {
        const { letra } = req.params;
        const result = await pool.query('SELECT * FROM lutadoressenai WHERE nome ILIKE $1', [letra + '%']);
        res.json({
            total: result.rowCount,
            lutadores: result.rows
        });
    } catch (error) {
        console.error('Erro ao buscar os lutadores por letra', error);
        res.status(500).send('Erro ao buscar os lutadores por letra');
    }
}); 
app.post('/lutadoressenai', async (req, res) => {
    try {
        const {nome,classe,vida,ataque,defesa,velocidade} = req.body;
        await pool.query('INSERT INTO lutadoressenai (nome,classe,vida,ataque,defesa,velocidade) VALUES ($1,$2,$3,$4,$5,$6)', [nome,classe,vida,ataque,defesa,velocidade]);
        res.status(201).send('Lutador criado com sucesso');
    } catch (error) {
        console.error('Erro ao criar um novo lutador', error);
        res.status(500).send('Erro ao criar um novo lutador');
    }
});
app.put('/lutadoressenai/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome,classe,vida,ataque,defesa,velocidade } = req.body;
        await pool.query('UPDATE lutadoressenai SET nome = $1,classe = $2,vida = $3,ataque = $4,defesa = $5,velocidade = $6 WHERE id = $7', [nome,classe,vida,ataque,defesa,velocidade, id]);
        res.send('Lutador atualizado com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar um lutador', error);
        res.status(500).send('Erro ao atualizar um lutador');
    }
});
app.delete('/lutadoressenai/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM lutadoressenai WHERE id = $1', [id]);
        res.status(200).send({ message: 'Lutador removido com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar usuário');
        res.status(500).send({ message: 'Erro ao deletar usuário' });
    }
});
app.get('/lutadoressenai/classe/:classe', async (req, res) => {
    try {
        const { classe } = req.params;
        const result = await pool.query('SELECT * FROM lutadoressenai WHERE classe = $1', [classe]);
        res.json({
            total: result.rowCount,
            lutadores: result.rows
        });
    } catch (error) {
        console.error('Erro ao buscar os lutadores por classe. [Programador, Mecanico, Eletricista, Administrador, Excelers]', error);
        res.status(500).send('Erro ao buscar os lutadores por classe');
    }
});
app.get('/tipoDoCampo' , async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tipodocampo');
        res.json({
            total: result.rowCount,
            tipodocampo: result.rows
        });
    } catch (error) {
        console.error('Erro ao buscar os tipos de campo');
        res.status(500).send('Erro ao buscar os tipos de campo');
    }
});
app.get('/tipoDoCampo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM tipodocampo WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            res.status(404).send({ mensagem: 'Tipo de campo não encontrado' });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error('Erro ao obter tipo de campo por ID:', error);
        res.status(500).send('Erro ao obter tipo de campo por ID');
    }
});
app.post('/tipoDoCampo', async (req, res) => {
    try {
        const {campoNome, campoTipo} = req.body;
        await pool.query('INSERT INTO tipodocampo (campoNome, campoTipo) VALUES ($1, $2)', [campoNome, campoTipo]);
        res.status(201).send('Tipo de campo criado com sucesso');
    } catch (error) {
        console.error('Erro ao criar um novo tipo de campo', error);
        res.status(500).send('Erro ao criar um novo tipo de campo');
    }
});
app.put('/tipoDoCampo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { campoNome, campoTipo } = req.body;
        await pool.query('UPDATE tipodocampo SET campoNome = $1, campoTipo = $2 WHERE id = $3', [campoNome, campoTipo, id]);
        res.send('Tipo de campo atualizado com sucesso');
    } catch (error) {
        console.error('Erro ao atualizar um tipo de campo', error);
        res.status(500).send('Erro ao atualizar um tipo de campo');
    }
});
app.delete('/tipoDoCampo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM tipodocampo WHERE id = $1', [id]);
        res.status(200).send({ message: 'Tipo de campo removido com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar tipo de campo');
        res.status(500).send({ message: 'Erro ao deletar tipo de campo' });
    }
});
app.get('/campoDeBatalha/:id1/:id2/:idCampo' , async (req, res) => {
    try {
        const { id1, id2, idCampo } = req.params;
        const vencedor = await batalha(id1, id2, idCampo);
        await pool.query('INSERT INTO campoDeBatalha (lutador1, lutador2,vencedor, campoID) VALUES ($1, $2, $3, $4)', [id1, id2, vencedor, idCampo]);
        const { rows } = await pool.query('SELECT * FROM lutadoressenai WHERE id = $1', [vencedor] );
        res.json({vencedor: rows[0], mensagem: 'Batalha registrada com sucesso'});
    } catch (error) {
        console.error('Erro ao registrar batalha', error);
    }
});
async function batalha(lutador1, lutador2, campo) {
    const result = await pool.query('SELECT * FROM lutadoressenai WHERE id = $1', [lutador1]);
     lutador1 = result.rows[0];
    const result2 = await pool.query('SELECT * FROM lutadoressenai WHERE id = $1', [lutador2]);
     lutador2 = result2.rows[0];
    const result3 = await pool.query('SELECT * FROM tipodocampo WHERE id = $1', [campo]);
     campo = result3.rows[0];
    if (lutador1.classe === 'Eletrecista' && campo.campoTipo === 'Eletrico' && lutador2.classe != 'Eletricista') {
        lutador2.ataque = lutador2.ataque % 2;
    }
    else if (lutador2.classe === 'Eletrecista' && campo.campoTipo === 'Eletrico' && lutador1.classe != 'Eletricista') {
        lutador1.ataque = lutador1.ataque % 2;
    }
    else if (lutador1.classe === 'Mecanico' && campo.campoTipo === 'Metal' && lutador2.classe != 'Mecanico') {
        lutador2.ataque = lutador2.ataque % 2;
    }
    else if (lutador2.classe === 'Mecanico' && campo.campoTipo === 'Metal' && lutador1.classe != 'Mecanico') {
        lutador1.ataque = lutador1.ataque % 2;
    }
    else if (lutador1.classe === 'Programador' && campo.campoTipo === 'Fogo' && lutador2.classe != 'Programador') {
        lutador2.ataque = lutador2.ataque % 2;
    }
    else if (lutador2.classe === 'Programador' && campo.campoTipo === 'Fogo' && lutador1.classe != 'Programador') {
        lutador1.ataque = lutador1.ataque % 2;
    }
    else if (lutador1.classe === 'Excelers' && campo.campoTipo === 'Agua' && lutador2.classe != 'Excelers') {
        lutador2.ataque = lutador2.ataque % 2;
    }
    else if (lutador2.classe === 'Excelers' && campo.campoTipo === 'Agua' && lutador1.classe != 'Excelers') {
        lutador1.ataque = lutador1.ataque % 2;
    }
    else if (lutador1.classe === 'Administrador' && campo.campoTipo === 'Grama' && lutador2.classe != 'Administrador') {
        lutador2.ataque = lutador2.ataque % 2;
    }
    else if (lutador2.classe === 'Administrador' && campo.campoTipo === 'Grama' && lutador1.classe != 'Administrador') {
        lutador1.ataque = lutador1.ataque % 2;
    }
    else if (lutador1.ataque > lutador2.defesa){
        return lutador1.id
    }
    else if (lutador2.ataque > lutador1.defesa){
        return lutador2.id
    }
    else {
        return 'Empate'
    }
}
app.get('/campoDeBatalha', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM campoDeBatalha');
        res.json({
            total: result.rowCount,
            batalhas: result.rows
        });
    } catch (error) {
        console.error('Erro ao buscar as batalhas');
        res.status(500).send('Erro ao buscar as batalhas');
    }
});
app.get('/campoDeBatalha/:idLutador', async (req, res) => {
    try {
        const { idLutador } = req.params;
        const result = await pool.query('SELECT * FROM campoDeBatalha WHERE lutador1 = $1 OR lutador2 = $1', [idLutador]);
        res.json({
            total: result.rowCount,
            batalhas: result.rows
        });
    } catch (error) {
        console.error('Erro ao buscar as batalhas por lutador');
        res.status(500).send('Erro ao buscar as batalhas por lutador');
    }
});
app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});