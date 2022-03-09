import { signIn, useSession } from 'next-auth/react';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
  priceId: string;
};

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  // checkout session eh basicamente uma URL que o usuario eh direcionado para preencher as informacoes de pagamento e apos terminar
  // ele eh redirecionado para outra pagina

  const { data: session } = useSession();


  function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }

    
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}