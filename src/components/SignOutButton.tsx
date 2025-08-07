import { component$ } from '@builder.io/qwik';
import { useSignOut } from '~/routes/plugin@auth';

export const SignOutButton = component$(() => {
  const signOut = useSignOut();

  return (
    <button
      onClick$={async () => await signOut.submit({})}
      class="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-red-600"
    >
      Sign out
    </button>
  );
});
