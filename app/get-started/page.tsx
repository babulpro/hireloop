import { redirect } from "next/navigation";

export default function GetStartedPage() {
  redirect("/sign-in?mode=signup");
}
