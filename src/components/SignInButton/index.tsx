/**
 * - Nos criamos um novo componente pois ele tem duas funcoes, realizar a autenticacao e verificar se o usuario esta logado(usando um
 * estado). Essas duas funcoes nao tem nada a ver com os elementos do componente Header(para eles nao importa o valor ou o que fazem)
 * e por isso vale a pena criar um novo componente
 * - Alem disso, sempre que o estado do usuario for alterado o componente sera re-renderizado, e como esse componente esta separado do
 * Header, logo somente esse componente sera re-renderizado
 */

import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { signIn, useSession, signOut } from 'next-auth/react';

import styles from './styles.module.scss';

export function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn('github')}
    >
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}