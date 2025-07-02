import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { Form } from "@/app/Form/Form";
import { Home } from "@/app/Home/Home";
import { Questions } from "@/app/Questions/Questions";
import { Score } from "@/app/Score/Score";
import { Users } from "@/app/Users/Users";
import { Admin } from "@/app/Admin/Admin";
import { Instructions } from "@/app/Instructions/Instructions";

export type StackRoutesList = {
  home: undefined;
  form: undefined;
  questions: undefined;
  score: { score: number };
  users: undefined;
  admin: undefined;
  instructions: undefined;
};

export type StackRoutesProps<T extends keyof StackRoutesList> =
  NativeStackScreenProps<StackRoutesList, T>;

const Stack = createNativeStackNavigator<StackRoutesList>();

export function StacksRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen
        name="form"
        component={Form}
        options={{
          headerShown: true,
          title: "Formulário",
        }}
      />
      <Stack.Screen name="questions" component={Questions} />
      <Stack.Screen name="score" component={Score} />
      <Stack.Screen
        name="users"
        component={Users}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="instructions"
        component={Instructions}
        options={{
          headerShown: true,
          title: "Regras",
        }}
      />
      <Stack.Screen
        name="admin"
        component={Admin}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
}
