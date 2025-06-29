import { View, Text, Pressable, Image } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { styles } from './styles'; 


import LottieView from 'lottie-react-native';

import { useRoute, useIsFocused } from "@react-navigation/native";
import { StackRoutesProps } from '@/routes/StackRoutes';

type RouteParams =  StackRoutesProps <"Score">


export function Score({ navigation, route }: StackRoutesProps<"Score">) {
  const { params } =  useRoute <RouteParams["route"]>()

  const timeoutRef = useRef(0); //Desativado
  const isFocused = useIsFocused(); // 🔥 Verifica se está na tela Score

  useEffect(() => {
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
    navigation.navigate("Home");
  }
  
  return (
  <View style={styles.container}>
    <Image
      source={require('../img/LOGO_AZUL.png')}
      style={styles.logo}
    />
    <LottieView
      source={require('../animations/Finish2.json')}
      autoPlay
      loop
      style={styles.animation}
    />
    <Text style={styles.congrats}>
      Parabéns!!!
    </Text>
    <Text style={styles.score}>
      Você concluiu seu formulário{"\n"}
      Sua pontuação foi {params?.score} pontos
    </Text>

    <Pressable style={styles.backButton} onPress={voltar}>
      <Text style={styles.backButtonText}>
        Voltar
      </Text>
    </Pressable>
  </View>
);

}
