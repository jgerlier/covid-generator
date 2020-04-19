import { Container, Link } from '@material-ui/core';
import React from 'react';

export function Footer() {
  return (
    <footer>
      <Container maxWidth="md">
        <p>
          Ce site permet de générer une attestation de déplacement dérogatoire
          dans le cadre du confinement dû au Covid-19, en utilisant des profils
          sauvegardables. Le PDF est généré directement par{' '}
          <Link href="https://media.interieur.gouv.fr/deplacement-covid-19/">
            le générateur officiel du ministère de l'intérieur
          </Link>
          .
        </p>
        <p>
          Aucune de vos données n'est stockée sur un serveur distant. Le PDF de
          votre attestation est supprimé du serveur directement après que vous
          l'ayez téléchargé ou au plus tard 5 minutes après sa création via un
          nettoyage automatique.
        </p>
        <p>
          L'ensemble du code source est disponible sur{' '}
          <Link href="https://github.com/jgerlier/covid-generator">Github</Link>
          .
        </p>
      </Container>
    </footer>
  );
}
