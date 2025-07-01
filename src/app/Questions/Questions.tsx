import { useState, useEffect } from "react";
import { View, Text, Pressable, Modal, Alert, ImageBackground } from "react-native";
import React from "react";
import tw from "twrnc";
import * as Progress from 'react-native-progress';


import { TaskStorge, taskStorge } from "@/storge/Tasks";
import { ChoiceStorge, choiceStorge } from "@/storge/Choices";

import { StackRoutesProps } from "@/routes/StackRoutes";
import { styles } from "./styles";
import { Button } from "@/components/button";

// ... (importações mantidas)

export function Questions({ navigation }: StackRoutesProps<"Questions">) {
  const [tasks, setTasks] = useState<taskStorge[]>([]);
  const [choices, setChoices] = useState<choiceStorge[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentOptions, setCurrentOptions] = useState<choiceStorge[]>([]); // NOVO estado
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<choiceStorge>();
  const [isCorrect, setIsCorrect] = useState<Boolean>();
  const [modalVisible, setModalVisible] = useState(false);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  async function handleTasks() {
    try {
      const response = await TaskStorge.get();
      const randomizedTasks = shuffleArray(response); // embaralha perguntas
      setTasks(randomizedTasks);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Não foi possível puxar as perguntas.");
    }
  }

  async function handleChoices() {
    try {
      const response = await ChoiceStorge.get();
      setChoices(response);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Não foi possível puxar as alternativas.");
    }
  }

  useEffect(() => {
    handleTasks();
    handleChoices();
  }, []);

  // embaralha opções apenas quando muda a pergunta
  useEffect(() => {
    if (tasks.length === 0 || choices.length === 0) return;
    const currentTask = tasks[currentQuestionIndex];
    const optionsForCurrent = choices.filter((item) => item.task === currentTask.id);
    setCurrentOptions(shuffleArray(optionsForCurrent));
  }, [currentQuestionIndex, tasks, choices]); // só atualiza quando troca a pergunta ou carrega as listas

  const handleNext = () => {
    if (currentQuestionIndex === tasks.length - 1) {
      navigation.navigate("Score", { score: score });
    } else {
      if (!selectedOption) return;
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(undefined);
      setIsCorrect(undefined);
    }
  };

  const handleOptionPress = (pressedOption: choiceStorge) => {
    if (selectedOption) return;
    setSelectedOption(pressedOption);

    const isAnswerCorrect = tasks[currentQuestionIndex].choiceRight === pressedOption.id;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + tasks[currentQuestionIndex].points);
    }
  };

  if (tasks.length === 0) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Nenhuma pergunta encontrada...</Text>
      </View>
    );
  }
const handleExit = () => {
  setModalVisible(false);
  navigation.navigate("Home");
};

  const currentTask = tasks[currentQuestionIndex];

  return (
    <ImageBackground
      source={require("../../assets/Background_with-logo.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.progressContainer}>
          <Progress.Bar
            color="#46f23c"
            progress={(currentQuestionIndex + 1) / tasks.length}
            width={400}
            height={15}
            borderColor="#ccc"
          />
          <Text style={styles.progressText}>
            Pergunta {currentQuestionIndex + 1} de {tasks.length}
          </Text>
        </View>

        <Text style={styles.questionTitle}>
          {`${currentQuestionIndex + 1}. ${currentTask.title}`}
        </Text>

        {currentOptions.map((option) => (
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

        <Button
          title={currentQuestionIndex === tasks.length - 1 ? "Finalizar" : "Próximo"}
          size={22}
          onPress={handleNext}
          disable={!selectedOption}
        />

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
      </View>
    </ImageBackground>
  );
}
