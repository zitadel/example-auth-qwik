import { QwikAuth$ } from '@zitadel/qwik-auth';
import type { RequestEventCommon } from '@builder.io/qwik-city';
import { getAuthConfig } from '~/lib/auth';

// noinspection JSUnusedGlobalSymbols
export const { onRequest, useSession, useSignIn, useSignOut } = QwikAuth$(
  (event: RequestEventCommon) => ({
    ...getAuthConfig((key: string) => event.env.get(key)),
    trustHost: true,
  }),
);
