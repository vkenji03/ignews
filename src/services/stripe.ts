/**
 * Utilizar o SDK do stripe, outra forma seria fazer requisicoes HTTP(axios ou fetch), mas nao eh o mais recomendado
 */

import Stripe from 'stripe';
import { version } from '../../package.json';

export const stripe = new Stripe(
  process.env.STRIPE_API_KEY,
  {
    apiVersion: '2020-08-27',
    appInfo: {
      name: 'Ignews',
      version
    }
  }
);