import { LoaderFunction, redirect } from "remix";
import { commitSession, getSession } from "~/sessions.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("cookie"));
  session.unset("auth");
  session.flash("message", "You have been logged out.");
  const headers = new Headers({ "Set-Cookie": await commitSession(session) });
  return redirect("/", { headers });
};
