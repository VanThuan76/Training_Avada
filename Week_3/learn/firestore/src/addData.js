const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

(async () => {
  const testRef = db.collection("test");
  const data = {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
  };
  await testRef.add(data);
})();
