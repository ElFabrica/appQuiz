import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  logo: {
    width: 120, // w-30
    height: 48, // h-12
    position: 'absolute',
    top: 20,
    right: 20,
  },
  animation: {
    width: '50%',
    height: '25%',
  },
  congrats: {
    color: '#3B82F6', // text-blue-500
    fontWeight: '500',
    fontSize: 40, // text-5xl ~40px
    marginBottom: 12,
    lineHeight: 48,
    textAlign: 'center',
  },
  score: {
    color: '#3B82F6',
    fontWeight: '500',
    fontSize: 24, // text-3xl
    marginBottom: 20,
    lineHeight: 36,
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
    fontSize: 24, // text-2xl
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
