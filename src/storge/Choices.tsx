import AsyncStorage from "@react-native-async-storage/async-storage";

const ITEMS_STORGE_KEY = "@appQuiz:Choices"

export type choiceStorge = {
    id: string,
    title: string
    task: string
}
//Faz uma busca de todos os itens dessa tabela
async function get(): Promise<choiceStorge[]> {
    try {
        const storge = await AsyncStorage.getItem(ITEMS_STORGE_KEY)

        return storge ? JSON.parse(storge) : []

    } catch (error) {
        throw new Error("ITEMS_GET: " + error)
    }
}
//Faz um filtro de todos os itens com base num parâmetro
//Salva os itens dentro do banco de dados do dispositivo
async function save(items: choiceStorge[]): Promise<void> {
    try {
        await AsyncStorage.setItem(ITEMS_STORGE_KEY, JSON.stringify(items))
    } catch (error) {
        throw new Error("ITEMS_SAVE: " + error)
    }
}
//Adiciona um item no banco de dados do dispositivo
async function add(newItem: choiceStorge): Promise<choiceStorge[]> {
    const items = await get()
    const updatedItems = [...items, newItem]
    await save(updatedItems)

    return updatedItems 

}
//Remove um item do banco de dadods do dispositivo
async function remove(id: string): Promise<void> {
  const items = await get();
  const index = items.findIndex((item) => item.id === id);

  if (index !== -1) {
    const updatedItems = [
      ...items.slice(0, index),
      ...items.slice(index + 1),
    ];
    await save(updatedItems);
  }
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



export const ChoiceStorge = {
    get,
    save,
    add,
    remove,
    clear
}