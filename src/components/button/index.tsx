import { TouchableOpacity, TouchableOpacityProps, Text } from "react-native";
import { styles } from "./style"
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

type Props = TouchableOpacityProps & {
    title: string
    size?: number
    disable?: boolean
}

export function Button({ title, size = 20, disable, ...rest }: Props) {

    return (
        <TouchableOpacity className=" rounded-3xl bg-cyan-500 py-6 px-6 w-full justify-center items-center"  {...rest} activeOpacity={0.9} >
            <Text style={[styles.title, { fontSize: RFValue(size) }]}>{title}</Text>
        </TouchableOpacity>
    )

}