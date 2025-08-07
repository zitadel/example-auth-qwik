import { routeAction$ } from "@builder.io/qwik-city";

// This creates a server-side action that can be called from a form.
export const useSignOutAction = routeAction$((data, { cookie, redirect }) => {
  // 👇 Your server-side logout logic goes here.
  // For example, deleting a session cookie.
  cookie.delete("your-auth-cookie-name", { path: "/" });

  // Redirect the user after they sign out.
  throw redirect(302, "/login");
});
