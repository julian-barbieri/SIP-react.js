import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  formContainer: {
    width: '80%',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: 'blue',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
  }
});
