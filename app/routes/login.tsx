import { ActionFunction, Form, redirect } from "remix";
import { commitSession, getSession } from "~/sessions.server";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("cookie"));
  session.set("auth", true);
  session.flash("message", "Log in successful");
  const headers = new Headers({ "Set-Cookie": await commitSession(session) });
  return redirect("/dashboard", { headers });
};

export default function Login() {
  return (
    <Form method="post">
      <button type="submit" name="login">
        Login
      </button>
    </Form>
  );
}
