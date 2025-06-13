// Aplicativo de Cadastro de Funcionários
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaFuncionariosScreen from './screens/ListaFuncionariosScreen';
import FormularioFuncionarioScreen from './screens/FormularioFuncionarioScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007bff',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Lista" 
          component={ListaFuncionariosScreen} 
          options={{ title: 'Funcionários' }}
        />
        <Stack.Screen 
          name="Formulario" 
          component={FormularioFuncionarioScreen} 
          options={({ route }) => ({ 
            title: route.params?.funcionario ? 'Editar Funcionário' : 'Novo Funcionário' 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
