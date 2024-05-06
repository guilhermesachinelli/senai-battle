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
        res.status(200).send({ message: 'Usuário removido com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar usuário');
        res.status(500).send({ message: 'Erro ao deletar usuário' });
    }
});
app.get('/', (req, res) => {
    res.send('Servidor rodando!');
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});