import {
  ErrorBoundaryComponent,
  json,
  Link,
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import { commitSession, getSession } from "./sessions.server";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);

  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <div style={{ color: "red" }}>Error: {error.message}</div>
        <LiveReload />
      </body>
    </html>
  );
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("cookie"));
  const message = session.get("message") || "";
  const auth = session.get("auth") || null;
  const headers = new Headers({ "Set-Cookie": await commitSession(session) });
  return json({ message, auth }, { headers });
};

export default function App() {
  const { auth, message } = useLoaderData();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {message ? <div style={{ color: "red" }}>{message}</div> : null}
        <div>Root Component</div>
        <div>
          <Link to="/">Home</Link> | <Link to="dashboard">Dashboard</Link>
          {auth ? (
            <>
              &nbsp;|&nbsp;<Link to="logout">Logout</Link>
            </>
          ) : null}
        </div>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
