import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function ChartComponent({ data, title, color }) {
  const screenWidth = Dimensions.get('window').width - 32;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <LineChart
        data={{
          labels: data.map((d) => d.day),
          datasets: [{ data: data.map((d) => d.value) }],
        }}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => color || `rgba(108, 99, 255, ${opacity})`,
          labelColor: () => '#555',
          propsForDots: { r: '4', strokeWidth: '2', stroke: color || '#6C63FF' },
        }}
        bezier
        style={{ borderRadius: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 12,
    elevation: 3,
  },
  title: { fontSize: 15, fontWeight: 'bold', marginBottom: 8, color: '#333' },
});