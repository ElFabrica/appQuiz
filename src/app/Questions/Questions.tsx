import { useState, useEffect } from "react";
import { View, Text, Pressable, Image, Modal } from "react-native";
import React from "react";
import { reactQuestions } from "../../tasks/question";
import tw from "twrnc";
import * as Progress from 'react-native-progress';

import { StackRoutesProps } from "@/routes/StackRoutes";
import { styles } from "./styles";

export function  Questions ({ navigation }: StackRoutesProps<"Questions">) {
  const [shuffledQuestions, setShuffledQuestions] = useState([]); // Estado que guarda as perguntas embaralhadas
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  interface tasks{

  }


  // 🔀 Função para embaralhar array (Fisher-Yates Shuffle)
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 🚀 Embaralhar perguntas na primeira renderização
  useEffect(() => {
    const randomizedQuestions = shuffleArray(reactQuestions);
    setShuffledQuestions(randomizedQuestions);
  }, []);

  //Função que vai pra próxima pergunta
  const handleNext = () => {
    if (currentQuestionIndex === shuffledQuestions.length - 1) {
      navigation.navigate("Score", { score: score }); //Se for a ultima pergunta, redireciona para a página de Score e manda como parâmetro a pontuação do usuário
    } else {
      if (!selectedOption) { //Verifica se o usuário já selecionou alguma alternativa
        return;
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1); //Vai para a próxima pergunta
      setSelectedOption(null); //Reseta a variável salva a opção selecionada
      setIsCorrect(null); //Reseta a função que verifica se está correta
    }
  };

  //Função de clicar na opção e recebe a opção como parâmetro
  const handleOptionPress = (pressedOption) => {
    if (selectedOption) { //Verifica se já foi clicado
      return;
    }
    setSelectedOption(pressedOption); //Salva a opção selecionada
    const isAnwserCorrect =
      shuffledQuestions[currentQuestionIndex].correctAnswer === pressedOption;
    setIsCorrect(isAnwserCorrect);

    if (isAnwserCorrect) { //Se a opção for correta, ele adiciona mais 20 pontos
      setScore((prevScore) => prevScore + 20);
    }
  };

  //Chama o popup de desistir do quiz
  const handleExit = () => {
    setModalVisible(false);
    navigation.navigate("Home");
  };

  //🔄 Enquanto carrega as perguntas, mostra uma tela de loading
  if (shuffledQuestions.length === 0) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Carregando perguntas...</Text>
      </View>
    );
  }

  return (
  <View style={styles.container}>
    <View style={styles.progressContainer}>
      <Progress.Bar
        color="rgb(59 130 246)"
        progress={(currentQuestionIndex + 1) / shuffledQuestions.length}
        width={400}
        height={15}
        borderColor="#ccc"
      />
      <Text style={styles.progressText}>
        Pergunta {currentQuestionIndex + 1} de {shuffledQuestions.length}
      </Text>
    </View>

    <Text style={styles.questionTitle}>
      {`${currentQuestionIndex + 1}.${shuffledQuestions[currentQuestionIndex].title}`}
    </Text>

    {shuffledQuestions[currentQuestionIndex].option.map((option, index) => (
      <Pressable
        key={index}
        style={[
          styles.option,
          selectedOption === option && (isCorrect
            ? styles.optionCorrect
            : styles.optionIncorrect),
        ]}
        onPress={() => handleOptionPress(option)}
      >
        <Text style={styles.optionText}>{option}</Text>
      </Pressable>
    ))}

    <Pressable
      style={[
        styles.nextButton,
        { opacity: selectedOption ? 1 : 0.6 },
      ]}
      onPress={handleNext}
    >
      <Text style={styles.nextButtonText}>
        {currentQuestionIndex === shuffledQuestions.length - 1
          ? "Finalizar"
          : "Próximo"}
      </Text>
    </Pressable>

    <Pressable
      style={styles.exitButton}
      onPress={() => setModalVisible(true)}
    >
      <Text style={styles.exitButtonText}>Sair</Text>
    </Pressable>

    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="fade"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Deseja realmente sair do quiz?
          </Text>

          <View style={styles.modalButtons}>
            <Pressable
              style={styles.modalCancel}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Não</Text>
            </Pressable>
            <Pressable
              style={styles.modalConfirm}
              onPress={handleExit}
            >
              <Text style={styles.modalConfirmText}>Sim</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>

    <Image
      source={require("../img/LOGO_AZUL.png")}
      style={styles.logo}
    />
  </View>
);

};
