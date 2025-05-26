import { getSession } from "@/lib/actions/sessions";
import { redirect } from "next/navigation";

const page = async () => {
  const { login } = await getSession;

  if (login) {
    redirect("/dashboard");
  } else {
    redirect("/log-in");
  }
};

export default page;
