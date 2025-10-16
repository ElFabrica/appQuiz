import { useRef, useState } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import { styles } from "./style"
import { StyleSheet } from "react-native";

type Props = TextInputProps & {
    place: string
}

export function Input({ place, ...rest }: Props) {
    const [isFocused, setIsFocused] = useState(false);
    const focus = useRef<TextInput>(null)

    function handleFocus() {
        if (focus.current) {
            setIsFocused(focus.current.isFocused())
        }
    }


    return (
        <View style={styles.wrapper}>
            <TextInput style={[
                styles.input
            ]}
                placeholder={place}
                onFocus={handleFocus}
                {...rest}
            >

            </TextInput>
        </View>
    )

}