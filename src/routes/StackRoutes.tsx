import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { Form } from "@/app/Form/Form";
import { Home } from "@/app/Home/Home";
import { Questions } from "@/app/Questions/Questions";
import { Score } from "@/app/Score/Score";
import { Users } from "@/app/Users/Users";
import { Admin } from "@/app/Admin/Admin";
import { Instructions } from "@/app/Instructions/Instructions";

export type StackRoutesList = {
    Home: undefined
    Form: undefined
    Questions: undefined
    Score: { score: number }
    Users: undefined
    Admin: undefined
    Instructions: undefined


}

export type StackRoutesProps<T extends keyof StackRoutesList> = NativeStackScreenProps<StackRoutesList, T>

const Stack = createNativeStackNavigator<StackRoutesList>()

export function StacksRoutes() {
    return (
        <Stack.Navigator initialRouteName="Home" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Form" component={Form} options={{
                headerShown: true
            }} />
            <Stack.Screen name="Questions" component={Questions} />
            <Stack.Screen name="Score" component={Score} />
            <Stack.Screen name="Users" component={Users} options={{
                headerShown: true
            }} />
            <Stack.Screen name="Instructions" component={Instructions} options={{
                headerShown: true
            }} />
            <Stack.Screen name="Admin" component={Admin} options={{
                headerShown: true
            }} />



        </Stack.Navigator>

    )
}