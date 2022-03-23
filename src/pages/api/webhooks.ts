import { NextApiRequest, NextApiResponse } from 'next';
import { Readable } from 'stream';
import Stripe from 'stripe';
import { stripe } from '../../services/stripe';
import { saveSubscription } from './_lib/manageSubscription';

// codigo para a integracao entre o stripe e o next, a requisicao do webhook do stripe nao chega completa, por isso precisamos 
// esperar todos os chunks chegarem para podermos executar o codigo
async function buffer(readable: Readable) {
  const chunks = [];

  for await (const chunk of readable) {
    chunks.push(
      typeof chunk === 'string' ? Buffer.from(chunk) : chunk
    );
  }

  return Buffer.concat(chunks);
}

// sem isso o next espera uma request em formato JSON
export const config = {
  api: {
    bodyParser: false
  }
};

const relevantEvents = new Set([
  'checkout.session.completed'
]);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
  
    // sempre q usa webhooks precisa garantir que quem esta tentando acessar a rota seja uma pessoa que pode fazer isso
    // por isso precisa de uma "senha", ja que essa rota eh uma rota de backend normal
    const secret = req.headers['stripe-signature'];

    // fazer a validacao de quem esta tentando acessar a rota, forma recomendada pelo stripe
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    const { type } = event;

    if (relevantEvents.has(type)) {
      try {
        switch (type) {
          case 'checkout.session.completed':
            const checkoutSession = event.data.object as Stripe.Checkout.Session;

            await saveSubscription(
              checkoutSession.subscription.toString(),
              checkoutSession.customer.toString()
            );
            break;
          default:
            throw new Error('Unhandled event.');
        }
      } catch (err) {
        return res.json({ error: 'Webhook handler failed.' }); // esse erro e para avisar o desenvolvedor
      }
    } 

    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method nor allowed');
  }
}