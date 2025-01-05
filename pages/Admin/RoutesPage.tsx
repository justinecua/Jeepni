import React, { useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker

const RoutePage = ({ onBack }) => {
  const [routes, setRoutes] = useState([]);
  const [bounds, setBounds] = useState([]);
  const [code, setCode] = useState('');
  const [route, setRoute] = useState('');
  const [boundId, setBoundId] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);


    const fetchRoutes = async () => {
      try {
        const response = await fetch('http://34.162.235.125/JeepNi/fetchRoutes.php');
        const data = await response.json();
        if (data.success) setRoutes(data.data);
        else Alert.alert('Error', data.message);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch routes.');
      } finally {
        setLoading(false);
      }
    };

    const fetchBounds = async () => {
      try {
        const response = await fetch('http://34.162.235.125/JeepNi/fetchBounds.php');
        const data = await response.json();
        if (data.success) setBounds(data.data); // Update to set bounds data
        else Alert.alert('Error', data.message);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch bounds.');
      }
    };

    fetchBounds();
    fetchRoutes();


  const handleSave = async () => {
    if (code && route && boundId) {
      try {
        const newRoute = { code, route, bound_id: boundId };
        const response = await fetch('http://34.162.235.125/JeepNi/addRoute.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRoute),
        });
        const data = await response.json();
        if (data.success) {
          setRoutes((prev) => [...prev, data.data]);
          setModalVisible(false);
          setCode('');
          setRoute('');
          setBoundId('');
	  fetchRoutes();
	} else Alert.alert('Success', data.message);
 
      } catch (error) {
        Alert.alert('Error', 'Failed to save route.');
      }
    } else {
      Alert.alert('Validation Error', 'Please fill in all fields.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.routeItem}>
      <Text style={styles.routeText}>Code: {item.code}</Text>
      <Text style={styles.routeText}>Route: {item.route}</Text>
      <Text style={styles.routeText}>Bound Name: {item.boundName}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Routes</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4FD1C5" />
      ) : (
        <FlatList
          data={routes}
          renderItem={renderItem}
          keyExtractor={(item) => item.route_id.toString()}
          style={styles.routeList}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Route</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Route</Text>
            <TextInput
              style={styles.input}
              value={code}
              onChangeText={setCode}
              placeholder="Code"
              placeholderTextColor="#A0AEC0"
            />
            <TextInput
              style={styles.input}
              value={route}
              onChangeText={setRoute}
              placeholder="Route"
              placeholderTextColor="#A0AEC0"
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={boundId}
                onValueChange={(itemValue) => setBoundId(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Bound" value="" />
                {bounds.map((bound) => (
                  <Picker.Item
                    key={bound.bound_id}
                    label={bound.boundName}
                    value={bound.bound_id}
                  />
                ))}
              </Picker>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    backgroundColor: '#4A5568',
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    color: '#A0AEC0',
  },
  container: {
    flex: 1,
    backgroundColor: '#1A202C',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4FD1C5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  routeList: {
    flex: 1,
    width: '100%',
  },
  routeItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  routeText: {
    fontSize: 16,
    color: '#A0AEC0',
  },
  addButton: {
    backgroundColor: '#4FD1C5',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#1A202C',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#2D3748',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 43,
    backgroundColor: '#4A5568',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#A0AEC0',
  },
  modalButtons: {
    flexDirection: 'column',
    gap: 10,
  },
  cancelButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 13,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4FD1C5',
    padding: 13,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#1A202C',
    fontWeight: 'bold',
  },
  buttonTextCancel: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RoutePage;
