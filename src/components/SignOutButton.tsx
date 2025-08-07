import { component$ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { useSignOutAction } from "~/routes/api/auth/logout";

export const SignOutButton = component$(() => {
  const signOutAction = useSignOutAction();

  return (
    <Form action={signOutAction}>
      <button
        type="submit"
        class="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-red-600"
      >
        Sign out
      </button>
    </Form>
  );
});
