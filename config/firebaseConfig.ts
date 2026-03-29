import { initializeApp, cert, getApps, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { ServiceAccount } from "firebase-admin";

import serviceAccount from "../assingment5-f3ea7-firebase-adminsdk-fbsvc-8e3c510c3f.json";

let firebaseApplication: App;

if (!getApps().length) {
    firebaseApplication = initializeApp({
        credential: cert(serviceAccount as ServiceAccount),
    });
} else {
    firebaseApplication = getApps()[0] as App;
}

const db: Firestore = getFirestore(firebaseApplication);

export { db };