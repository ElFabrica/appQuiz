import { useState, useEffect } from "react";
import { View, Text, Pressable, Image, Modal, Alert } from "react-native";
import React from "react";
import { reactQuestions } from "../../tasks/question";
import tw from "twrnc";
import * as Progress from 'react-native-progress';

import { TaskStorge,taskStorge } from "@/storge/Tasks";
import { ChoiceStorge, choiceStorge } from "@/storge/Choices";

import { StackRoutesProps } from "@/routes/StackRoutes";
import { styles } from "./styles";

export function  Questions ({ navigation }: StackRoutesProps<"Questions">) {


  const [shuffledTasks, setShuffledTasks] = useState<taskStorge[]>([]); // Estado que guarda as perguntas embaralhadas
  const [shuffledChoices, setshuffledChoices] = useState<choiceStorge[]>([])

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<choiceStorge>();
  const [isCorrect, setIsCorrect] = useState<Boolean>();
  const [modalVisible, setModalVisible] = useState(false);

  // 🔀 Função para embaralhar array (Fisher-Yates Shuffle)
  function shuffleArray (array:taskStorge[]){
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // 🚀 Embaralhar perguntas na primeira renderização
  useEffect(() => {
    handleTasks()
    handleChoices()

    const randomizedQuestions = shuffleArray(shuffledTasks);
    setShuffledTasks(randomizedQuestions);
  }, []);

  //Função que vai pra próxima pergunta
  const handleNext = () => {
    if (currentQuestionIndex === shuffledTasks.length - 1) {
      navigation.navigate("Score", { score: score }); //Se for a ultima pergunta, redireciona para a página de Score e manda como parâmetro a pontuação do usuário
    } else {
      if (!selectedOption) { //Verifica se o usuário já selecionou alguma alternativa
        return;
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1); //Vai para a próxima pergunta
      setSelectedOption(undefined); //Reseta a variável salva a opção selecionada
      setIsCorrect(undefined); //Reseta a função que verifica se está correta
    }
  };

  //Função de clicar na opção e recebe a opção como parâmetro
  const handleOptionPress = (pressedOption:choiceStorge) => {
    if (selectedOption) { //Verifica se já foi clicado
      return;
    }
    setSelectedOption(pressedOption); //Salva a opção selecionada
    const isAnwserCorrect =
      shuffledTasks[currentQuestionIndex].choiceRight === pressedOption.id;
    setIsCorrect(true);

    if (isAnwserCorrect) { //Se a opção for correta, ele adiciona mais 20 pontos
      setScore((prevScore) => prevScore + 20);
    }
  };

  async function handleTasks() {
      try {
        const response = await TaskStorge.get()
        setShuffledTasks(response)
      } catch (error) {
        console.log(error)
        Alert.alert("Error", "Não foi possível puxar as perguntas.")
  
      }
    }
    async function handleChoices() {
      try {
        const response = await ChoiceStorge.get()
        setshuffledChoices(response)
      } catch (error) {
        console.log(error)
        Alert.alert("Error", "Não foi possível puxar as alternativas.")
  
      }
    }

  //Chama o popup de desistir do quiz
  const handleExit = () => {
    setModalVisible(false);
    navigation.navigate("Home");
  };

  //🔄 Enquanto carrega as perguntas, mostra uma tela de loading
  if (shuffledTasks.length === 0) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Nenhuma pergunta encontrada...</Text>
      </View>
    );
  }

  return (
  <View style={styles.container}>
    <View style={styles.progressContainer}>
      <Progress.Bar
        color="rgb(59 130 246)"
        progress={(currentQuestionIndex + 1) / shuffledTasks.length}
        width={400}
        height={15}
        borderColor="#ccc"
      />
      <Text style={styles.progressText}>
        Pergunta {currentQuestionIndex + 1} de {shuffledTasks.length}
      </Text>
    </View>

    <Text style={styles.questionTitle}>
      {`${currentQuestionIndex + 1}.${shuffledTasks[currentQuestionIndex].title}`}
    </Text>

    {shuffledChoices.filter((item)=> item.task ===shuffledTasks[currentQuestionIndex].id ).map((option) => (
      <Pressable
        key={option.id}
        style={[
          styles.option,
          selectedOption?.id === option.id && (isCorrect
            ? styles.optionCorrect
            : styles.optionIncorrect),
        ]}
        onPress={() => handleOptionPress(option)}
      >
        <Text style={styles.optionText}>{option.title}</Text>
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
        {currentQuestionIndex === shuffledTasks.length - 1
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

    {/*<Image
      source={require("../img/LOGO_AZUL.png")}
      style={styles.logo}
    />*/}
  </View>
);

};
