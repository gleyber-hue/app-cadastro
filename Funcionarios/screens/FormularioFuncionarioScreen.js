import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { api } from '../config/api';

function FormularioFuncionarioScreen({ navigation, route }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [sexo, setSexo] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [salario, setSalario] = useState('');
  const [dataCadastro, setDataCadastro] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [funcionarioId, setFuncionarioId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (route.params?.funcionario) {
      const { id, nome, email, cargo, sexo, dataNascimento, telefone, salario, dataCadastro } = route.params.funcionario;
      setNome(nome);
      setEmail(email);
      setCargo(cargo);
      setSexo(sexo);
      setDataNascimento(dataNascimento);
      setTelefone(telefone);
      setSalario(salario);
      setDataCadastro(dataCadastro);
      setIsEditing(true);
      setFuncionarioId(id);
    } else {
      // Limpa o formulário se não estiver em modo de edição e define data de cadastro
      setNome('');
      setEmail('');
      setCargo('');
      setSexo('');
      setDataNascimento('');
      setTelefone('');
      setSalario('');
      setDataCadastro(new Date().toISOString().split('T')[0]); // Data atual
      setIsEditing(false);
      setFuncionarioId(null);
    }
  }, [route.params?.funcionario]);

  const handleSubmit = async () => {
    if (!nome || !email || !cargo || !sexo || !dataNascimento || !telefone || !salario) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);

    try {
      const funcionarioData = {
        nome,
        email,
        cargo,
        sexo,
        nascimento: dataNascimento,
        telefone,
        salario: parseFloat(salario)
      };

      console.log('Enviando dados do funcionário:', funcionarioData);

      if (isEditing) {
        console.log('Atualizando funcionário ID:', funcionarioId);
        const response = await api.updateFuncionario(funcionarioId, funcionarioData);
        console.log('Resposta da atualização:', response);
        
        if (response) {
          Alert.alert('Sucesso', 'Funcionário atualizado com sucesso!');
          navigation.navigate('Lista', { 
            updatedFuncionario: { ...funcionarioData, id: funcionarioId },
            refresh: true 
          });
        }
      } else {
        console.log('Criando novo funcionário');
        const response = await api.createFuncionario(funcionarioData);
        console.log('Resposta da criação:', response);
        
        if (response) {
          Alert.alert('Sucesso', 'Funcionário cadastrado com sucesso!');
          navigation.navigate('Lista', { 
            newFuncionario: { ...funcionarioData, id: response.id },
            refresh: true 
          });
        }
      }

      // Limpar o formulário após o envio
      setNome('');
      setEmail('');
      setCargo('');
      setSexo('');
      setDataNascimento('');
      setTelefone('');
      setSalario('');
      setDataCadastro(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error('Erro ao salvar funcionário:', error);
      Alert.alert('Erro', error.message || 'Não foi possível salvar o funcionário');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          placeholderTextColor="#888"
          value={nome}
          onChangeText={setNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (AAAA-MM-DD)"
          placeholderTextColor="#888"
          value={dataNascimento}
          onChangeText={setDataNascimento}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Sexo (Masculino/Feminino/Outro)"
          placeholderTextColor="#888"
          value={sexo}
          onChangeText={setSexo}
        />
        <TextInput
          style={styles.input}
          placeholder="Telefone"
          placeholderTextColor="#888"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Cargo"
          placeholderTextColor="#888"
          value={cargo}
          onChangeText={setCargo}
        />
        <TextInput
          style={styles.input}
          placeholder="Salário"
          placeholderTextColor="#888"
          value={salario}
          onChangeText={setSalario}
          keyboardType="numeric"
        />
        {isEditing && (
          <TextInput
            style={styles.input}
            placeholder="Data de Cadastro (Automático)"
            placeholderTextColor="#888"
            value={dataCadastro}
            editable={false}
          />
        )}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>
            {isEditing ? 'Atualizar Cadastro' : 'Cadastrar Funcionário'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FormularioFuncionarioScreen; 