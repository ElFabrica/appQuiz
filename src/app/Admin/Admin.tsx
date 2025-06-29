import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Alert } from 'react-native';
import tw from 'twrnc';
import { TaskStorge, taskStorge } from '@/storge/Tasks';
import { CircleDashed, CircleCheck } from "lucide-react-native";
import { ChoiceStorge, choiceStorge } from '@/storge/Choices';

// 🎯 Interface para o prêmio


export function Admin() {
  const [LoadingDownload, setLoadingDownload] = useState(false)

  const [titleTask, setTitleTask] = useState('');
  const [pointsTask, setPointsTask] = useState(0);
  const [choiceRight, setChoiceRight] = useState(false)
  const [taskOrder, setTaskOrder] = useState(0)

  const [choiceTitle, setChoiceTitle] = useState("")
  const [taskIdRefer, setTaskIdRefer] = useState("")
  const [choiceOrder, setChoiceOrder] = useState(0)

  const [Tasks, setTasks] = useState<taskStorge[]>([]);
  const [Choices, setChoices] = useState<choiceStorge[]>([]);

  //Baixar dados
  const DownloadData = async () => {
    setLoadingDownload(true)
    try {
      const response = await fetch("https://nasago.bubbleapps.io/version-test/api/1.1/wf/");

      const dataTask = await response.json().then(res => res.response.Tasks) as taskStorge[]
      for (let i in dataTask) {
        const newItem = {
          id: dataTask[i].id,
          title: dataTask[i].title,
          points: dataTask[i].points,
          order: dataTask[i].order
        }
        await TaskStorge.add(newItem)
        
      }
      try {
        const response = await fetch("https://nasago.bubbleapps.io/version-test/api/1.1/wf/");

      const dataChoice = await response.json().then(res => res.response.Tasks) as choiceStorge[]
      for (let i in dataTask) {
        const newItem = {
          id: dataChoice[i].id,
          title: dataChoice[i].title,
          task: dataChoice[i].task,
          choiceRight: dataChoice[i].choiceRight,
          order: dataChoice[i].order
        }
        await ChoiceStorge.add(newItem)
      }} catch (error) {
        Alert.alert("Erro de conexão ou inesperado.");
      console.error('Erro:', error);
      }
      setLoadingDownload(false)
    } catch (error) {
      Alert.alert("Erro de conexão ou inesperado.");
      console.error('Erro:', error);
    } finally {
      setLoadingDownload(false)
    }
  };

  

  //Adiciona item
  async function handleTaskAdd() {
    if (!titleTask.trim() || !pointsTask) {
      return Alert.alert("Adicionar", "Informe o titulo para adicionar.")
    }
    const newItem = {
      id: Math.random().toString(36).substring(2),
      title: titleTask,
      points: pointsTask,
      choiceRight,
      order: taskOrder
    }
    await TaskStorge.add(newItem)
    await handleTasks()
    setTitleTask("")
    setPointsTask(0)

    Alert.alert("Adicionado", `Adicionado ${titleTask}`)
  }


  //Adicionar Alternativas
  async function handleChoiceAdd() {
    if (!titleTask.trim() || !pointsTask) {
      return Alert.alert("Adicionar", "Informe o titulo para adicionar.")
    }
    const newChoiceItem = {
      id: Math.random().toString(36).substring(2),
      title: choiceTitle,
      task: taskIdRefer,
      choiceRight: false,
      order: choiceOrder

    }
    await ChoiceStorge.add(newChoiceItem)
    await handleTasks()
    setChoiceTitle("")
    setTaskIdRefer("")

    Alert.alert("Adicionado", `Adicionado ${choiceTitle}`)
  }
  //Remover Pergunta
  async function handleTaskRemove(id: string) {
    try {
      const response = await TaskStorge.remove(id)

      try {
        const SelecteToDie = Choices.filter(item => item.id === id)
        SelecteToDie.forEach(item => {
          handleChoicesRemove(item.id)
        })
      } catch (error) {
        console.log("Algo de errado ocorreu")
      }
      await handleTasks()

    } catch (error) {
      console.log(error)
      Alert.alert("Remover", `Não foi possível remover.`)
    }
  }

  //Remover opções
  async function handleChoicesRemove(id: string) {
    try {
      const response = await ChoiceStorge.remove(id)

    } catch (error) {
      console.log(error)
      Alert.alert("Remover", `Não foi possível remover.`)
    }
  }


  // 🚀 Carrega os prêmios e escuta alterações

  async function handleTasks() {
    try {
      const response = await TaskStorge.get()
      setTasks(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Error", "Não foi possível atualizar os status.")

    }
  }
  async function handleChoices() {
    try {
      const response = await ChoiceStorge.get()
      setChoices(response)
    } catch (error) {
      console.log(error)
      Alert.alert("Error", "Não foi possível atualizar os status.")

    }
  }

  useEffect(() => {
    handleTasks()
    handleChoices()

  }, []);

  // ➕ Adiciona um prêmio novo

  // ❌ Deleta um prêmio

  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <Text style={tw`text-2xl font-bold mb-4 text-center`}>
        🎯 Gerenciar Prêmios
      </Text>

      {/* Formulário */}
      <TextInput
        placeholder="Nome do prêmio"
        value={titleTask}
        onChangeText={setTitleTask}
        style={tw`border border-gray-300 p-2 rounded mb-2`}
      />
      <TextInput
        placeholder="Título do prêmio (popup)"
        value={pointsTask.toString()}
        keyboardType='numeric'
        onChangeText={setPointsTask.toString}
        style={tw`border border-gray-300 p-2 rounded mb-2`}
      />

      <Pressable
        style={tw`bg-blue-600 p-3 rounded mb-6`}
        onPress={handleTaskAdd}
      >
        <Text style={tw`text-white text-center font-bold`}>
          ➕ Adicionar Prêmio
        </Text>
      </Pressable>

      {/* Lista de Prêmios */}
      <FlatList
        data={Tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {

          return (
            <View style={tw`flex-row justify-between items-center mb-2`}>
              <View style={{ width: "80%" }}>
                <Text style={tw`font-bold text-lg`}>Prêmio: {item.title}</Text>
                <Text style={{ fontSize: 14, fontWeight: 500 }}>Prêmio mensagem: {item.points}</Text>

              </View>
              <Pressable
                onPress={() => handleTaskRemove(item.id)}
                style={tw`bg-red-500 px-3 py-2 rounded`}
              >
                <Text style={tw`text-white`}>🗑️ Excluir</Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
};
