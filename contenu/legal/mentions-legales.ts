import type { DocumentLegal } from './types'

/**
 * Les mentions entre crochets doivent etre remplacees par les informations
 * officielles de l'association avant mise en ligne.
 */
export const mentionsLegales: DocumentLegal = {
  cle: 'mentions-legales',
  maj: '2026-08-18',
  traductions: {
    fr: {
      titre: 'Mentions légales',
      chapeau: "Informations relatives à l'éditeur et à l'hébergement du site missrondecameroun.cm.",
      sections: [
        {
          titre: 'Éditeur du site',
          paragraphes: [
            "Le présent site est édité par l'Association Femme Ronde Cameroun, association organisatrice du concours Miss Ronde Cameroun.",
            "Siège social : Yaoundé, Cameroun — [À COMPLÉTER : adresse complète].",
            "Numéro d'enregistrement : [À COMPLÉTER : n° de récépissé / RCCM].",
            "Email : missrondecameroun@gmail.com — Téléphone : +237 6 75 23 80 97.",
          ],
        },
        {
          titre: 'Directeur de la publication',
          paragraphes: ["[À COMPLÉTER : nom et qualité du directeur de la publication]."],
        },
        {
          titre: 'Hébergement',
          paragraphes: [
            "Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — vercel.com.",
          ],
        },
        {
          titre: 'Propriété intellectuelle',
          paragraphes: [
            "L'ensemble des contenus présents sur ce site (textes, photographies, vidéos, logos, marques et éléments graphiques) est protégé par le droit de la propriété intellectuelle et demeure la propriété de l'Association Femme Ronde Cameroun ou de ses partenaires.",
            "Toute reproduction, représentation, adaptation ou exploitation, totale ou partielle, sans autorisation écrite préalable, est interdite.",
          ],
        },
        {
          titre: 'Liens vers des sites tiers',
          paragraphes: [
            "Le site peut contenir des liens vers des sites tiers (réseaux sociaux, partenaires, prestataires de paiement). L'éditeur n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.",
          ],
        },
        {
          titre: 'Responsabilité',
          paragraphes: [
            "L'éditeur s'efforce d'assurer l'exactitude des informations diffusées. Des erreurs ou omissions peuvent toutefois survenir ; l'utilisateur est invité à les signaler à missrondecameroun@gmail.com.",
            "L'éditeur ne saurait être tenu responsable des dommages résultant de l'accès au site ou de son indisponibilité temporaire.",
          ],
        },
        {
          titre: 'Contact',
          paragraphes: [
            "Pour toute question relative aux présentes mentions : missrondecameroun@gmail.com.",
          ],
        },
      ],
    },
    en: {
      titre: 'Legal notice',
      chapeau: 'Information about the publisher and hosting of the missrondecameroun.cm website.',
      sections: [
        {
          titre: 'Website publisher',
          paragraphes: [
            'This website is published by the Association Femme Ronde Cameroun, the organisation running the Miss Ronde Cameroun pageant.',
            'Registered office: Yaoundé, Cameroon — [TO BE COMPLETED: full address].',
            'Registration number: [TO BE COMPLETED: registration / RCCM number].',
            'Email: missrondecameroun@gmail.com — Phone: +237 6 75 23 80 97.',
          ],
        },
        {
          titre: 'Publication director',
          paragraphes: ['[TO BE COMPLETED: name and role of the publication director].'],
        },
        {
          titre: 'Hosting',
          paragraphes: [
            'The website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States — vercel.com.',
          ],
        },
        {
          titre: 'Intellectual property',
          paragraphes: [
            'All content on this website (texts, photographs, videos, logos, trademarks and graphic elements) is protected by intellectual property law and remains the property of the Association Femme Ronde Cameroun or its partners.',
            'Any reproduction, representation, adaptation or exploitation, in whole or in part, without prior written authorisation, is prohibited.',
          ],
        },
        {
          titre: 'Links to third-party websites',
          paragraphes: [
            'The website may contain links to third-party websites (social networks, partners, payment providers). The publisher has no control over these websites and accepts no responsibility for their content.',
          ],
        },
        {
          titre: 'Liability',
          paragraphes: [
            'The publisher strives to ensure the accuracy of the information published. Errors or omissions may nonetheless occur; users are invited to report them to missrondecameroun@gmail.com.',
            'The publisher cannot be held liable for damages resulting from access to the website or its temporary unavailability.',
          ],
        },
        {
          titre: 'Contact',
          paragraphes: ['For any question regarding this notice: missrondecameroun@gmail.com.'],
        },
      ],
    },
    es: {
      titre: 'Aviso legal',
      chapeau: 'Información relativa al editor y al alojamiento del sitio missrondecameroun.cm.',
      sections: [
        {
          titre: 'Editor del sitio',
          paragraphes: [
            'Este sitio está editado por la Asociación Femme Ronde Cameroun, entidad organizadora del concurso Miss Ronde Cameroun.',
            'Domicilio social: Yaundé, Camerún — [POR COMPLETAR: dirección completa].',
            'Número de registro: [POR COMPLETAR: n.º de registro / RCCM].',
            'Correo electrónico: missrondecameroun@gmail.com — Teléfono: +237 6 75 23 80 97.',
          ],
        },
        {
          titre: 'Director de la publicación',
          paragraphes: ['[POR COMPLETAR: nombre y cargo del director de la publicación].'],
        },
        {
          titre: 'Alojamiento',
          paragraphes: [
            'El sitio está alojado por Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, Estados Unidos — vercel.com.',
          ],
        },
        {
          titre: 'Propiedad intelectual',
          paragraphes: [
            'Todos los contenidos de este sitio (textos, fotografías, vídeos, logotipos, marcas y elementos gráficos) están protegidos por el derecho de propiedad intelectual y son propiedad de la Asociación Femme Ronde Cameroun o de sus socios.',
            'Queda prohibida toda reproducción, representación, adaptación o explotación, total o parcial, sin autorización escrita previa.',
          ],
        },
        {
          titre: 'Enlaces a sitios de terceros',
          paragraphes: [
            'El sitio puede contener enlaces a sitios de terceros (redes sociales, socios, proveedores de pago). El editor no ejerce ningún control sobre dichos sitios y declina toda responsabilidad sobre su contenido.',
          ],
        },
        {
          titre: 'Responsabilidad',
          paragraphes: [
            'El editor procura garantizar la exactitud de la información difundida. No obstante, pueden producirse errores u omisiones; se invita a los usuarios a comunicarlos a missrondecameroun@gmail.com.',
            'El editor no podrá ser considerado responsable de los daños derivados del acceso al sitio o de su indisponibilidad temporal.',
          ],
        },
        {
          titre: 'Contacto',
          paragraphes: ['Para cualquier consulta sobre este aviso: missrondecameroun@gmail.com.'],
        },
      ],
    },
  },
}
