import { ErrorBoundaryComponent, LoaderFunction, redirect } from "remix";
import { getSession, commitSession } from "~/sessions.server";

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return <div style={{ color: "red" }}>Error: {error.message}</div>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("cookie"));
  if (!session.has("auth")) {
    session.flash("message", "You must be logged in to view this page.");
    const headers = new Headers({ "Set-Cookie": await commitSession(session) });
    return redirect("/login", { headers });
  }
  return null;
};

export default function Dashboard() {
  return <div>You are currently viewing dashboard</div>;
}
