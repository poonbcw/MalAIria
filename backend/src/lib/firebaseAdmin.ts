// import admin from "firebase-admin";
// import serviceAccount from "../../firebase-service-account.json";

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
//   });
// }

// export default admin;


import admin from "firebase-admin";

// ลบบรรทัดที่ import serviceAccount จากไฟล์ .json ออก
// แล้วใช้การดึงค่าจาก Environment Variable แทน

if (!admin.apps.length) {
  try {
    // ดึงค่าจากตัวแปรที่เราจะไปตั้งใน Vercel
    const serviceAccountData = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");

    // แก้ไขปัญหาเรื่องเครื่องหมายขึ้นบรรทัดใหม่ใน Private Key (พบบ่อยมากบน Cloud)
    if (serviceAccountData.private_key) {
      serviceAccountData.private_key = serviceAccountData.private_key.replace(/\\n/g, '\n');
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountData as admin.ServiceAccount),
    });
    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
  }
}

export default admin;