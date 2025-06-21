import { createContext, useContext, useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();

  // Load cart from Firebase on login
  useEffect(() => {
    const fetchCart = async () => {
      if (!user) return;
      const q = query(collection(db, "carts"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ ...doc.data().item, docId: doc.id }));
      setCart(items);
    };
    fetchCart();
  }, [user]);

 const addToCart = async (newItem) => {
  if (!newItem || !newItem.name) {
    console.error("Invalid item passed to addToCart", newItem);
    return;
  }

  // Generate unique ID based on name and maybe size later
  const itemId = newItem.id || newItem.name.toLowerCase().replace(/\s+/g, "-");

  const existingItem = cart.find(item => item.id === itemId);

  if (existingItem) {
    const updatedCart = cart.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);

    if (user) {
      const q = query(
        collection(db, "carts"),
        where("userId", "==", user.uid),
        where("item.id", "==", itemId)
      );
      const snapshot = await getDocs(q);
      snapshot.forEach(async (docSnap) => {
        const prevQty = docSnap.data().item.quantity || 1;
        await updateDoc(doc(db, "carts", docSnap.id), {
          item: { ...newItem, id: itemId, quantity: prevQty + 1 },
        });
      });
    }
  } else {
    const itemWithQty = { ...newItem, id: itemId, quantity: 1 };
    setCart([...cart, itemWithQty]);

    if (user) {
      await addDoc(collection(db, "carts"), {
        userId: user.uid,
        item: itemWithQty,
        timestamp: new Date(),
      });
    }
  }
};



  const removeFromCart = async (itemToRemove) => {
  if (!itemToRemove || !itemToRemove.id) {
    console.error("Invalid item for removal", itemToRemove);
    return;
  }

    setCart(prev => prev.filter(item => item.id !== itemToRemove.id));

    if (user) {
      const q = query(
        collection(db, "carts"),
        where("userId", "==", user.uid),
        where("item.id", "==", itemToRemove.id)
      );
      const snapshot = await getDocs(q);
      snapshot.forEach(docSnap => {
        deleteDoc(docSnap.ref);
      });
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
