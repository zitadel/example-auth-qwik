import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { getMessage } from '../message';
import { useSignIn } from '~/routes/plugin@auth';

// noinspection JSUnusedGlobalSymbols
/**
 * Custom Auth.js sign-in page that matches the application's design system.
 *
 * Provides a clean, branded sign-in experience specifically designed for
 * single-provider authentication with ZITADEL.
 */
export default component$(() => {
  const loc = useLocation();
  const signIn = useSignIn();
  const error = loc.url.searchParams.get('error');
  const callbackUrl = loc.url.searchParams.get('callbackUrl') || '/profile';
  const csrfToken = useSignal<string>('');

  useTask$(async () => {
    // Get CSRF token from Auth.js
    const response = await fetch('/api/auth/csrf');
    const data = await response.json();
    csrfToken.value = data.csrfToken;
  });

  return (
    <main class="grid flex-1 place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="w-full max-w-md text-center">
        <div class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <svg
            class="h-8 w-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
        <h1 class="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Sign in
        </h1>
        <p
          class={`mt-6 text-lg font-medium text-pretty sm:text-xl/8 ${
            error ? 'text-red-600' : 'text-gray-500'
          }`}
        >
          {error
            ? getMessage(error, 'signin-error').message
            : 'Continue to your account'}
        </p>

        <div class="mt-10">
          <form
            preventdefault:submit
            onSubmit$={async () => {
              await signIn.submit({
                providerId: 'zitadel',
                options: { callbackUrl },
              });
            }}
            class="space-y-4"
          >
            <input type="hidden" name="csrfToken" value={csrfToken.value} />
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <button
              type="submit"
              class="flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fill-rule="evenodd"
                  d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                  clip-rule="evenodd"
                />
              </svg>
              Sign in with ZITADEL
            </button>
          </form>
        </div>
        <div class="mt-8">
          <a
            href="/"
            class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <svg
              class="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            Back to home
          </a>
        </div>
      </div>
    </main>
  );
});
