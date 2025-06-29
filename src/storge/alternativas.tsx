import AsyncStorage from "@react-native-async-storage/async-storage";

const ITEMS_STORGE_KEY = "@appQuiz:perguntas"

export type choice = {
    id: string,
    title: string
    task: string
}
//Faz uma busca de todos os itens dessa tabela
async function getChoice(): Promise<choice[]> {
    try {
        const storge = await AsyncStorage.getItem(ITEMS_STORGE_KEY)

        return storge ? JSON.parse(storge) : []

    } catch (error) {
        throw new Error("ITEMS_GET: " + error)
    }
}
//Faz um filtro de todos os itens com base num parâmetro
//Salva os itens dentro do banco de dados do dispositivo
async function saveChoice(items: choice[]): Promise<void> {
    try {
        await AsyncStorage.setItem(ITEMS_STORGE_KEY, JSON.stringify(items))
    } catch (error) {
        throw new Error("ITEMS_SAVE: " + error)
    }
}
//Adiciona um item no banco de dados do dispositivo
async function addChoice(newItem: choice): Promise<choice[]> {
    const items = await getChoice()
    const updatedItems = [...items, newItem]
    await saveChoice(updatedItems)

    return updatedItems 

}
//Remove um item do banco de dadods do dispositivo
async function removeChoice(id: string): Promise<void> {
    const items = await getChoice()
    const updatedItems = items.filter((item) => item.id !== id)
    saveChoice(updatedItems)
}
//Limpa os itens do banco de dados do dispositivo
async function clearChoice(): Promise<void> {
    try {
        await AsyncStorage.removeItem(ITEMS_STORGE_KEY)
    } catch (error) {
        throw new Error("ITEMS_CLEAR: " + error)
    }
}
//Altera o status do item 



export const itemsStorge = {
    getChoice,
    saveChoice,
    addChoice,
    removeChoice,
    clearChoice
}