import { View, Text, Pressable, Modal, TextInput, Alert, ImageBackground, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons"
import { StackRoutesProps } from "@/routes/StackRoutes";
import { styles } from "./styles";
import { Button } from "@/components/button";
import { RFValue } from "react-native-responsive-fontsize";
import { Logo } from "@/components/Logo";

export function Instructions({ navigation }: StackRoutesProps<"instructions">) {
  return (
    <ImageBackground source={require("../../assets/Background_with-logo.png")}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <View className="flex-row justify-between py-4 mt-4 items-center">
          <TouchableOpacity activeOpacity={0.8} onPress={navigation.goBack}>
            <MaterialIcons name="arrow-back" size={RFValue(22)} />
          </TouchableOpacity>
          <Logo />
        </View>
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
