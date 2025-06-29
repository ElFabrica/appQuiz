import { View, Text, StyleSheet, Pressable, Image, Modal, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import tw from 'twrnc';
import LottieView from 'lottie-react-native';
import Icon from "@react-native-vector-icons/fontawesome";
import * as Progress from 'react-native-progress';

import { StackRoutesProps } from "@/routes/StackRoutes";

import { styles } from "./styles";

export function Home  ({ navigation }: StackRoutesProps<"Home">) {
  const [modalVisible, setModalVisible] = useState(false);
  const [chave, setChave] = useState('');

//Função de verificar senha e ir para o acesso restrito
function acessoRestrito() {
  if (chave !== "Fala1234@") {
    Alert.alert("Código inválido")
    setChave("")
    return
  } 
  setModalVisible(false)
  navigation.navigate("Users")
  setChave("")
}

  return (
  <View style={styles.container}>
    {/* Logo */}
    <Image
      source={require('../img/LOGO_AZUL.png')}
      style={styles.logo}
    />

    {/* Ícone */}
    <Pressable onPress={() => setModalVisible(true)}>
      <Icon name="gear" size={24} color="purple" style={styles.icon} />
    </Pressable>

    {/* Conteúdo principal */}
    <View style={styles.mainContent}>
      <Text style={styles.title}>
        Bem-vindo ao{"\n"} Questionário
      </Text>

      {/* Animação */}
      <LottieView
        source={require('../../animations/Estudant.json')}
        autoPlay
        loop
        style={styles.animation}
      />

      <Text style={styles.instructionsTitle}>Instruções</Text>

      {/* Instruções */}
      <View style={styles.instructionsBox}>
        <Text style={styles.instructionsText}>
          Cada pergunta do quiz tem apenas três alternativas e uma correta.
        </Text>
        <Text style={styles.instructionsText}>
          Seu progresso será exibido no topo.
        </Text>
        <Text style={styles.instructionsText}>
          Você verá a sua pontuação no final do quiz.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {/* Botão de iniciar */}
        <Pressable
          style={styles.startButton}
          onPress={() => navigation.navigate("Form")}
        >
          <Text style={styles.startButtonText}>Iniciar</Text>
        </Pressable>
      </View>
    </View>

    {/* Modal / Popup */}
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Acesso Restrito</Text>

          <TextInput
            placeholder="Digite a chave"
            placeholderTextColor="#888"
            style={styles.input}
            value={chave}
            onChangeText={setChave}
          />

          <View style={styles.modalButtons}>
            <Pressable
              style={styles.cancelButton}
              onPress={() => [setModalVisible(false), setChave("")]}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={styles.confirmButton}
              onPress={acessoRestrito}
            >
              <Text style={styles.modalButtonText}>Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  </View>
);

};

