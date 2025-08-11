"use client";

import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { ref, set } from "firebase/database";
// import { auth, db } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { auth, db } from "@/lib/firebase";
import { createUser, getUsers, listenUsers } from "@/lib/db";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // 2. Update profile with name
      await updateProfile(user, {
        displayName: formData.name,
      });

      // 3. Save user data in Firebase Realtime Database
      //   await set(ref(db, "users/" + user.uid), {
      //     name: formData.name,
      //     email: formData.email,
      //     createdAt: new Date().toISOString(),
      //   });

      alert("User registered successfully!");
      router.push("/login"); // redirect to login
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  };

  useEffect(() => {
    createUser({
      name: "Anurag",
      staffId:"shivGuru123",
      email: "anurag@example.com",
      password: "securePassword123",
      role: "admin",
      age: 23,
      active: true,
    });
    getUsers();
    listenUsers(); // keeps listening to changes
  }, []);

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your name"
        required
        onChange={handleChange}
        value={formData.name}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        onChange={handleChange}
        value={formData.email}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        onChange={handleChange}
        value={formData.password}
      />
      <button type="submit">Register</button>
    </form>
  );
}
