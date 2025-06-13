import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from '@react-navigation/native';
import { api } from '../config/api';

function ListaFuncionariosScreen({ navigation, route }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFuncionarios = async () => {
    try {
      setLoading(true);
      const data = await api.getFuncionarios();
      setFuncionarios(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os funcionários');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFuncionarios();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.refresh) {
        loadFuncionarios();
        navigation.setParams({ refresh: undefined });
      }
    }, [route.params?.refresh])
  );

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir este funcionário?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", onPress: async () => {
            try {
              await api.deleteFuncionario(id);
              Alert.alert('Sucesso', 'Funcionário excluído com sucesso!');
              loadFuncionarios();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o funcionário');
              console.error(error);
            }
          }
        }
      ],
      { cancelable: true }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.funcionarioItem}>
      <Text style={styles.funcionarioNome}>{item.nome}</Text>
      <Text style={styles.funcionarioDetalhe}>Data de Nascimento: {item.dataNascimento}</Text>
      <Text style={styles.funcionarioDetalhe}>Sexo: {item.sexo}</Text>
      <Text style={styles.funcionarioDetalhe}>Telefone: {item.telefone}</Text>
      <Text style={styles.funcionarioDetalhe}>Email: {item.email}</Text>
      <Text style={styles.funcionarioDetalhe}>Cargo: {item.cargo}</Text>
      <Text style={styles.funcionarioDetalhe}>Salário: R$ {item.salario}</Text>
      <Text style={styles.funcionarioDetalhe}>Data de Cadastro: {item.dataCadastro}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => navigation.navigate('Formulario', { funcionario: item })}
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Lista de Funcionários</Text> */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Formulario')}
      >
        <Text style={styles.addButtonText}>Adicionar Novo Funcionário</Text>
      </TouchableOpacity>
      <FlatList
        data={funcionarios}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        refreshing={loading}
        onRefresh={loadFuncionarios}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  list: {
    width: '100%',
  },
  listContent: {
    paddingBottom: 20,
  },
  funcionarioItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  funcionarioNome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  funcionarioDetalhe: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#ffc107',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ListaFuncionariosScreen; 