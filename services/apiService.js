// Internee.pk ki social media data (demo/mock data)

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const fetchInstagramData = async () => {
  await delay(1000);
  return {
    username: 'internee.pk',
    followers: 4206,
    following: 2,
    posts: 213,
    engagementRate: 4.7,
    weeklyGrowth: [
      { day: 'Mon', value: 3900 },
      { day: 'Tue', value: 3980 },
      { day: 'Wed', value: 4050 },
      { day: 'Thu', value: 4110 },
      { day: 'Fri', value: 4150 },
      { day: 'Sat', value: 4180 },
      { day: 'Sun', value: 4206 },
    ],
    topPosts: [
      { id: 1, likes: 340, comments: 45, caption: 'Internship Opportunity!' },
      { id: 2, likes: 289, comments: 32, caption: 'Success Story 🎉' },
      { id: 3, likes: 256, comments: 28, caption: 'Behind the scenes' },
    ],
  };
};

export const fetchFacebookData = async () => {
  await delay(1000);
  return {
    pageName: 'Internee.pk',
    followers: 1200,              // ← 1.2K = 1200
    following: 1,                 // ← Aapka number
    posts: 697,                   // ← Aapka number
    engagementRate: 3.9,
    weeklyGrowth: [
      { day: 'Mon', value: 1050 },
      { day: 'Tue', value: 1090 },
      { day: 'Wed', value: 1120 },
      { day: 'Thu', value: 1150 },
      { day: 'Fri', value: 1170 },
      { day: 'Sat', value: 1190 },
      { day: 'Sun', value: 1200 },    // ← Last value = followers
    ],
    topPosts: [
      { id: 1, likes: 124, comments: 18, shares: 9, caption: 'New internship batch announced!' },
      { id: 2, likes: 98, comments: 14, shares: 6, caption: 'Success story of our intern' },
      { id: 3, likes: 85, comments: 12, shares: 4, caption: 'Hiring frontend developers' },
    ],
  };
};