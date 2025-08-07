import { component$, Slot } from '@builder.io/qwik';
import { ErrorBoundary } from '~/components/ErrorBoundary';

// noinspection JSUnusedGlobalSymbols
export default component$(() => {
  return (
    <ErrorBoundary showDetails={import.meta.env.DEV}>
      <Slot />
    </ErrorBoundary>
  );
});
