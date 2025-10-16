import { View, Text, Pressable, Modal, TextInput, Alert, ImageBackground } from "react-native";
import React, { useState } from "react";
import tw from 'twrnc';
import LottieView from 'lottie-react-native';
import Icon from "@react-native-vector-icons/fontawesome";

import { StackRoutesProps } from "@/routes/StackRoutes";
import { styles } from "./styles";
import { Button } from "@/components/button";
import { Logo } from "@/components/Logo";
import { LogoAbsolut } from "@/components/LogoAbsolut";

export function Instructions({ navigation }: StackRoutesProps<"instructions">) {
  return (
    <ImageBackground source={require("../../assets/Background_with-logo.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <LogoAbsolut />
        {/* Ícone de configurações */}
        {/* Conteúdo principal */}
        <View style={styles.main}>

          <Text style={styles.title}>
            Instruções
          </Text>


          <View style={styles.content}>

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
              <Button
                size={22}
                title="Começar"
                onPress={() => navigation.navigate("questions")}
              />
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
