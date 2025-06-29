import { createStore } from "tinybase";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";
import * as SQLite from 'expo-sqlite';

//Abre (ou cria se não existir) um banco de dados local chamado database.db usando SQLite no ambiente do expo
const db = SQLite.openDatabaseSync("database.db");

//Cria a varibável que iremos usar de referência para manipular a tabela de usera no TinyBase e no SQLite
const TABLE_NAME = "usersQuestionario";

//Cria um banco de dados na memórioa do tinybase
const store = createStore();
store.setTable(TABLE_NAME, {}); // Inicializa a tabela de users na memória

//Cria um sincronizador entra o store em memória (Tinybase) e o banco de dados SQLite
const persister = createExpoSqlitePersister(store, db);

//Função que inicializa o banco
const initializeStore = async () => {
  await persister.load();          // Carrega dados existentes
  await persister.startAutoSave(); // Ativa autosave
};
//Função que limpa os bancos
const clearTable = async () => {
  store.delTable(TABLE_NAME);      // 🔥 Remove a tabela da memória
  await persister.save();          // Salva alteração no banco
  await persister.load();          // Recarrega do banco (agora vazio)
};

export { store, TABLE_NAME, initializeStore, persister, clearTable };
