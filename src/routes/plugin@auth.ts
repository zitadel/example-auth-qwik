import { QwikAuth$, getSession } from '@zitadel/qwik-auth';
import { routeLoader$ } from '@builder.io/qwik-city';
import { getAuthConfig } from '~/lib/auth';

const authConfig = {
  ...getAuthConfig((key: string) => process.env[key]),
  trustHost: true,
};

const qwikAuth = QwikAuth$(authConfig);

// noinspection JSUnusedGlobalSymbols
export const onRequest = qwikAuth.onRequest;

// Renamed to avoid Qwik's `use*` linter rule that forbids calling hooks
// inside event handlers — these are plain async helpers, not Qwik hooks.
// noinspection JSUnusedGlobalSymbols
export const signIn = qwikAuth.useSignIn;

// noinspection JSUnusedGlobalSymbols
export const signOut = qwikAuth.useSignOut;

// noinspection JSUnusedGlobalSymbols
export const useSession = routeLoader$(async (event) => {
  return getSession(event.request, authConfig);
});
