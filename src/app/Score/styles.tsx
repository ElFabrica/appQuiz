import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginBottom: RFValue(80)
  },
  logo: {
    width: RFValue(120), 
    height: RFValue(48), 
    position: 'absolute',
    top: 20,
    right: 20,
  },
  animation: {
    width: '50%',
    height: '25%',
  },
  congrats: {
    color: '#f81fb4', // text-blue-500
    fontWeight: '500',
    fontSize: RFValue(40), // text-5xl ~40px
    marginBottom: 12,
    textAlign: 'center',
  },
  score: {
    color: '#f81fb4',
    fontWeight: '500',
    fontSize: RFValue(24), // text-3xl
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#1E40AF', // bg-blue-800
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: RFValue(24), // text-2xl
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
