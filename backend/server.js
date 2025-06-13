const express = require('express');
const cors = require('cors');
const pool = require('./config/database');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rota para listar todos os funcionários
app.get('/api/funcionarios', async (req, res) => {
  try {
    console.log('Buscando todos os funcionários...');
    const [rows] = await pool.query('SELECT * FROM funcionarios ORDER BY nome');
    console.log('Funcionários encontrados:', rows.length);
    res.json(rows);
  } catch (error) {
    console.error('Erro ao buscar funcionários:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para buscar um funcionário específico
app.get('/api/funcionarios/:id', async (req, res) => {
  try {
    console.log('Buscando funcionário ID:', req.params.id);
    const [rows] = await pool.query('SELECT * FROM funcionarios WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      console.log('Funcionário não encontrado');
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }
    console.log('Funcionário encontrado:', rows[0]);
    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar funcionário:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para criar um novo funcionário
app.post('/api/funcionarios/novo', async (req, res) => {
  try {
    console.log('Dados recebidos para novo funcionário:', req.body);
    const { nome, email, cargo, sexo, nascimento, telefone, salario } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || !email || !cargo || !sexo || !nascimento || !telefone || !salario) {
      console.log('Campos obrigatórios faltando');
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // Verificar se o email já existe
    const [existingEmail] = await pool.query('SELECT id FROM funcionarios WHERE email = ?', [email]);
    if (existingEmail.length > 0) {
      console.log('Email já cadastrado:', email);
      return res.status(400).json({ message: 'Este email já está cadastrado' });
    }

    console.log('Inserindo novo funcionário...');
    const [result] = await pool.query(
      'INSERT INTO funcionarios (nome, email, cargo, sexo, nascimento, telefone, salario, data_cadastro) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())',
      [nome, email, cargo, sexo, nascimento, telefone, salario]
    );
    console.log('Funcionário inserido com ID:', result.insertId);

    const [newFuncionario] = await pool.query('SELECT * FROM funcionarios WHERE id = ?', [result.insertId]);
    console.log('Novo funcionário criado:', newFuncionario[0]);
    res.status(201).json({
      message: 'Funcionário cadastrado com sucesso',
      funcionario: newFuncionario[0]
    });
  } catch (error) {
    console.error('Erro ao criar funcionário:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para atualizar um funcionário
app.put('/api/funcionarios/editar/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Atualizando funcionário ID:', id);
    console.log('Dados recebidos:', req.body);
    const { nome, email, cargo, sexo, nascimento, telefone, salario } = req.body;

    // Validação dos campos obrigatórios
    if (!nome || !email || !cargo || !sexo || !nascimento || !telefone || !salario) {
      console.log('Campos obrigatórios faltando');
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    // Verificar se o funcionário existe
    const [existingFuncionario] = await pool.query('SELECT id FROM funcionarios WHERE id = ?', [id]);
    if (existingFuncionario.length === 0) {
      console.log('Funcionário não encontrado');
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }

    // Verificar se o email já existe para outro funcionário
    const [existingEmail] = await pool.query(
      'SELECT id FROM funcionarios WHERE email = ? AND id != ?',
      [email, id]
    );
    if (existingEmail.length > 0) {
      console.log('Email já cadastrado para outro funcionário:', email);
      return res.status(400).json({ message: 'Este email já está cadastrado para outro funcionário' });
    }

    console.log('Atualizando dados do funcionário...');
    await pool.query(
      'UPDATE funcionarios SET nome = ?, email = ?, cargo = ?, sexo = ?, nascimento = ?, telefone = ?, salario = ? WHERE id = ?',
      [nome, email, cargo, sexo, nascimento, telefone, salario, id]
    );

    const [updatedFuncionario] = await pool.query('SELECT * FROM funcionarios WHERE id = ?', [id]);
    console.log('Funcionário atualizado:', updatedFuncionario[0]);
    res.json({
      message: 'Funcionário atualizado com sucesso',
      funcionario: updatedFuncionario[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar funcionário:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota para excluir um funcionário
app.delete('/api/funcionarios/excluir/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Excluindo funcionário ID:', id);

    // Verificar se o funcionário existe
    const [existingFuncionario] = await pool.query('SELECT id FROM funcionarios WHERE id = ?', [id]);
    if (existingFuncionario.length === 0) {
      console.log('Funcionário não encontrado');
      return res.status(404).json({ message: 'Funcionário não encontrado' });
    }

    await pool.query('DELETE FROM funcionarios WHERE id = ?', [id]);
    console.log('Funcionário excluído com sucesso');
    res.json({ message: 'Funcionário excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir funcionário:', error);
    res.status(500).json({ error: error.message });
  }
});

// Rota de autenticação
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Tentativa de login:', email);
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, password]);
    
    if (rows.length > 0) {
      console.log('Login bem-sucedido');
      res.json({ success: true, user: rows[0] });
    } else {
      console.log('Login falhou');
      res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 