import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MetricCard({ title, value, icon, color, change }) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <View style={styles.row}>
        <Ionicons name={icon} size={28} color={color} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
      {change !== undefined && (
        <Text style={[styles.change, { color: change > 0 ? '#2ecc71' : '#e74c3c' }]}>
          {change > 0 ? '▲' : '▼'} {Math.abs(change)}% this week
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderLeftWidth: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  title: { fontSize: 13, color: '#777', textTransform: 'uppercase' },
  value: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  change: { marginTop: 8, fontSize: 12, fontWeight: '600' },
});