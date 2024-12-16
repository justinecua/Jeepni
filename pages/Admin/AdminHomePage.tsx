import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; 
import LinearGradient from 'react-native-linear-gradient';
import AdminBottomNavBar from './AdminBottomNavbar';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminHomePage = ({ onNavigate, username, onRoutePage }) => {
  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0, 0]); 

  const [tallyData, setTallyData] = useState({
    total_accounts: 0,
    total_users: 0,
    total_drivers: 0,
  });

  useEffect(() => {
    const fetchTallyData = async () => {
      try {
        const response = await axios.post('http://34.162.235.125/JeepNi/tallyAccounts.php');
        console.log(response.data);
        if (response.data.success) {
          const weekData = response.data.data;
          const totals = response.data.totals;

          const dataArray = Object.values(weekData);
          setChartData(dataArray); // Set chart data for weekly overview
          setTallyData(totals); // Set overall totals
        } else {
          console.error('Error fetching tally data:', response.data.message);
          setChartData([0, 0, 0, 0, 0, 0, 0]); 
          setTallyData({
            total_accounts: 0,
            total_users: 0,
            total_drivers: 0,
          });
        }
      } catch (error) {
        console.error('Error:', error);
        setChartData([0, 0, 0, 0, 0, 0, 0]);
        setTallyData({
          total_accounts: 0,
          total_users: 0,
          total_drivers: 0,
        });
      }
    };

    fetchTallyData();
  }, []);

  const adminTasks = [
    { title: 'Manage Accounts', count: 250, colors: ['#1A9B88', '#1D616D'] },
    { title: 'Review Routes', count: 45, colors: ['#145DA0', '#1A83B5'], onPress: onRoutePage},
    { title: 'Monitor Bounds', count: 30, colors: ['#F7B267', '#F78542'] },
    { title: 'Verify Drivers', count: 120, colors: ['#A63E8E', '#531C66'] },
  ];

  const recentDrivers = [
    { name: 'John Doe', status: 'Verified', image: 'https://via.placeholder.com/50' },
    { name: 'Jane Smith', status: 'Pending', image: 'https://via.placeholder.com/50' },
    { name: 'Paul Johnson', status: 'Verified', image: 'https://via.placeholder.com/50' },
  ];

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good morning {username}!</Text>
          <Text style={styles.context}>Ready to manage today's tasks?</Text>
        </View>

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Weekly Account Overview</Text>
          <LineChart
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], 
              datasets: [
                {
                  data: chartData, 
                },
              ],
            }}
            width={370}
            height={200} 
            chartConfig={{
              backgroundColor: '#1A9B88',
              backgroundGradientFrom: '#1A9B88',
              backgroundGradientTo: '#1D616D',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <View style={styles.tallyContainer}>
          <Text style={styles.tallyTitle}>Account Summary</Text>
          <View style={styles.tallyItem}>
            <Text style={styles.tallyLabel}>Total Accounts:</Text>
            <Text style={styles.tallyValue}>{tallyData.total_accounts}</Text>
          </View>
          <View style={styles.tallyItem}>
            <Text style={styles.tallyLabel}>Users:</Text>
            <Text style={styles.tallyValue}>{tallyData.total_users}</Text>
          </View>
          <View style={styles.tallyItem}>
            <Text style={styles.tallyLabel}>Drivers:</Text>
            <Text style={styles.tallyValue}>{tallyData.total_drivers}</Text>
          </View>
        </View>

        <View style={styles.recentDriversContainer}>
          <Text style={styles.recentDriversTitle}>Recent Driver Registrations</Text>
          {recentDrivers.map((driver, index) => (
            <View key={index} style={styles.driverCard}>
              <Image source={{ uri: driver.image }} style={styles.driverImage} />
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>{driver.name}</Text>
                <Text style={styles.driverStatus}>{driver.status}</Text>
              </View>
              <TouchableOpacity style={styles.viewDetailsButton}>
                <Text style={styles.viewDetailsText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <ScrollView style={styles.scrollView}>
          {adminTasks.map((task, index) => (
            <LinearGradient
              key={index}
              colors={task.colors}
              style={styles.card}
            >
              <Text style={styles.title}>{task.title}</Text>
              <Text style={styles.count}>{task.count} items to review</Text>
              <TouchableOpacity
                style={styles.arrowContainer}
                onPress={task.onPress}
              >
                <Text style={styles.arrow}>➜</Text>
              </TouchableOpacity>
            </LinearGradient>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  tallyContainer: {
    marginBottom: 20,
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
  },
  tallyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  tallyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tallyLabel: {
    fontSize: 16,
    color: '#333',
  },
  tallyValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A9B88',
  },
  header: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A9B88',
    marginBottom: 3,
  },
  context: {
    fontSize: 16,
    fontWeight: '400',
    color: '#555',
  },
  chartContainer: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 15,
  },
  recentDriversContainer: {
    marginBottom: 20,
  },
  recentDriversTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
  },
  driverImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  driverStatus: {
    fontSize: 14,
    color: '#666',
  },
  viewDetailsButton: {
    backgroundColor: '#1A9B88',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  viewDetailsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    paddingVertical: 10,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  count: {
    fontSize: 16,
    color: '#fff',
  },
  arrowContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 18,
    color: '#fff',
  },
});

export default AdminHomePage;
