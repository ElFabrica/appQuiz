import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
      wrapper: {
    width: "100%",
  },
    input: {
        color:"#333333",
        fontSize: RFValue(22),
        backgroundColor: "#FFFFFF",
        fontWeight: 600,
        borderWidth: 2,
        borderRadius: 8,
        borderColor:"#46f23c",
        padding: 16,
        width: "100%",
        minHeight: "auto",

    },
    inputFocused: {
    borderColor: "#A26201"
    }
})