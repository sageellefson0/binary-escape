const firebaseConfig = {
    apiKey: "AIzaSyCHqX0uxfuSvT2fMcW_EzpZ-i-NVDX-_zw",
    authDomain: "binary-escape-4ad92.firebaseapp.com",
    projectId: "binary-escape-4ad92",
    storageBucket: "binary-escape-4ad92.appspot.com",
    messagingSenderId: "695253692594",
    appId: "1:695253692594:web:811c93ca1f512db98e59ab",
    measurementId: "G-ZC947WKZVS"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

// Log-Out Button
const logoutButton = document.getElementById('logoutButton');

onAuthStateChanged(auth, (user) => {
  if (!user) {
    // User is not logged in, redirect to login page or home page
    window.location.href = '../../index.html'; // Adjust path as necessary
  }
});

logoutButton.addEventListener('click', async () => {
  try {
    await signOut(auth);
    window.location.href = '../../index.html';
      } catch (error) {
    console.error('Error signing out:', error);
  }
});