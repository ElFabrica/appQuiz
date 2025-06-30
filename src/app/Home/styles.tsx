import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    width: 120,  // w-30
    height: 48,  // h-12
    position: 'absolute',
    top: 20,
    right: 20,
  },
  icon: {
    marginTop: 40,
    marginHorizontal: 12,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap:16,
    padding:8
  },
  title: {
    color: '#3B82F6', // text-blue-500
    fontWeight: '500',
    fontSize: RFValue(40), // text-5xl ~40px
    marginBottom: 20,
    lineHeight: 48,
    textAlign: 'center',
  },
  animation: {
    width: '87%',
    height: '28%',
  },
  instructionsTitle: {
    color: '#3B82F6',
    fontWeight: 'bold',
    fontSize: RFValue(24), // text-3xl
    textAlign: 'center',
    marginBottom: 20,
  },
  instructionsBox: {
    backgroundColor: '#1E40AF', // bg-blue-800
    padding: 16,
    borderRadius: 12,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  instructionsText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16, // Tailwind gap-4 ~= 16px
  },
  startButton: {
    backgroundColor: '#1E40AF',
    marginTop: 40,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 24,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    width: 320, // w-80
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: RFValue(20),
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#A855F7', // border-purple-500
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#9CA3AF', // bg-gray-400
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: '#3B82F6', // bg-blue-500
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
