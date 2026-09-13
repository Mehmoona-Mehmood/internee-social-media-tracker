import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import MetricCard from '../components/MetricCard';
import ChartComponent from '../components/ChartComponent';
import { fetchInstagramData, fetchFacebookData } from '../services/apiService';

export default function DashboardScreen() {
  const [loading, setLoading] = useState(true);
  const [insta, setInsta] = useState(null);
  const [facebook, setFacebook] = useState(null);

  useEffect(() => {
    const load = async () => {
      const i = await fetchInstagramData();
      const f = await fetchFacebookData();
      setInsta(i);
      setFacebook(f);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f51878" />
        <Text style={{ marginTop: 12, color: '#666' }}>Loading analytics...</Text>
      </View>
    );
  }

  const totalFollowers = insta.followers + facebook.followers;
  const totalPosts = insta.posts + facebook.posts;
  const avgEngagement = ((insta.engagementRate + facebook.engagementRate) / 2).toFixed(1);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📊 Internee.pk Overview</Text>
        <Text style={styles.headerSub}>Social Media Performance</Text>
      </View>

      <MetricCard
        title="Total Followers"
        value={totalFollowers.toLocaleString()}
        icon="people"
        color="#6C63FF"
        change={4.5}
      />
      <MetricCard
        title="Total Posts"
        value={totalPosts.toString()}
        icon="images"
        color="#FF6B6B"
        change={2.8}
      />
      <MetricCard
        title="Avg Engagement Rate"
        value={`${avgEngagement}%`}
        icon="trending-up"
        color="#4ECDC4"
        change={1.4}
      />

      <ChartComponent
        data={insta.weeklyGrowth}
        title="Instagram Followers (Last 7 days)"
        color="#E1306C"
      />
      <ChartComponent
        data={facebook.weeklyGrowth}
        title="Facebook Followers (Last 7 days)"
        color="#1877F2"
      />

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { backgroundColor: '#f51878', padding: 20, paddingTop: 24 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  headerSub: { fontSize: 13, color: '#E0DEFF', marginTop: 4 },
});