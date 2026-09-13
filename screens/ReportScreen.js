import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { fetchInstagramData, fetchFacebookData } from '../services/apiService';

export default function ReportScreen() {
  const [insta, setInsta] = useState(null);
  const [facebook, setFacebook] = useState(null);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    Promise.all([fetchInstagramData(), fetchFacebookData()]).then(([i, f]) => {
      setInsta(i);
      setFacebook(f);
    });
  }, []);

  const generatePDF = async () => {
    if (!insta || !facebook) {
      Alert.alert('Please wait', 'Data is still loading...');
      return;
    }
    setGenerating(true);

    const html = `
      <html>
        <head>
          <style>
            body { font-family: Helvetica; padding: 24px; color: #222; }
            h1 { color: #f51878; text-align: center; }
            h2 { color: #333; border-bottom: 2px solid #f51878; padding-bottom: 4px; margin-top: 24px; }
            .card { background: #F5F6FA; padding: 12px; border-radius: 8px; margin: 8px 0; }
            .row { display: flex; justify-content: space-between; padding: 6px 0; }
            .label { color: #666; }
            .value { font-weight: bold; }
            .footer { text-align: center; margin-top: 40px; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <h1>Internee.pk Social Media Report</h1>
          <p style="text-align:center;color:#666;">Generated on ${new Date().toLocaleString()}</p>

          <h2>📸 Instagram - @${insta.username}</h2>
          <div class="card">
            <div class="row"><span class="label">Followers</span><span class="value">${insta.followers.toLocaleString()}</span></div>
            <div class="row"><span class="label">Following</span><span class="value">${insta.following}</span></div>
            <div class="row"><span class="label">Posts</span><span class="value">${insta.posts}</span></div>
            <div class="row"><span class="label">Engagement Rate</span><span class="value">${insta.engagementRate}%</span></div>
          </div>

          <h2>📘 Facebook - ${facebook.pageName}</h2>
          <div class="card">
            <div class="row"><span class="label">Followers</span><span class="value">${facebook.followers.toLocaleString()}</span></div>
            <div class="row"><span class="label">Following</span><span class="value">${facebook.following}</span></div>
            <div class="row"><span class="label">Posts</span><span class="value">${facebook.posts}</span></div>
            <div class="row"><span class="label">Engagement Rate</span><span class="value">${facebook.engagementRate}%</span></div>
          </div>

          <h2>📈 Combined Summary</h2>
          <div class="card">
            <div class="row"><span class="label">Total Followers</span><span class="value">${(insta.followers + facebook.followers).toLocaleString()}</span></div>
            <div class="row"><span class="label">Total Content</span><span class="value">${insta.posts + facebook.posts}</span></div>
            <div class="row"><span class="label">Avg Engagement</span><span class="value">${((insta.engagementRate + facebook.engagementRate) / 2).toFixed(2)}%</span></div>
          </div>

          <div class="footer">© Internee.pk - Social Media Analytics Dashboard</div>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Export Report',
        });
      } else {
        Alert.alert('PDF Saved', `File saved at: ${uri}`);
      }
    } catch (e) {
      Alert.alert('Error', 'PDF generation failed: ' + e.message);
    }
    setGenerating(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="document-text" size={64} color="#f51878" />
        <Text style={styles.title}>Export Analytics Report</Text>
        <Text style={styles.subtitle}>
          Generate a complete Instagram and Facebook analytics report as PDF and share it.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>📄 Report Includes:</Text>
        <Text style={styles.infoItem}>• Followers & Following count</Text>
        <Text style={styles.infoItem}>• Total posts</Text>
        <Text style={styles.infoItem}>• Engagement rates</Text>
        <Text style={styles.infoItem}>• Combined summary</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, generating && { opacity: 0.6 }]}
        onPress={generatePDF}
        disabled={generating}
      >
        <Ionicons name="download" size={22} color="#fff" />
        <Text style={styles.buttonText}>
          {generating ? 'Generating...' : 'Generate & Share PDF'}
        </Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  header: { alignItems: 'center', padding: 30 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginTop: 12 },
  subtitle: { textAlign: 'center', color: '#777', marginTop: 8, paddingHorizontal: 20 },
  infoCard: { backgroundColor: '#fff', margin: 16, padding: 20, borderRadius: 12, elevation: 2 },
  infoTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  infoItem: { fontSize: 14, color: '#555', marginVertical: 4 },
  button: {
    flexDirection: 'row',
    backgroundColor: '#f51878',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
});