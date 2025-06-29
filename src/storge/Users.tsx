import { createStore } from "tinybase";
import { createExpoSqlitePersister } from "tinybase/persisters/persister-expo-sqlite";
import * as SQLite from 'expo-sqlite';

//Abre (ou cria se não existir) um banco de dados local chamado database.db usando SQLite no ambiente do expo
const db = SQLite.openDatabaseSync("database.db");

//Cria a varibável que iremos usar de referência para manipular a tabela de usera no TinyBase e no SQLite
const TABLE_NAME = "usersQuestionario";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ITEMS_STORGE_KEY = "@appQuiz:perguntas"

export type userStorge = {
    id: string,
    name: string
    email: string
    phone: string
}
//Faz uma busca de todos os itens dessa tabela
async function get(): Promise<userStorge[]> {
    try {
        const storge = await AsyncStorage.getItem(ITEMS_STORGE_KEY)

        return storge ? JSON.parse(storge) : []

    } catch (error) {
        throw new Error("ITEMS_GET: " + error)
    }
}
//Faz um filtro de todos os itens com base num parâmetro
//Salva os itens dentro do banco de dados do dispositivo
async function save(items: userStorge[]): Promise<void> {
    try {
        await AsyncStorage.setItem(ITEMS_STORGE_KEY, JSON.stringify(items))
    } catch (error) {
        throw new Error("ITEMS_SAVE: " + error)
    }
}
//Adiciona um item no banco de dados do dispositivo
async function add(newItem: userStorge): Promise<userStorge[]> {
    const items = await get()
    const updatedItems = [...items, newItem]
    await save(updatedItems)

    return updatedItems 

}
//Remove um item do banco de dadods do dispositivo
async function remove(id: string): Promise<void> {
    const items = await get()
    const updatedItems = items.filter((item) => item.id !== id)
    save(updatedItems)
}
//Limpa os itens do banco de dados do dispositivo
async function clear(): Promise<void> {
    try {
        await AsyncStorage.removeItem(ITEMS_STORGE_KEY)
    } catch (error) {
        throw new Error("ITEMS_CLEAR: " + error)
    }
}
//Altera o status do item 



export const UserStorge = {
    get,
    save,
    add,
    remove,
    clear
}
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
