import type { DocumentLegal } from './types'

/**
 * Reglement de la 11eme edition (2026-2027), etabli a partir des informations
 * officielles du comite d'organisation.
 *
 * TODO : composition nominative du jury.
 * TODO : identite legale complete de l'association (voir mentions-legales).
 * TODO : reglement officiel signable au format PDF pour l'edition 2026-2027.
 */
export const reglementConcours: DocumentLegal = {
  cle: 'reglement-concours',
  maj: '2026-08-18',
  traductions: {
    fr: {
      titre: 'Règlement du concours',
      chapeau:
        "Conditions de participation, déroulement et dotations de la 11ème édition de Miss Ronde Cameroun, organisée sur 2026 et 2027.",
      sections: [
        {
          titre: 'Organisateur',
          paragraphes: [
            "Le concours Miss Ronde Cameroun est organisé par l'Association Femme Ronde Cameroun, créée en 2012 à l'initiative de Madame Dorette Bouwe Ndjiele.",
            "Il se déroule sous le Haut patronage du Ministère des Arts et de la Culture, avec le soutien du Ministère du Tourisme et des Loisirs et du Ministère de la Communication.",
            "Au-delà du concours de beauté, il s'agit d'un programme d'accompagnement des femmes rondes, visant à lutter contre l'obésité et à encourager leur développement.",
          ],
        },
        {
          titre: 'Conditions de participation',
          paragraphes: ["Pour concourir à la 11ème édition, la candidate doit remplir l'ensemble des conditions suivantes :"],
          liste: [
            "Faire partie de la communauté Manga'Queens.",
            'Être une femme ronde, de nationalité camerounaise.',
            'Être âgée de 18 à 40 ans.',
            'Présenter un indice de masse corporelle (IMC) compris entre 25 et 30 kg/m².',
            'Mensurations 55-45.',
            'Mesurer au moins 1,65 m.',
            'Être bilingue et maîtriser sa langue maternelle.',
            'Justifier d\'une bonne présence physique, d\'une bonne éloquence et d\'une bonne moralité.',
            'Justifier d\'un niveau scolaire de Baccalauréat au minimum.',
            "Porter un projet axé sur le thème de l'édition : « Beauté, Dignité et Autonomie : La Femme Ronde au cœur du Développement ».",
            'Être mariée ou célibataire, avec ou sans enfants.',
            'Être disponible sur toute la durée du parcours.',
          ],
        },
        {
          titre: 'Dossier de candidature',
          paragraphes: [
            "La candidature s'effectue via le formulaire en ligne. Elle n'est définitive qu'après réception du dossier complet :",
          ],
          liste: [
            'Le formulaire officiel imprimé et signé sur chaque page.',
            'Le règlement du concours signé sur chaque page.',
            "Une photocopie de la pièce d'identité.",
            'Un justificatif de domicile.',
          ],
        },
        {
          titre: 'Gratuité',
          paragraphes: [
            "Le dépôt d'une candidature est gratuit. Aucune somme ne peut être exigée d'une candidate en contrepartie de sa sélection.",
          ],
        },
        {
          titre: 'Calendrier de la 11ème édition',
          liste: [
            "20 février 2026 — annonce de l'événement et ouverture des enregistrements.",
            '30 juillet 2025 au 30 janvier 2026 — programme de suivi et d\'accompagnement des Miss.',
            '20 juillet au 20 octobre 2026 — dépouillement des dossiers et présélection.',
            '20 août au 20 septembre 2026 — finales régionales et sélection des participantes.',
            '22 août 2026 — casting.',
            '10 octobre 2026 — journée diététique.',
            '28 et 29 décembre 2026 — demi-finale.',
            '9 janvier 2027 — Salon International de la Femme Africaine (SIFA).',
            '25 janvier 2027 — mise au vert.',
            "30 janvier 2027 — soirée de l'élection, Grande Finale.",
          ],
        },
        {
          titre: 'Pôles régionaux',
          paragraphes: ['Les finales régionales se tiennent dans quatre pôles :'],
          liste: [
            'Yaoundé — régions du Centre, du Sud et de l\'Est.',
            'Douala — régions du Littoral et du Sud-Ouest.',
            'Bafoussam — régions de l\'Ouest et du Nord-Ouest.',
            'Garoua — Ngaoundéré, Garoua et Maroua.',
          ],
        },
        {
          titre: 'Sélection et notation',
          paragraphes: [
            "Les candidatures sont examinées par le comité d'organisation, puis par un jury.",
            'La note finale de chaque candidate se décompose ainsi :',
          ],
          liste: [
            'Effort personnel : 25 %.',
            'Vote du jury : 35 %.',
            'Vote du public : 40 %.',
          ],
        },
        {
          titre: 'Vote du public',
          paragraphes: [
            "Le vote du public est ouvert sur plusieurs canaux : plateforme web, WhatsApp, Messenger, Telegram et Instagram.",
            'Le ticket de vote est fixé à 1 000 FCFA. Chaque candidate mobilise ainsi un soutien financier et médiatique au bénéfice de son projet solidaire, une collecte de dons étant intégrée à la plateforme de vote.',
          ],
        },
        {
          titre: "Soirée de l'élection",
          paragraphes: [
            "La Grande Finale se tient le 30 janvier 2027 au Palais des Congrès de Yaoundé, sur le Podium Yafé, devant une affluence attendue d'environ 6 000 personnes.",
            'Le code vestimentaire est le chic en tenue africaine. La soirée comporte cinq parades : tenues de ville, tenues traditionnelles, tenues de sport, maillots de bain et tenues de soirée.',
            "Sont également remis le Prix UNESCO « Femme Ronde & Solidarité Enfantine » et les Africa Woman Awards.",
          ],
        },
        {
          titre: 'Engagements de la candidate',
          paragraphes: [
            "La candidate s'engage à fournir des informations exactes, à participer aux répétitions, castings, formations et événements prévus au calendrier, et à adopter un comportement respectueux envers l'organisation, le public et les autres candidates.",
          ],
        },
        {
          titre: 'Titre et dotations',
          liste: [
            'Miss Ronde Cameroun : 5 000 000 FCFA et une voiture.',
            '1ère Dauphine : 3 000 000 FCFA.',
            '2ème Dauphine : 1 500 000 FCFA.',
          ],
          paragraphes: [
            "Après l'élection, les lauréates deviennent Ambassadrices des femmes rondes et bénéficient d'un suivi dans la réalisation de leurs projets.",
          ],
        },
        {
          titre: "Droits à l'image",
          paragraphes: [
            "La participation implique l'autorisation d'utiliser l'image, la voix et les enregistrements réalisés dans le cadre du concours, dans les conditions détaillées au formulaire de candidature.",
          ],
        },
        {
          titre: 'Disqualification',
          paragraphes: [
            "Toute fausse déclaration, tout comportement portant atteinte à l'image du concours ou tout manquement au présent règlement peut entraîner la disqualification, y compris après le sacre, avec restitution du titre et des dotations.",
          ],
        },
        {
          titre: 'Modification ou annulation',
          paragraphes: [
            "L'organisateur peut modifier le calendrier ou les modalités du concours, voire l'annuler, en cas de circonstances indépendantes de sa volonté, sans que cela ouvre droit à indemnisation.",
          ],
        },
        {
          titre: 'Acceptation',
          paragraphes: ["La participation au concours vaut acceptation pleine et entière du présent règlement."],
        },
      ],
    },
    en: {
      titre: 'Pageant rules',
      chapeau:
        'Participation conditions, process and prizes of the 11th edition of Miss Ronde Cameroun, held across 2026 and 2027.',
      sections: [
        {
          titre: 'Organiser',
          paragraphes: [
            'The Miss Ronde Cameroun pageant is organised by the Association Femme Ronde Cameroun, created in 2012 at the initiative of Mrs Dorette Bouwe Ndjiele.',
            'It takes place under the High Patronage of the Ministry of Arts and Culture, with the support of the Ministry of Tourism and Leisure and the Ministry of Communication.',
            'Beyond the beauty pageant, it is a support programme for full-figured women, working against obesity and encouraging their development.',
          ],
        },
        {
          titre: 'Participation conditions',
          paragraphes: ['To enter the 11th edition, a candidate must meet all of the following conditions:'],
          liste: [
            'Be part of the Manga’Queens community.',
            'Be a full-figured woman of Cameroonian nationality.',
            'Be aged 18 to 40.',
            'Have a body mass index (BMI) between 25 and 30 kg/m².',
            'Measurements 55-45.',
            'Be at least 1.65 m tall.',
            'Be bilingual and fluent in her mother tongue.',
            'Show good physical presence, eloquence and good character.',
            'Hold a high school diploma as a minimum.',
            'Carry a project built around the theme of the edition: “Beauty, Dignity and Autonomy: The Full-Figured Woman at the Heart of Development”.',
            'Be married or single, with or without children.',
            'Be available throughout the whole journey.',
          ],
        },
        {
          titre: 'Application file',
          paragraphes: [
            'Applications are made through the online form. They are only final once the complete file has been received:',
          ],
          liste: [
            'The official form printed and signed on every page.',
            'The pageant rules signed on every page.',
            'A photocopy of the ID.',
            'A proof of address.',
          ],
        },
        {
          titre: 'Free entry',
          paragraphes: [
            'Submitting an application is free. No sum may be required from a candidate in exchange for her selection.',
          ],
        },
        {
          titre: 'Calendar of the 11th edition',
          liste: [
            'February 20, 2026 — event announcement and opening of registrations.',
            'July 30, 2025 to January 30, 2026 — follow-up and support programme for the Miss.',
            'July 20 to October 20, 2026 — review of applications and pre-selection.',
            'August 20 to September 20, 2026 — regional finals and selection of participants.',
            'August 22, 2026 — casting.',
            'October 10, 2026 — nutrition day.',
            'December 28 and 29, 2026 — semi-final.',
            'January 9, 2027 — International African Woman Fair (SIFA).',
            'January 25, 2027 — training retreat.',
            'January 30, 2027 — election evening, Grand Finale.',
          ],
        },
        {
          titre: 'Regional hubs',
          paragraphes: ['The regional finals are held in four hubs:'],
          liste: [
            'Yaoundé — Centre, South and East regions.',
            'Douala — Littoral and South-West regions.',
            'Bafoussam — West and North-West regions.',
            'Garoua — Ngaoundéré, Garoua and Maroua.',
          ],
        },
        {
          titre: 'Selection and scoring',
          paragraphes: [
            'Applications are reviewed by the organising committee, then by a jury.',
            'The final score of each candidate breaks down as follows:',
          ],
          liste: ['Personal effort: 25%.', 'Jury vote: 35%.', 'Public vote: 40%.'],
        },
        {
          titre: 'Public vote',
          paragraphes: [
            'The public vote is open on several channels: web platform, WhatsApp, Messenger, Telegram and Instagram.',
            'A voting ticket costs 1,000 FCFA. Each candidate thereby gathers financial and media support for her solidarity project, with a donation collection built into the voting platform.',
          ],
        },
        {
          titre: 'Election evening',
          paragraphes: [
            'The Grand Finale is held on January 30, 2027 at the Palais des Congrès in Yaoundé, on the Yafé stage, before an expected audience of around 6,000 people.',
            'The dress code is chic in African attire. The evening features five parades: city wear, traditional dress, sportswear, swimwear and evening gowns.',
            'The UNESCO “Full-Figured Woman & Child Solidarity” Prize and the Africa Woman Awards are also presented.',
          ],
        },
        {
          titre: 'Candidate commitments',
          paragraphes: [
            'The candidate undertakes to provide accurate information, to attend the rehearsals, castings, training sessions and events scheduled in the calendar, and to behave respectfully towards the organisation, the audience and the other candidates.',
          ],
        },
        {
          titre: 'Title and prizes',
          liste: [
            'Miss Ronde Cameroun: 5,000,000 FCFA and a car.',
            'First runner-up: 3,000,000 FCFA.',
            'Second runner-up: 1,500,000 FCFA.',
          ],
          paragraphes: [
            'After the election, the winners become Ambassadors of full-figured women and receive support in carrying out their projects.',
          ],
        },
        {
          titre: 'Image rights',
          paragraphes: [
            'Participation implies authorisation to use the image, voice and recordings made as part of the pageant, under the conditions detailed in the application form.',
          ],
        },
        {
          titre: 'Disqualification',
          paragraphes: [
            'Any false statement, any behaviour damaging the image of the pageant or any breach of these rules may lead to disqualification, including after the crowning, with return of the title and prizes.',
          ],
        },
        {
          titre: 'Amendment or cancellation',
          paragraphes: [
            'The organiser may change the schedule or arrangements of the pageant, or cancel it, in circumstances beyond its control, without this giving rise to any compensation.',
          ],
        },
        {
          titre: 'Acceptance',
          paragraphes: ['Taking part in the pageant implies full acceptance of these rules.'],
        },
      ],
    },
    es: {
      titre: 'Reglamento del concurso',
      chapeau:
        'Condiciones de participación, desarrollo y dotaciones de la 11.ª edición de Miss Ronde Cameroun, celebrada entre 2026 y 2027.',
      sections: [
        {
          titre: 'Organizador',
          paragraphes: [
            'El concurso Miss Ronde Cameroun está organizado por la Asociación Femme Ronde Cameroun, creada en 2012 por iniciativa de la Sra. Dorette Bouwe Ndjiele.',
            'Se celebra bajo el Alto Patrocinio del Ministerio de Artes y Cultura, con el apoyo del Ministerio de Turismo y Ocio y del Ministerio de Comunicación.',
            'Más allá del concurso de belleza, se trata de un programa de acompañamiento de las mujeres con curvas, que busca luchar contra la obesidad y fomentar su desarrollo.',
          ],
        },
        {
          titre: 'Condiciones de participación',
          paragraphes: ['Para concursar en la 11.ª edición, la candidata debe cumplir todas las condiciones siguientes:'],
          liste: [
            'Formar parte de la comunidad Manga’Queens.',
            'Ser una mujer con curvas, de nacionalidad camerunesa.',
            'Tener entre 18 y 40 años.',
            'Presentar un índice de masa corporal (IMC) entre 25 y 30 kg/m².',
            'Medidas 55-45.',
            'Medir al menos 1,65 m.',
            'Ser bilingüe y dominar su lengua materna.',
            'Acreditar buena presencia física, elocuencia y buena conducta.',
            'Acreditar un nivel académico de bachillerato como mínimo.',
            'Presentar un proyecto centrado en el tema de la edición: «Belleza, Dignidad y Autonomía: La Mujer Redonda en el corazón del Desarrollo».',
            'Estar casada o soltera, con o sin hijos.',
            'Estar disponible durante todo el recorrido.',
          ],
        },
        {
          titre: 'Expediente de candidatura',
          paragraphes: [
            'La candidatura se realiza mediante el formulario en línea. Solo es definitiva tras la recepción del expediente completo:',
          ],
          liste: [
            'El formulario oficial impreso y firmado en cada página.',
            'El reglamento del concurso firmado en cada página.',
            'Una fotocopia del documento de identidad.',
            'Un justificante de domicilio.',
          ],
        },
        {
          titre: 'Gratuidad',
          paragraphes: [
            'La presentación de una candidatura es gratuita. No puede exigirse ninguna cantidad a una candidata a cambio de su selección.',
          ],
        },
        {
          titre: 'Calendario de la 11.ª edición',
          liste: [
            '20 de febrero de 2026 — anuncio del evento y apertura de inscripciones.',
            '30 de julio de 2025 al 30 de enero de 2026 — programa de seguimiento y acompañamiento de las Miss.',
            '20 de julio al 20 de octubre de 2026 — estudio de los expedientes y preselección.',
            '20 de agosto al 20 de septiembre de 2026 — finales regionales y selección de las participantes.',
            '22 de agosto de 2026 — casting.',
            '10 de octubre de 2026 — jornada dietética.',
            '28 y 29 de diciembre de 2026 — semifinal.',
            '9 de enero de 2027 — Salón Internacional de la Mujer Africana (SIFA).',
            '25 de enero de 2027 — concentración de preparación.',
            '30 de enero de 2027 — gala de elección, Gran Final.',
          ],
        },
        {
          titre: 'Polos regionales',
          paragraphes: ['Las finales regionales se celebran en cuatro polos:'],
          liste: [
            'Yaundé — regiones del Centro, Sur y Este.',
            'Duala — regiones del Litoral y Suroeste.',
            'Bafoussam — regiones del Oeste y Noroeste.',
            'Garua — Ngaundere, Garua y Maroua.',
          ],
        },
        {
          titre: 'Selección y puntuación',
          paragraphes: [
            'Las candidaturas son examinadas por el comité organizador y después por un jurado.',
            'La nota final de cada candidata se descompone así:',
          ],
          liste: ['Esfuerzo personal: 25 %.', 'Voto del jurado: 35 %.', 'Voto del público: 40 %.'],
        },
        {
          titre: 'Voto del público',
          paragraphes: [
            'El voto del público está abierto en varios canales: plataforma web, WhatsApp, Messenger, Telegram e Instagram.',
            'El ticket de voto cuesta 1 000 FCFA. Cada candidata moviliza así apoyo económico y mediático en beneficio de su proyecto solidario, con una recaudación de donativos integrada en la plataforma de voto.',
          ],
        },
        {
          titre: 'Gala de elección',
          paragraphes: [
            'La Gran Final se celebra el 30 de enero de 2027 en el Palacio de Congresos de Yaundé, en el Podio Yafé, ante una afluencia prevista de unas 6 000 personas.',
            'El código de vestimenta es chic con traje africano. La gala consta de cinco desfiles: ropa de calle, trajes tradicionales, ropa deportiva, trajes de baño y trajes de noche.',
            'También se entregan el Premio UNESCO «Mujer Redonda y Solidaridad Infantil» y los Africa Woman Awards.',
          ],
        },
        {
          titre: 'Compromisos de la candidata',
          paragraphes: [
            'La candidata se compromete a facilitar información exacta, a participar en los ensayos, castings, formaciones y actos previstos en el calendario, y a mantener un comportamiento respetuoso con la organización, el público y las demás candidatas.',
          ],
        },
        {
          titre: 'Título y dotaciones',
          liste: [
            'Miss Ronde Cameroun: 5 000 000 FCFA y un coche.',
            'Primera dama de honor: 3 000 000 FCFA.',
            'Segunda dama de honor: 1 500 000 FCFA.',
          ],
          paragraphes: [
            'Tras la elección, las ganadoras se convierten en Embajadoras de las mujeres con curvas y reciben acompañamiento en la realización de sus proyectos.',
          ],
        },
        {
          titre: 'Derechos de imagen',
          paragraphes: [
            'La participación implica la autorización para utilizar la imagen, la voz y las grabaciones realizadas en el marco del concurso, en las condiciones detalladas en el formulario de candidatura.',
          ],
        },
        {
          titre: 'Descalificación',
          paragraphes: [
            'Toda declaración falsa, todo comportamiento que perjudique la imagen del concurso o todo incumplimiento del presente reglamento puede conllevar la descalificación, incluso después de la coronación, con devolución del título y de las dotaciones.',
          ],
        },
        {
          titre: 'Modificación o anulación',
          paragraphes: [
            'El organizador puede modificar el calendario o las modalidades del concurso, o incluso anularlo, por circunstancias ajenas a su voluntad, sin que ello dé derecho a indemnización.',
          ],
        },
        {
          titre: 'Aceptación',
          paragraphes: ['La participación en el concurso implica la aceptación plena del presente reglamento.'],
        },
      ],
    },
  },
}
