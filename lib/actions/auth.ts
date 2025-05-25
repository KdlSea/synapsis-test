"use server";

import axios from "axios";
import { setSession } from "./sessions";
import { redirect } from "next/navigation";
import { match } from "assert";

export const signOut = async () => {
  //   await clearSession();
  return redirect("/log-in");
};
export const signIn = async (userData: GuestEmail, token: string) => {
  try {
    const response = await axios.get("https://gorest.co.in/public/v2/users", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const index = response.data.findIndex((e) => e.email === userData.email);

    if (index !== -1) {
      const matchedUser = response.data[index];
      await setSession(userData.email as string, token, matchedUser.name);
      //   console.log(userData.email as string);
      return {
        success: true,
        message: "Successfully Logged In",
      };
    } else {
      return {
        success: false,
        message: "Wrong Combination Email and Token",
      };
    }
  } catch (error: any) {
    console.error("Sign-in failed:", error.response?.data || error.message);
    return {
      success: false,
      message: "Wrong Combination Email and Token",
    };
  }
};

//create user
// const response = await axios.post(
//   "https://gorest.co.in/public/v2/users",
//   userData,
//   {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   }
// );
