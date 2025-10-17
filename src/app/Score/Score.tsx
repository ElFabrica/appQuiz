import { View, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { styles } from './styles';


import LottieView from 'lottie-react-native';

import { useRoute, useIsFocused } from "@react-navigation/native";
import { StackRoutesProps } from '@/routes/StackRoutes';
import { Button } from '@/components/button';
import { LogoAbsolut } from '@/components/LogoAbsolut';
import { useQuizContext } from '@/contexts/useUser.context';

type RouteParams = StackRoutesProps<"score">


export function Score({ navigation }: StackRoutesProps<"score">) {

  const { handleUpdateUser, user } = useQuizContext()
  const { params } = useRoute<RouteParams["route"]>()
  const timeoutRef = useRef(0); //Desativado
  const isFocused = useIsFocused(); // 🔥 Verifica se está na tela Score
  const [messageRefer, SetMessageRefer] = useState("")

  useEffect(() => {
    if (params.score <= 99) SetMessageRefer("Que pena \n Não foi dessa vez!")
    if (params.score === 100) {
      (async () => {
        if (!user) return
        await handleUpdateUser(user)
        console.log(user)
      })()
    }


    if (isFocused) {
      // ⏰ Inicia o timer apenas quando a tela Score está ativa
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        console.log("Timer cancelado na página Score");
      }
    };
  }, [isFocused]); // 🧠 Executa sempre que o foco na tela muda

  function voltar() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current); // Cancela o timer se clicar em "Voltar"
    }
    navigation.navigate("home");
  }


  return (

    <View className='flex-1 px-6'>
      <LogoAbsolut />
      <View style={styles.container}>
        <LottieView
          source={require('../../assets/animations/Finish2.json')}
          autoPlay
          loop
          style={styles.animation}
        />
        <Text style={styles.congrats}>
          Parabéns!!!
        </Text>
        {
          <Text style={styles.score}>{messageRefer}</Text>
        }
        <Text style={styles.score}>
          Você conseguiu{"\n"}{params?.score} pontos
        </Text>
        <Button title='Voltar'
          onPress={voltar}
          style={{ marginTop: 30 }}
        />
      </View>
    </View>
  );

}
