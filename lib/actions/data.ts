"use server";

import axios from "axios";
import { getSession } from "./sessions";
import { error } from "console";

export const getAllPosts = async () => {
  try {
    const { token } = await getSession();
    if (token === null) throw new Error();
    const response = await axios.get("https://gorest.co.in/public/v2/posts?per_page=100", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Create User Failed:", error.response?.data || error.message);
    return {
      success: false,
      message: "Failed to Retrive User",
    };
  }
};

export const createPost = async (data: FieldTypeCreatePost) => {
  const { id, title, description } = data;
  console.log("adsadsada", data);
  try {
    const { token } = await getSession();
    if (token === null) throw new Error();
    const response = await axios.post(
      `https://gorest.co.in/public/v2/users/${id}/posts`,
      {
        title: title,
        body: description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return {
      success: true,
      message: "Post Has Been Create",
    };
  } catch (error: any) {
    console.log("failed to create post", error.response?.data || error.message);
    return {
      success: false,
      message: "Failed to Create Post",
    };
  }
};

export const getAllUser = async () => {
  try {
    const { token } = await getSession();
    if (token === null) throw new Error();
    const response = await axios.get("https://gorest.co.in/public/v2/users?per_page=100", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Create User Failed:", error.response?.data || error.message);
    return {
      success: false,
      message: "Failed to Retrive User",
    };
  }
};

export const createUser = async (dataUser: dataCust) => {
  try {
    const { token } = await getSession();
    if (token === null) throw new Error();
    await axios.post("https://gorest.co.in/public/v2/users", dataUser, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return {
      success: true,
      message: "Successfully Create User",
    };
  } catch (error: any) {
    console.error("Create User Failed:", error.response?.data || error.message);
    return {
      success: false,
      message: "Email has already been taken",
    };
  }
};
