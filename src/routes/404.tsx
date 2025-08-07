import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <main class-name="flex-1 grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class-name="text-center">
        <div class-name="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 mb-6">
          <svg
            class-name="h-8 w-8 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <h1 class-name="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p class-name="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn&#39;t find the page you&#39;re looking for.
        </p>
        <div class-name="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            class-name="rounded-md bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-gray-700 shadow-xs hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500"
          >
            Go back home
          </a>
        </div>
      </div>
    </main>
  );
});
