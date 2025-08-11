import { dbreal } from "./firebase";
import {
  child,
  get,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";

// models/User.ts
export interface User {
  staffId: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "user"; // restricts role values
  age: number;
  active: boolean;
}


// create new staff 
export const createUser = async (user: User) => {
  const usersRef = ref(dbreal, "users"); // "users" is like a table name
  const newUserRef = push(usersRef); // auto-generate ID
  await set(newUserRef, user);
  console.log("User created with ID:", newUserRef.key);
};

// login api check staffId and password is correct or not 
export const loginUser = async (staffId: string, password: string): Promise<User | null> => {
  const dbRef = ref(dbreal);
  const snapshot = await get(child(dbRef, "users"));

  if (snapshot.exists()) {
    const users = snapshot.val();

    // Find user by staffId & password
    const userKey = Object.keys(users).find(
      (key) => users[key].staffId === staffId && users[key].password === password
    );

    return userKey ? { id: userKey, ...users[userKey] } : null;
  } else {
    return null;
  }
};

// READ ALL
export const getUsers = async (): Promise<Record<string, User> | null> => {
  const dbRef = ref(dbreal);
  const snapshot = await get(child(dbRef, "users"));
  return snapshot.exists() ? snapshot.val() : null;
};

// get single user by id
// export const getUserById = async (id: string, updatedData: Partial<User>) => {
//   const docRef = doc(db, "users", id);
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     console.log("User:", docSnap.data());
//   } else {
//     console.log("No such document!");
//   }
// };

// UPDATE
export const updateUser = async (id: string, updatedData: Partial<User>) => {
  const userRef = ref(dbreal, `users/${id}`);
  await update(userRef, updatedData);
  console.log("User updated successfully");
};

// DELETE
export const deleteUser = async (id: string) => {
  const userRef = ref(dbreal, `users/${id}`);
  await remove(userRef);
  console.log("User deleted successfully");
};

// LISTEN REAL-TIME
export const listenUsers = () => {
  const usersRef = ref(dbreal, "users");
  onValue(usersRef, (snapshot) => {
    console.log("Real-time users:", snapshot.val());
  });
};
