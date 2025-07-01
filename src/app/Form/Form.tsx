import { useEffect, useState } from "react";
import { View, 
  Text, 
  ImageBackground,
  Alert,
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 

Keyboard } from "react-native";
import validator from 'email-validator';
import { styles } from "./styles";
import LottieView from 'lottie-react-native';
import { userStorge, UserStorge } from "@/storge/Users";
import MaskInput from 'react-native-mask-input'
import { StackRoutesProps } from "@/routes/StackRoutes";
import { Button } from "@/components/button";
import { Input } from "@/components/Input";
import { LogoAbsolut } from "@/components/LogoAbsolut";

export  function Form({ navigation }: StackRoutesProps<"Form">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  
  //Função que salva o formulário no storge do smartphone
  async function onSubmit() {
      //Valida de algum dos dados estão vazios
    if (!(name && email && phone)) {
      Alert.alert("Erro", "Preencha todos os dados");
      return;
    }
      //Valida se o email é um email válido (Não verifica se o email existe)
    if (!validator.validate(email)) {
      Alert.alert("Erro", "E-mail inválido");
      return;
    }
    //Caso funcione tudo redondo
    const id = Math.random().toString(30).substring(2, 20);  // Gerar ID único
    try {
          const newItem = {
            id: Math.random().toString(36).substring(2),
            name,
            email,
            phone
          }
          await UserStorge.add(newItem)
      // Limpeza do formulário
      setName("");
      setEmail("");
      setPhone("")

      // Navega para a próxima tela
      navigation.navigate("Instructions");
    } catch (error) {
      console.error("Erro ao salvar dados no banco:", error);
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  }

  return (
    <ImageBackground source={require("../../assets/Background_with-logo.png")} 
        resizeMode="cover"
        style={{flex:1}}
        >
  <LogoAbsolut/>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        
        <View style={styles.animationContainer}>
          <LottieView
            source={require('../../assets/animations/Form.json')}
            autoPlay
            loop
            style={styles.animation}
          />
        </View>

        <Text style={styles.title}>
          Cadastro
        </Text>

        <View style={styles.content}>
        {/* NOME */}
        <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nome</Text>
        <Input place="John"
        value={name}
        onChangeText={setName}
        />
        </View>
        {/* EMAIL */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <Input place="seu@email.com"
          value={email}
          onChangeText={setEmail}
        />
        </View>

        {/* TELEFONE */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Telefone</Text>
          <MaskInput
            value={phone}
            onChangeText={setPhone}
            mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            keyboardType="numeric"
            placeholder="(00) 00000-0000"
            style={styles.input}
          />
        </View>
        </View>
        {/* BOTÃO */}
        <View style={styles.Footer}>
        <Button title="Começar" 
        onPress={onSubmit}/>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  
  </ImageBackground>
)
}