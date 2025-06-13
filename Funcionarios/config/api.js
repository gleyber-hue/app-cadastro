const API_URL = 'http://10.0.2.2:3000/api';

export const api = {
  // Função para fazer login
  login: async (email, password) => {
    try {
      console.log('Tentando login com:', email);
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Resposta do login:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      return data;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  },

  // Função para buscar todos os funcionários
  getFuncionarios: async () => {
    try {
      console.log('Buscando todos os funcionários...');
      const response = await fetch(`${API_URL}/funcionarios`);
      const data = await response.json();
      console.log('Funcionários encontrados:', data.length);
      return data;
    } catch (error) {
      console.error('Erro ao buscar funcionários:', error);
      throw error;
    }
  },

  // Função para buscar um funcionário específico
  getFuncionario: async (id) => {
    try {
      console.log('Buscando funcionário ID:', id);
      const response = await fetch(`${API_URL}/funcionarios/${id}`);
      const data = await response.json();
      console.log('Funcionário encontrado:', data);
      return data;
    } catch (error) {
      console.error('Erro ao buscar funcionário:', error);
      throw error;
    }
  },

  // Função para criar um novo funcionário
  createFuncionario: async (funcionario) => {
    try {
      console.log('Criando novo funcionário:', funcionario);
      const response = await fetch(`${API_URL}/funcionarios/novo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(funcionario),
      });

      const data = await response.json();
      console.log('Resposta da criação:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar funcionário');
      }

      return data.funcionario;
    } catch (error) {
      console.error('Erro ao criar funcionário:', error);
      throw error;
    }
  },

  // Função para atualizar um funcionário
  updateFuncionario: async (id, funcionario) => {
    try {
      console.log('Atualizando funcionário ID:', id, 'com dados:', funcionario);
      const response = await fetch(`${API_URL}/funcionarios/editar/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(funcionario),
      });

      const data = await response.json();
      console.log('Resposta da atualização:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao atualizar funcionário');
      }

      return data.funcionario;
    } catch (error) {
      console.error('Erro ao atualizar funcionário:', error);
      throw error;
    }
  },

  // Função para excluir um funcionário
  deleteFuncionario: async (id) => {
    try {
      console.log('Excluindo funcionário ID:', id);
      const response = await fetch(`${API_URL}/funcionarios/excluir/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      console.log('Resposta da exclusão:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao excluir funcionário');
      }

      return data;
    } catch (error) {
      console.error('Erro ao excluir funcionário:', error);
      throw error;
    }
  },
}; 