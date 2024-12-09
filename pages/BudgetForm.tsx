import React, { useState } from 'react';
import { View, StyleSheet, Image, TextInput, Alert, Button } from 'react-native';

import axios from 'axios';

const BudgetForm = () => {
  const [amount, setAmount] = useState('');


  const submitBudget = () => {
    axios.post('http://192.168.43.245/JeepNi/register.php', {amount})
      .then(response => {
        Alert.alert("Success", response.data.message);
      })
      .catch(error =>{
        console.error(error);
        Alert.alert("Error");
      });
  };


  return (
    <View style={styles.container}>
      <TextInput placeholder="Input amount"
      value={amount}
      onChangeText={setAmount}
      keyboardType="numeric"
      />
      <Button title="Submit Budget" onPress={submitBudget}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});


export default BudgetForm;