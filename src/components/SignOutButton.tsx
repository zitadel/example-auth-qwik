import { component$ } from '@builder.io/qwik';

export const SignOutButton = component$(() => {
  return (
    <form action="/api/auth/logout" method="POST">
      <button
        type="submit"
        class="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-red-600"
      >
        Sign out
      </button>
    </form>
  );
});
