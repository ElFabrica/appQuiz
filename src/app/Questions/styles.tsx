import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 32,
    justifyContent: 'center',
  },
  progressText: {
    fontSize: 16,
    marginTop: 8,
    color: '#374151', // text-gray-700
    fontWeight: '600',
  },
  questionTitle: {
    fontSize: RFValue(24),
    marginBottom: 16,
  },
  option: {
    borderWidth: 2,
    borderColor: '#3B82F6', // border-blue-500 padrão
    backgroundColor: "#FFFFF9",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  optionCorrect: {
    backgroundColor: '#D1FAE5', // bg-green-100
    borderColor: '#10B981', // border-green-500
  },
  optionIncorrect: {
    backgroundColor: '#FECACA', // bg-red-100
    borderColor: '#EF4444', // border-red-500
  },
  optionText: {
    fontSize: 18,
  },
  nextButton: {
    backgroundColor: '#1E40AF', // bg-blue-800
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: RFValue(18),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  exitButton: {
    backgroundColor: '#EF4444', // bg-red-500
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  exitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalCancel: {
    backgroundColor: '#D1D5DB', // bg-gray-300
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modalCancelText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  modalConfirm: {
    backgroundColor: '#EF4444', // bg-red-500
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modalConfirmText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  logo: {
    width: 120, // w-30
    height: 48,  // h-12
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
