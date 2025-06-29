export type RootStackParamList = {
    Home: undefined
    Form: undefined
    Questions: undefined
    Score: { score: number }
    Users: undefined
}

declare global {
    namespace ReactNavigation {
        interface RootParamList extends
            RootStackParamList { }
    }
}