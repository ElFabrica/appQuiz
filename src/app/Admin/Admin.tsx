import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, FlatList, Alert } from 'react-native';
import tw from 'twrnc';
import { TaskStorge, taskStorge } from '@/storge/Tasks';
import { CircleDashed, CircleCheck, Icon, Trash } from "lucide-react-native";
import { ChoiceStorge, choiceStorge } from '@/storge/Choices';
import { Button } from '@/components/button';

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
      const response = await fetch("https://nasago.bubbleapps.io/version-test/api/1.1/wf/tasks-nasa");

      const dataTask = await response.json().then(res => res.response.tasks) as taskStorge[]
      for (let i in dataTask) {
        const newItem = {
          id: dataTask[i].id,
          title: dataTask[i].title,
          points: dataTask[i].points,
          order: dataTask[i].order,
          choiceRight:dataTask[i].choiceRight
        }
        await TaskStorge.add(newItem)
        console.log(Tasks)
      }
      try {
        const response = await fetch("https://nasago.bubbleapps.io/version-test/api/1.1/wf/choice-nasa");

      const dataChoice = await response.json().then(res => res.response.choice) as choiceStorge[]
      for (let i in dataChoice) {
        const newItem = {
          id: dataChoice[i].id,
          title: dataChoice[i].title,
          task: dataChoice[i].task
        }
        await ChoiceStorge.add(newItem)
        console.log(Choices)
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
      try {
        const SelecteToDie = Choices.filter(item => item.task === id)
        for(let i = 1 ; i < SelecteToDie.length-1;i++ ){
          await handleChoicesRemove(SelecteToDie[i].id)
          
        }
      } catch (error) {
        console.log("Algo de errado  em deletar as choices")
      }
      
      await TaskStorge.remove(id)
console.log(Choices)
      
      

    } catch (error) {
      console.log(error)
      Alert.alert("Remover", `Não foi possível remover a task.`)
    }
  }

  //Remover opções
  async function handleChoicesRemove(id: string) {
    try {
      await ChoiceStorge.remove(id)
      handleChoices()

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

  }, [Choices, Tasks]);

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
          const choicesForTask = Choices.filter((choice) => choice.task === item.id);

return (
  <View style={tw`border border-gray-300 rounded mb-4 p-3`}>
    <Text style={tw`font-bold text-lg mb-2`}>{item.title}</Text>
    <Text style={tw`mb-2`}>Pontos: {item.points}</Text>

{choicesForTask.map((choice) => (
  <View key={`${item.id}-${choice.id}`} style={tw`flex-row items-center mb-1`}>
    {item.choiceRight === choice.id ? (
      <CircleCheck color="green" size={20} style={tw`mr-2`} />
    ) : (
      <CircleDashed color="gray" size={20} style={tw`mr-2`} />
    )}
    <Text>{choice.title}</Text>
    <Trash color="green" size={20} style={tw`mr-2`} onPress={()=>handleChoicesRemove(choice.id)} />
  </View>
))}


    <Pressable
      onPress={() => handleTaskRemove(item.id)}
      style={tw`bg-red-500 px-3 py-2 rounded mt-2 self-end`}
    >
      <Text style={tw`text-white`}>🗑️ Excluir</Text>
    </Pressable>
  </View>
);

        }}
      />
      <Button title='Baixar tasks' 
       
      onPress={DownloadData}
      disabled = {LoadingDownload}/>
    </View>
  );
};
