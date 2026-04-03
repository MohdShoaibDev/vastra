import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

async function placeOrder() {
  const uid = auth.currentUser?.uid;
  if (!uid) return;

  try {
    // 1. Get user cart items
    const cartRef = collection(db, 'users', uid, 'cart');
    const cartSnapshot = await getDocs(cartRef);

    if (cartSnapshot.empty) {
      console.log('Cart is empty');
      return;
    }

    const items = cartSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0,
    );

    const batch = writeBatch(db);

    const orderRef = doc(collection(db, 'users', uid, 'orders'));
    batch.set(orderRef, {
      items,
      totalAmount,
      status: 'placed',
      createdAt: serverTimestamp(),
    });

    cartSnapshot.docs.forEach(docSnap => batch.delete(docSnap.ref));
    await batch.commit();

    console.log('Order placed successfully!');
  } catch (error) {
    console.error('Failed to place order:', error);
  }
}
