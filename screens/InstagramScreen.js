import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MetricCard from '../components/MetricCard';
import ChartComponent from '../components/ChartComponent';
import { fetchInstagramData } from '../services/apiService';

export default function InstagramScreen() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchInstagramData().then(setData);
  }, []);

  if (!data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#E1306C" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profile}>
        <Ionicons name="logo-instagram" size={48} color="#E1306C" />
        <Text style={styles.username}>@{data.username}</Text>
      </View>

      <MetricCard title="Followers" value={data.followers.toLocaleString()} icon="people" color="#E1306C" change={4.1} />
      <MetricCard title="Following" value={data.following.toString()} icon="person-add" color="#C13584" />
      <MetricCard title="Posts" value={data.posts.toString()} icon="images" color="#833AB4" />
      <MetricCard title="Engagement Rate" value={`${data.engagementRate}%`} icon="heart" color="#FD1D1D" change={0.6} />

      <ChartComponent data={data.weeklyGrowth} title="Follower Growth" color="#E1306C" />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏆 Top Posts</Text>
        {data.topPosts.map((p) => (
          <View key={p.id} style={styles.post}>
            <Text style={styles.postText}>{p.caption}</Text>
            <View style={styles.row}>
              <Text style={styles.stat}>❤️ {p.likes}</Text>
              <Text style={styles.stat}>💬 {p.comments}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  profile: { alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  username: { fontSize: 20, fontWeight: 'bold', color: '#333', marginTop: 8 },
  section: { margin: 16, padding: 16, backgroundColor: '#fff', borderRadius: 12, elevation: 2 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 12, color: '#333' },
  post: { padding: 12, backgroundColor: '#F9F9F9', borderRadius: 8, marginBottom: 8 },
  postText: { fontSize: 14, color: '#333', marginBottom: 6 },
  row: { flexDirection: 'row', gap: 16 },
  stat: { fontSize: 13, color: '#666' },
});