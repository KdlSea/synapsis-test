"use server";

import { cookies } from "next/headers";

const SESSION_KEY = "synapsis_token";
const SESSION_NAME = "synapsis_name";
const EMAIL_KEY = "synapsis_email";
const SESSION_LOGIN = "synapsis_login";

export const setSession = async (
  email: string,
  token: string,
  name: string
) => {
  const cookieStore = cookies();
  (await cookieStore).set(EMAIL_KEY, email, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 3,
  });

  (await cookieStore).set(SESSION_KEY, token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 3,
  });
  (await cookieStore).set(SESSION_NAME, name, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 3,
  });
  (await cookieStore).set(SESSION_LOGIN, "true", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 3,
  });
};

export const getSession = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get(SESSION_KEY)?.value || null;
  const email = (await cookieStore).get(EMAIL_KEY)?.value || null;
  const name = (await cookieStore).get(SESSION_NAME)?.value || null;
  const login = (await cookieStore).get(SESSION_LOGIN)?.value || null;
  return { email, token, name, login };
};

export const clearSession = async () => {
  const cookieStore = cookies();
  (await cookieStore).delete(SESSION_LOGIN);
};
