import AsyncStorage from "@react-native-async-storage/async-storage";

const ITEMS_STORGE_KEY = "@appQuiz:perguntas"

export type Task = {
    id: string,
    title: string
    points: number
}
//Faz uma busca de todos os itens dessa tabela
async function getTask(): Promise<Task[]> {
    try {
        const storge = await AsyncStorage.getItem(ITEMS_STORGE_KEY)

        return storge ? JSON.parse(storge) : []

    } catch (error) {
        throw new Error("ITEMS_GET: " + error)
    }
}
//Faz um filtro de todos os itens com base num parâmetro
//Salva os itens dentro do banco de dados do dispositivo
async function saveTask(items: Task[]): Promise<void> {
    try {
        await AsyncStorage.setItem(ITEMS_STORGE_KEY, JSON.stringify(items))
    } catch (error) {
        throw new Error("ITEMS_SAVE: " + error)
    }
}
//Adiciona um item no banco de dados do dispositivo
async function addTask(newItem: Task): Promise<Task[]> {
    const items = await getTask()
    const updatedItems = [...items, newItem]
    await saveTask(updatedItems)

    return updatedItems 

}
//Remove um item do banco de dadods do dispositivo
async function removeTask(id: string): Promise<void> {
    const items = await getTask()
    const updatedItems = items.filter((item) => item.id !== id)
    saveTask(updatedItems)
}
//Limpa os itens do banco de dados do dispositivo
async function clearTask(): Promise<void> {
    try {
        await AsyncStorage.removeItem(ITEMS_STORGE_KEY)
    } catch (error) {
        throw new Error("ITEMS_CLEAR: " + error)
    }
}
//Altera o status do item 



export const itemsStorge = {
    getTask,
    saveTask,
    addTask,
    removeTask,
    clearTask
}