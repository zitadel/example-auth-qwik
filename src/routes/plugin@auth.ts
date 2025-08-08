import { QwikAuth$ } from '@auth/qwik';
import { getAuthConfig } from '~/lib/auth';
import { RequestEventCommon } from '@builder.io/qwik-city';

// noinspection JSUnusedGlobalSymbols
export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  (event: RequestEventCommon) => {
    const env = (key: string) => event.env.get(`VITE_${key}`);

    return {
      ...getAuthConfig(env),
      trustHost: true,
    };
  },
);
