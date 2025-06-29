import { useEffect, useState } from "react";
import { View, 
  Text, 
  Pressable, 
  TextInput, 
  Alert,
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 

Keyboard } from "react-native";
import validator from 'email-validator';
import { styles } from "./styles";
import LottieView from 'lottie-react-native';
import { store, TABLE_NAME, initializeStore } from "../../storge/Users"; // ✅ import externo
import MaskInput from 'react-native-mask-input'
import { StackRoutesProps } from "@/routes/StackRoutes";

export  function Form({ navigation }: StackRoutesProps<"Form">) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loaded, setLoaded] = useState(false);

  //Ao carregar a página, ele inicializa o storge
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Inicializando store...");
        await initializeStore();  // Certifique-se de que a inicialização do store está correta
        console.log("Store pronto!");
        setLoaded(true);  // Atualize o estado para refletir que o banco foi carregado
      } catch (e) {
        //Se der merda em alguma coisa, vai avisae eu e o usuário
        console.error("Erro ao inicializar banco:", e);
        Alert.alert("Erro", "Não foi possível carregar o banco de dados.");
      }
    };
    loadData();
  }, []);

  //Função que salva o formulário no storge do smartphone
  function onSubmit() {
    if (!loaded) { //Verifica se o banco inicializou corretamente
      Alert.alert("Aguarde", "O banco de dados ainda está carregando...");
      return;
    }
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
      // adicionar a linha ao store
      store.setRow(TABLE_NAME, id, { name, email, phone });
      console.log("Usuário adicionado ao banco com sucesso");
      

      // Limpeza do formulário
      setName("");
      setEmail("");
      setPhone("")

      // Navega para a próxima tela
      navigation.navigate("Questions");
    } catch (error) {
      console.error("Erro ao salvar dados no banco:", error);
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  }

  return (
  <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    style={styles.container}
  >
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

        {/* NOME */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="John"
            value={name}
            onChangeText={setName}
          />
        </View>

        {/* EMAIL */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
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

        {/* BOTÃO */}
        <Pressable
          style={[
            styles.button,
            loaded ? styles.buttonLoaded : styles.buttonDisabled
          ]}
          onPress={onSubmit}
          disabled={!loaded}
        >
          <Text style={styles.buttonText}>
            {loaded ? "Começar" : "Carregando..."}
          </Text>
        </Pressable>
      </ScrollView>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
)
}