import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { Form } from "@/app/Form/Form";
import { Home } from "@/app/Home/Home";
import { Questions } from "@/app/Questions/Questions";
import { Score } from "@/app/Score/Score";
import { Users } from "@/app/Users/Users";
import { Admin } from "@/app/Admin/Admin";

export type StackRoutesList ={
    Home: undefined
    Form: undefined 
    Questions: undefined
    Score: {score: number}
    Users: undefined
    Admin: undefined


}

export type StackRoutesProps<T extends keyof StackRoutesList> = NativeStackScreenProps<StackRoutesList, T>

const Stack = createNativeStackNavigator<StackRoutesList>()

export function StacksRoutes() {
    return(
        <Stack.Navigator initialRouteName="Admin">
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Form" component={Form}/>  
            <Stack.Screen name="Questions" component={Questions}/>  
            <Stack.Screen name="Score" component={Score}/>  
            <Stack.Screen name="Users" component={Users}/>  
            <Stack.Screen name="Admin" component={Admin}/>  



        </Stack.Navigator>

    )
}