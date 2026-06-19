export const allSalles = [
  'SIL A', 'SIL B', 'CP A', 'CP B', 'CE1 A', 'CE1 B', 'CE2 A', 'CM1 A', 'CM2 A',
  'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'
];

export const allCategoriesFr = ['Lecture', 'Français', 'Mathématiques', 'Sciences', 'Histoire', 'Anglais'];
export const allCategoriesEn = ['Reading', 'French', 'Mathematics', 'Sciences', 'History', 'English'];

export interface BookPage {
  title: string;
  content: string;
}

export interface LibraryBook {
  id: number;
  titre: string; // compatibility with LibraryPage
  title: string; // compatibility with LibraryManagePage
  auteur: string; // compatibility with LibraryPage
  author: string; // compatibility with LibraryManagePage
  isbn: string;
  specialty: string; // compatibility with LibraryPage
  category: string; // compatibility with LibraryManagePage
  copies: number;
  available: number;
  rating: number;
  salles: string[];
  pages: BookPage[];
}

export const getBooks = (lng: string): LibraryBook[] => {
  const isEn = lng === 'en';
  return [
    {
      id: 1,
      titre: isEn ? 'CM1 Reading — My Beautiful Book' : 'Lecture CM1 — Mon beau livre',
      title: isEn ? 'CM1 Reading — My Beautiful Book' : 'Lecture CM1 — Mon beau livre',
      auteur: 'EDICEF',
      author: 'EDICEF',
      isbn: '978-2-01-111',
      specialty: isEn ? 'Reading' : 'Lecture',
      category: isEn ? 'Reading' : 'Lecture',
      copies: 30,
      available: 22,
      rating: 4.5,
      salles: ['CM1 A', 'Class 5'],
      pages: isEn ? [
        {
          title: 'Chapter 1 — The Enchanted Forest',
          content: `Once upon a time, in a large country in Africa, there was a forest so vast that one could not see its end. The trees were so high that their tops touched the clouds.

In this forest lived many animals: majestic elephants, mischievous monkeys and colorful birds.

One day, a young boy named Kofi decided to explore this forest. His mother told him: "Come back before dark, my son!"

Kofi promised and set off between the tall trees. He walked for a long time, admiring the wild flowers and listening to the birds singing.

Comprehension questions:
1. What is the young boy's name?
2. What does his mother tell him before he leaves?
3. Describe the forest in your own words.`
        },
        {
          title: 'Chapter 2 — The Encounter',
          content: `Suddenly, Kofi heard a strange noise. He stopped and listened. It was a small injured animal whimpering softly.

It was a baby monkey that had slipped from a branch. Kofi approached slowly so as not to scare it. The animal looked at him with big, round, sad eyes.

"Don't be afraid, I will help you," Kofi said in a soft voice.

He gently took the little monkey in his arms and examined its paw. It was not broken, just bruised.

New vocabulary:
• Whimpering: crying softly
• Bruised: slightly injured
• Gently: with a lot of softness and care`
        },
        {
          title: 'Exercises — Dictation and Grammar',
          content: `Prepared Dictation — Lesson 4:

Copy and complete the sentences with the following words:
(forest / animals / journey / brave / discovery)

1. Kofi was a very __________ boy.
2. He went on a long __________ in the great __________.
3. He met many __________ there.
4. This __________ changed his life forever.

Grammar — The Noun Phrase:
The noun phrase is composed of a NOUN and its modifiers.
Example: "The great forest" → Article + Adjective + Noun

Identify the noun phrases in these sentences:
- The young boy walks in the dense forest.
- A small injured monkey cried on a branch.`
        },
        {
          title: 'Written Expression',
          content: `Essay Topic — CM1:

Imagine the rest of the story of Kofi and the baby monkey.

Tips for writing well:
✓ Use linking words (then, next, suddenly, finally)
✓ Describe the characters' feelings
✓ Give a title to your story
✓ Check spelling and punctuation

Evaluation criteria:
• Story coherence: /4
• Vocabulary richness: /4
• Grammar compliance: /4
• Creativity and imagination: /4
• Presentation and legibility: /4
TOTAL: /20`
        }
      ] : [
        {
          title: 'Chapitre 1 — La forêt enchantée',
          content: `Il était une fois, dans un grand pays d'Afrique, une forêt si vaste qu'on en voyait pas la fin. Les arbres y étaient si hauts que leurs cimes touchaient les nuages.

Dans cette forêt vivaient de nombreux animaux : des éléphants majestueux, des singes espiègles et des oiseaux aux plumages colorés.

Un jour, un jeune garçon nommé Kofi décida d'explorer cette forêt. Sa mère lui dit : « Reviens avant la nuit, mon fils ! »

Kofi promit et s'élança entre les grands arbres. Il marcha longtemps, admirant les fleurs sauvages et écoutant le chant des oiseaux.

Questions de compréhension :
1. Comment s'appelle le jeune garçon ?
2. Que lui dit sa mère avant son départ ?
3. Décris la forêt avec tes propres mots.`
        },
        {
          title: 'Chapitre 2 — La rencontre',
          content: `Soudain, Kofi entendit un bruit étrange. Il s'arrêta et tendit l'oreille. C'était un petit animal blessé qui gémissait doucement.

C'était un bébé singe qui avait glissé d'une branche. Kofi s'approcha doucement pour ne pas l'effrayer. L'animal le regarda avec de grands yeux ronds et tristes.

« N'aie pas peur, je vais t'aider », dit Kofi d'une voix douce.

Il prit délicatement le petit singe dans ses bras et examina sa patte. Elle n'était pas cassée, juste contusionnée.

Vocabulaire nouveau :
• Gémissait : pleurait doucement
• Contusionnée : légèrement blessée, meurtrie
• Délicatement : avec beaucoup de douceur et de soin`
        },
        {
          title: 'Exercices — Dictée et grammaire',
          content: `Dictée préparée — Leçon 4 :

Recopie et complète les phrases avec les mots suivants :
(forêt / animaux / voyage / courageux / découverte)

1. Kofi était un garçon très __________.
2. Il fit un long __________ dans la grande __________.
3. Il y rencontra de nombreux __________.
4. Cette __________ changea sa vie pour toujours.

Grammaire — Le groupe nominal :
Le groupe nominal est composé d'un NOM et de ses compléments.
Exemple : « La grande forêt » → Article + Adjectif + Nom

Identifie les groupes nominaux dans ces phrases :
- Le jeune garçon marche dans la forêt dense.
- Un petit singe blessé pleurait sur une branche.`
        },
        {
          title: 'Production écrite',
          content: `Sujet de rédaction — CM1 :

Imagine la suite de l'histoire de Kofi et du bébé singe.

Conseils pour bien écrire :
✓ Utilise des mots de liaison (ensuite, puis, soudain, enfin)
✓ Décris les sentiments des personnages
✓ Donne un titre à ton histoire
✓ Vérifie l'orthographe et la ponctuation

Critères d'évaluation :
• Cohérence de l'histoire : /4
• Richesse du vocabulaire : /4
• Respect de la grammaire : /4
• Créativité et imagination : /4
• Présentation et lisibilité : /4
TOTAL : /20`
        }
      ]
    },
    {
      id: 2,
      titre: isEn ? 'CE2 Math — Counting Well' : 'Calcul CE2 — Je compte bien',
      title: isEn ? 'CE2 Math — Counting Well' : 'Calcul CE2 — Je compte bien',
      auteur: 'CIAM',
      author: 'CIAM',
      isbn: '978-2-01-222',
      specialty: isEn ? 'Mathematics' : 'Mathématiques',
      category: isEn ? 'Mathematics' : 'Mathématiques',
      copies: 25,
      available: 18,
      rating: 4.2,
      salles: ['CE2 A', 'Class 4'],
      pages: isEn ? [
        {
          title: 'Lesson 1 — Multiplication',
          content: `MULTIPLICATION is repeated addition.

Definition: To multiply is to add a number several times to itself.

Example: 4 × 3 = 4 + 4 + 4 = 12
Read: "four times three equals twelve"

The multiplication sign is: ×
The result of a multiplication is called the PRODUCT.
The numbers we multiply are called the FACTORS.

Important property:
The order of the factors does not change the product!
5 × 3 = 3 × 5 = 15   (commutative property)

Multiplication table of 4:
4 × 1 = 4    |   4 × 6 = 24
4 × 2 = 8    |   4 × 7 = 28
4 × 3 = 12   |   4 × 8 = 32
4 × 4 = 16   |   4 × 9 = 36
4 × 5 = 20   |   4 × 10 = 40`
        },
        {
          title: 'Lesson 2 — Euclidean Division',
          content: `EUCLIDEAN DIVISION allows sharing a quantity into equal groups.

Division vocabulary:
   48  ÷  6  =  8
   ↑      ↑     ↑
DIVIDEND DIVISOR QUOTIENT

Read: "48 divided by 6 equals 8"

Division with remainder:
25 ÷ 4 = 6 remainder 1
Verification: (6 × 4) + 1 = 24 + 1 = 25 ✓

The remainder is always STRICTLY LESS than the divisor!

Long division method:
   7 3 | 5
 - 5   |___
   2 3  14 remainder 3
 - 2 0
   0 3`
        },
        {
          title: 'Exercises — Mental Math',
          content: `Quick Mental Math — CE2:

Series A (Multiplication Tables):
1. 7 × 8 = ___    6. 9 × 6 = ___
2. 6 × 7 = ___    7. 8 × 4 = ___
3. 9 × 9 = ___    8. 7 × 7 = ___
4. 5 × 8 = ___    9. 6 × 9 = ___
5. 4 × 7 = ___   10. 8 × 8 = ___

Series B (Word Problems):
11. A merchant has 84 oranges. He distributes them equally into 7 bags. How many oranges are there in each bag?

12. A class has 32 students. For a game, they are split into groups of 4. How many groups can be formed?

13. Amina buys 6 books at 350 F CFA each. How much does she pay in total?`
        },
        {
          title: 'Lesson 3 — Fractions',
          content: `A FRACTION represents a part of a whole.

      1   ← Numerator (part taken)
      ─
      4   ← Denominator (number of equal parts)

Read: "one quarter"

Common fractions:
• 1/2 = one half       (shared in 2 parts)
• 1/3 = one third      (shared in 3 parts)
• 1/4 = one quarter    (shared in 4 parts)
• 3/4 = three quarters (3 parts out of 4)

Compare fractions with the same denominator:
If the denominator is the same, the larger fraction is the one with the larger numerator.

3/5 > 2/5 > 1/5

Application:
Lola eats 2/8 of a pizza and her brother eats 5/8.
Who ate the most? How much is left?`
        }
      ] : [
        {
          title: 'Leçon 1 — La multiplication',
          content: `La MULTIPLICATION est une addition répétée.

Définition : Multiplier, c'est additionner un nombre plusieurs fois lui-même.

Exemple : 4 × 3 = 4 + 4 + 4 = 12
On lit : « quatre fois trois égale douze »

Le signe de la multiplication est : ×
Le résultat d'une multiplication s'appelle le PRODUIT.
Les nombres que l'on multiplie s'appellent les FACTEURS.

Propriété importante :
L'ordre des facteurs ne change pas le produit !
5 × 3 = 3 × 5 = 15   (propriété commutative)

Table de multiplication par 4 :
4 × 1 = 4    |   4 × 6 = 24
4 × 2 = 8    |   4 × 7 = 28
4 × 3 = 12   |   4 × 8 = 32
4 × 4 = 16   |   4 × 9 = 36
4 × 5 = 20   |   4 × 10 = 40`
        },
        {
          title: 'Leçon 2 — La division euclidienne',
          content: `La DIVISION EUCLIDIENNE permet de partager une quantité en groupes égaux.

Vocabulaire de la division :
   48  ÷  6  =  8
   ↑      ↑     ↑
DIVIDENDE DIVISEUR QUOTIENT

Lire : « 48 divisé par 6 égale 8 »

La division avec reste :
25 ÷ 4 = 6 reste 1
Vérification : (6 × 4) + 1 = 24 + 1 = 25 ✓

Le reste est toujours STRICTEMENT INFÉRIEUR au diviseur !

Méthode de la division posée :
   7 3 | 5
 - 5   |___
   2 3  14 reste 3
 - 2 0
   0 3`
        },
        {
          title: 'Exercices — Calcul mental',
          content: `Calcul mental rapide — CE2 :

Série A (Tables de multiplication) :
1. 7 × 8 = ___    6. 9 × 6 = ___
2. 6 × 7 = ___    7. 8 × 4 = ___
3. 9 × 9 = ___    8. 7 × 7 = ___
4. 5 × 8 = ___    9. 6 × 9 = ___
5. 4 × 7 = ___   10. 8 × 8 = ___

Série B (Problèmes) :
11. Un marchand a 84 oranges. Il les répartit également dans 7 sacs. Combien d'oranges y a-t-il dans chaque sac ?

12. Une classe a 32 élèves. Pour un jeu, on les sépare en groupes de 4. Combien de groupes peut-on former ?

13. Amina achète 6 livres à 350 F CFA chaque. Combien paye-t-elle au total ?`
        },
        {
          title: 'Leçon 3 — Les fractions',
          content: `Une FRACTION représente une partie d'un tout.

      1   ← Numérateur (partie prise)
      ─
      4   ← Dénominateur (nombre de parties égales)

Se lit : « un quart »

Fractions courantes :
• 1/2 = une demie      (partage en 2 parties)
• 1/3 = un tiers       (partage en 3 parties)
• 1/4 = un quart       (partage en 4 parties)
• 3/4 = trois quarts   (3 parties sur 4)

Comparer des fractions de même dénominateur :
Si le dénominateur est le même, la plus grande fraction est celle qui a le plus grand numérateur.

3/5 > 2/5 > 1/5

Application :
Lola mange 2/8 d'une pizza et son frère mange 5/8.
Qui en a mangé le plus ? Combien reste-t-il ?`
        }
      ]
    },
    {
      id: 3,
      titre: isEn ? 'History of Cameroon' : 'Histoire du Cameroun',
      title: isEn ? 'History of Cameroon' : 'Histoire du Cameroun',
      auteur: 'Marc Ela',
      author: 'Marc Ela',
      isbn: '978-2-09-555',
      specialty: isEn ? 'History' : 'Histoire',
      category: isEn ? 'History' : 'Histoire',
      copies: 22,
      available: 22,
      rating: 4.3,
      salles: ['CM1 A', 'CM2 A', 'Class 5', 'Class 6'],
      pages: isEn ? [
        {
          title: 'Chapter 1 — The Origins of Cameroon',
          content: `THE ORIGINS OF CAMEROON

Cameroon is a country located in Central Africa. Its name comes from the Portuguese "Rio dos Camarões" (river of prawns), given by Portuguese explorers who discovered the Wouri estuary in the 15th century.

Prehistoric Settlement:
The territory of present-day Cameroon has been inhabited for millennia. The Baka Pygmies are considered the oldest inhabitants of the Cameroonian forests.

Major Historical Ethnic Groups:
• The Fang and Beti (Center and South)
• The Bamileke (High Plateaus)
• The Fulani (Far North)
• The Sawa (Coastal)
• The populations of the Northwest and Southwest

Pre-colonial Cameroon knew organized kingdoms and chiefdoms, like the Bamoun Kingdom (founded in the 14th century) and the Fulani lamidats of the North.`
        },
        {
          title: 'Chapter 2 — The Colonial Period',
          content: `THE COLONIZATION OF CAMEROON

1884 — German Protectorate:
On July 12, 1884, Dr. Gustav Nachtigal signed a protectorate treaty in Douala with the Duala chiefs. Cameroon became "Kamerun", a German colony.

During this period:
• Construction of the railway (Douala - Yaounde)
• Development of plantations (cocoa, coffee, rubber)
• Evangelization and creation of the first schools

1916 — First World War:
Franco-British forces expelled the Germans. Cameroon was divided into two zones:
→ 4/5 administered by France (French Cameroun)
→ 1/5 administered by Great Britain (British Cameroons)

The mandate of the League of Nations (LoN) was granted in 1922.

Key Person:
Rudolf Douala Manga Bell — Duala chief hanged by the Germans in 1914 for protesting against the expropriation of his people's lands. He is today considered a national hero.`
        },
        {
          title: 'Chapter 3 — Independence',
          content: `INDEPENDENCE OF CAMEROON

January 1, 1960 — Independence of French Cameroun:
After long negotiations and the struggle of nationalist parties (notably the UPC led by Ruben Um Nyobe), French Cameroun gained independence.

Ahmadou Ahidjo became the first President of the Republic of Cameroon.

October 1, 1961 — Reunification:
Following a plebiscite, British Southern Cameroons voted to join the Republic of Cameroon. The Federal Republic of Cameroon was proclaimed.

1972 — The Unitary Constitution:
A referendum abolished the federal system. Cameroon became the United Republic of Cameroon, then simply the Republic of Cameroon in 1984.

Important dates to remember:
📅 1884: German Protectorate
📅 1916: Franco-British partition
📅 January 1, 1960: Independence
📅 October 1, 1961: Reunification`
        },
        {
          title: 'Exercises — History Review',
          content: `REVIEW EXERCISES

I. Short Answer Questions:
1. What is the origin of the name "Cameroon"?
2. Which nation first colonized Cameroon?
3. Who was Rudolf Douala Manga Bell and why is he famous?
4. What is the date of Cameroon's independence?
5. What was the reunification of 1961?

II. Complete the chronological table:

Year  | Event
----- | ---------
1884  | ________________
1916  | ________________
1960  | ________________
1961  | ________________
1972  | ________________

III. True or False:
a. Cameroon is located in West Africa. ( )
b. Baka Pygmies are ancient inhabitants. ( )
c. Ahmadou Ahidjo was the first President. ( )
d. The UPC was led by Um Nyobe. ( )`
        }
      ] : [
        {
          title: 'Chapitre 1 — Les origines du Cameroun',
          content: `LES ORIGINES DU CAMEROUN

Le Cameroun est un pays situé en Afrique Centrale. Son nom vient du portugais « Rio dos Camarões » (rivière des crevettes), donné par les explorateurs portugais qui découvrirent l'estuaire du Wouri au XVe siècle.

Peuplement préhistorique :
Le territoire du Cameroun actuel est habité depuis des millénaires. Les Pygmées Baka sont considérés comme les habitants les plus anciens des forêts camerounaises.

Les grands groupes ethniques historiques :
• Les Fang et Beti (Centre et Sud)
• Les Bamiléké (Hauts Plateaux)
• Les Peuls (Grand Nord)
• Les Sawa (Littoral)
• Les populations du Nord-Ouest et Sud-Ouest

Le Grand Cameroun précolonial connaissait des royaumes et chefferies organisés, comme le Royaume Bamoun (fondé au XIVe siècle) et les lamidats peuls du Nord.`
        },
        {
          title: 'Chapitre 2 — La période coloniale',
          content: `LA COLONISATION DU CAMEROUN

1884 — Protectorat allemand :
Le 12 juillet 1884, le Dr Gustav Nachtigal signe à Douala un traité de protectorat avec les chefs Duala. Le Cameroun devient le « Kamerun », colonie allemande.

Durant cette période :
• Construction du chemin de fer (Douala - Yaoundé)
• Développement des plantations (cacao, café, caoutchouc)
• Évangélisation et création des premières écoles

1916 — Première Guerre Mondiale :
Les forces franco-britanniques chassent les Allemands. Le Cameroun est divisé en deux zones :
→ 4/5 administré par la France (Cameroun français)
→ 1/5 administré par la Grande-Bretagne (Cameroun britannique)

Le mandat de la Société des Nations (SDN) est accordé en 1922.

Personnage clé :
Rudolf Douala Manga Bell — Chef Duala pendu par les Allemands en 1914 pour avoir protesté contre l'expropriation des terres de son peuple. Il est aujourd'hui considéré comme un héros national.`
        },
        {
          title: 'Chapitre 3 — L\'indépendance',
          content: `L'INDÉPENDANCE DU CAMEROUN

Le 1er janvier 1960 — Indépendance du Cameroun français :
Après de longues négociations et la lutte des partis nationalistes (notamment l'UPC dirigée par Ruben Um Nyobè), le Cameroun français accède à l'indépendance.

Ahmadou Ahidjo devient le premier Président de la République du Cameroun.

Le 1er octobre 1961 — Réunification :
À la suite d'un plébiscite, le Cameroun du Sud-Ouest britannique vote pour rejoindre la République du Cameroun. La République Fédérale du Cameroun est proclamée.

1972 — La Constitution unitaire :
Un référendum abolit le système fédéral. Le Cameroun devient la République Unie du Cameroun, puis simplement la République du Cameroun en 1984.

Dates importantes à retenir :
📅 1884 : Protectorat allemand
📅 1916 : Partage franco-britannique
📅 1er janvier 1960 : Indépendance
📅 1er octobre 1961 : Réunification`
        },
        {
          title: 'Exercices — Révision Histoire',
          content: `EXERCICES DE RÉVISION

I. Questions à réponses courtes :
1. Quel est l'origine du nom « Cameroun » ?
2. Quelle nation a colonisé le Cameroun en premier ?
3. Qui était Rudolf Douala Manga Bell et pourquoi est-il célèbre ?
4. Quelle est la date de l'indépendance du Cameroun ?
5. Qu'est-ce que la réunification de 1961 ?

II. Complète le tableau chronologique :

Année | Événement
----- | ---------
1884  | ________________
1916  | ________________
1960  | ________________
1961  | ________________
1972  | ________________

III. Vrai ou Faux :
a. Le Cameroun est situé en Afrique de l'Ouest. ( )
b. Les Pygmées Baka sont des habitants anciens. ( )
c. Ahmadou Ahidjo est le premier Président. ( )
d. L'UPC était dirigée par Um Nyobè. ( )`
        }
      ]
    },
    {
      id: 4,
      titre: 'English for Kids — SIL/CP',
      title: 'English for Kids — SIL/CP',
      auteur: 'Oxford Primary',
      author: 'Oxford Primary',
      isbn: '978-0-19-666',
      specialty: isEn ? 'English' : 'Anglais',
      category: isEn ? 'English' : 'Anglais',
      copies: 28,
      available: 15,
      rating: 4.1,
      salles: ['SIL A', 'SIL B', 'CP A', 'CP B', 'Class 1', 'Class 2'],
      pages: [
        {
          title: 'Lesson 1 — The Alphabet',
          content: `THE ALPHABET — Learn Your ABCs!

The English alphabet has 26 letters.

UPPERCASE: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
lowercase:  a b c d e f g h i j k l m n o p q r s t u v w x y z

Vowels (5): A  E  I  O  U
Consonants (21): all the other letters

Let's practice! Trace and say each letter:
🅰️ A a — Apple (une pomme)
🅱️ B b — Ball (un ballon)
🇨 C c — Cat (un chat)
🇩 D d — Dog (un chien)
🇪 E e — Egg (un œuf)
🇫 F f — Fish (un poisson)
🇬 G g — Girl (une fille)
🇭 H h — House (une maison)

Song: "A-B-C-D-E-F-G, H-I-J-K-L-M-N-O-P,
Q-R-S, T-U-V, W-X, Y and Z.
Now I know my ABCs, next time won't you sing with me?"`
        },
        {
          title: 'Lesson 2 — Colors and Numbers',
          content: `COLORS — Les Couleurs:

🔴 RED    = rouge       🔵 BLUE   = bleu
🟡 YELLOW = jaune       🟢 GREEN  = vert
🟤 BROWN  = marron      ⚫ BLACK  = noir
⚪ WHITE  = blanc       🟠 ORANGE = orange

Practice: "The sky is BLUE. The sun is YELLOW. The grass is GREEN."

NUMBERS 1 to 10 — Les Chiffres:
1 = ONE      ——→ one apple
2 = TWO      ——→ two balls
3 = THREE    ——→ three cats
4 = FOUR     ——→ four dogs
5 = FIVE     ——→ five fish
6 = SIX      ——→ six eggs
7 = SEVEN    ——→ seven stars
8 = EIGHT    ——→ eight books
9 = NINE     ——→ nine birds
10 = TEN     ——→ ten flowers

Count with me: One, two, three, four, five...
Once I caught a fish alive! 🐟`
        },
        {
          title: 'Lesson 3 — Greetings',
          content: `GREETINGS — Comment se saluer en anglais:

Morning greetings:
🌅 "Good morning!" = Bonjour (le matin)
☀️  "Good afternoon!" = Bon après-midi
🌙 "Good evening!" = Bonsoir
😴 "Good night!" = Bonne nuit

Meeting someone:
👋 "Hello! / Hi!" = Bonjour / Salut
🤝 "How are you?" = Comment vas-tu ?
😊 "I am fine, thank you!" = Je vais bien, merci !
🙂 "And you?" = Et toi ?

Saying goodbye:
👋 "Goodbye! / Bye bye!" = Au revoir
🙋 "See you tomorrow!" = À demain

Simple dialogue to practice:
Ali: "Good morning, Amina!"
Amina: "Good morning, Ali! How are you?"
Ali: "I am fine, thank you! And you?"
Amina: "I am very well, thank you!"
Ali: "Goodbye, Amina!"
Amina: "Goodbye! See you tomorrow!"`
        },
        {
          title: 'Lesson 4 — My Body',
          content: `MY BODY — Les parties du corps:

HEAD = tête         HAIR = cheveux
EYES = yeux         EARS = oreilles
NOSE = nez          MOUTH = bouche
NECK = cou          SHOULDER = épaule
ARM = bras          HAND = main
FINGER = doigt      CHEST = poitrine
STOMACH = ventre    LEG = jambe
KNEE = genou        FOOT = pied
TOE = orteil

Song: "Head, shoulders, knees and toes,
Knees and toes!
Head, shoulders, knees and toes,
Knees and toes!
Eyes and ears and mouth and nose,
Head, shoulders, knees and toes!"

Exercise — Fill in the blanks:
1. I see with my __________.
2. I hear with my __________.
3. I smell with my __________.
4. I eat with my __________.
5. I walk with my __________.`
        }
      ]
    },
    {
      id: 5,
      titre: isEn ? 'English Grammar CP-CE1' : 'Grammaire Française CP-CE1',
      title: isEn ? 'English Grammar CP-CE1' : 'Grammaire Française CP-CE1',
      auteur: isEn ? 'Oxford Primary Grammar' : 'Bescherelle Junior',
      author: isEn ? 'Oxford Primary Grammar' : 'Bescherelle Junior',
      isbn: '978-2-01-333',
      specialty: isEn ? 'French' : 'Français',
      category: isEn ? 'French' : 'Français',
      copies: 35,
      available: 28,
      rating: 4.6,
      salles: ['CP A', 'CP B', 'CE1 A', 'CE1 B', 'Class 2', 'Class 3'],
      pages: isEn ? [
        {
          title: 'Lesson 1 — Letters and Sounds',
          content: `LETTERS AND SOUNDS

The English alphabet has 26 letters.

VOWELS (5): A — E — I — O — U
They are written with a single open sound.

CONSONANTS (21): all the other letters.

Simple sounds:
A as in APPLE      🍎
E as in ELEPHANT   🐘
I as in IGLOO      ❄️
O as in OCTOPUS    🐙
U as in UMBRELLA   ☂️

Letter combinations:
• SH → SHIP   🚢
• CH → CHAIR  🪑
• TH → THREE  3
• PH → PHONE  📞

Golden rule:
Every word is written as it is pronounced...
...but there are many exceptions to learn!`
        },
        {
          title: 'Lesson 2 — Nouns and Articles',
          content: `THE NOUN — What is it?

A NOUN is a word that names:
• A person: boy, girl, teacher, mother
• An animal: dog, bird, lion, fish
• A thing: book, house, pen, table
• A place: school, Cameroon, forest, river

PROPER NOUN: names a specific person or place.
→ It always starts with a CAPITAL letter.
Examples: Kofi, Yaounde, Cameroon, Amina

COMMON NOUN: names any general person, animal, thing, or place.
→ It starts with a lowercase letter.
Examples: boy, city, country, child

THE ARTICLE:
Singular: THE / A / AN (the book, a boy, an apple)
Pluriel: THE / SOME (the books, some children)

Exercise:
Classify these words: (Yaounde / school / Amina / book / Cameroon / pen)
→ Proper Nouns: ___________________
→ Common Nouns: __________________`
        },
        {
          title: 'Lesson 3 — The Verbs Be and Have',
          content: `THE VERBS TO BE AND TO HAVE

These two very important verbs are called auxiliary verbs.

TO BE in the present tense:
I     AM      (I am happy)
You   ARE     (You are kind)
He/She IS     (She is beautiful)
We    ARE     (We are at school)
You   ARE     (You are students)
They  ARE     (They are tall)

TO HAVE in the present tense:
I     HAVE    (I have a book)
You   HAVE    (You have a pencil)
He/She HAS    (She has a ruler)
We    HAVE    (We have notebooks)
You   HAVE    (You have an eraser)
They  HAVE    (They have pens)

Tip to remember:
TO BE: I am, you are, he is...
TO HAVE: I have, you have, he has...

Exercise — Complete with BE or HAVE:
1. I ___ a good student.
2. You ___ happy to come to school.
3. She ___ a beautiful red dress.
4. We ___ hungry after recess.`
        },
        {
          title: 'Exercises — Dictation and Conjugation',
          content: `PREPARED DICTATION — Lesson of the day:

Text to read and memorize:
"The children are at school. They have notebooks and pencils. The teacher is kind. She has a big ruler. We are good students."

After the dictation, answer the questions:
1. Who is at school?
2. What do the children have?
3. How is the teacher?

CONJUGAISON — Substitution exercise:
Conjugate the verb TO BE with all pronouns:
Example: (to be) tall
I ___________
You ___________
He / She ___________
We ___________
You ___________
They ___________

SPELLING — Words to know how to write:
school / house / child / boy / board
pencil / notebook / teacher / lesson / hello`
        }
      ] : [
        {
          title: 'Leçon 1 — Les lettres et les sons',
          content: `LES LETTRES ET LES SONS

L'alphabet français compte 26 lettres.

Les VOYELLES (6) : A — E — I — O — U — Y
Elles s'écrivent avec un seul son ouvert.

Les CONSONNES (20) : toutes les autres lettres.

Les sons simples :
A comme ANANAS   🍍
E comme ÉLÉPHANT 🐘
I comme ILE       🏝️
O comme OISEAU    🦅
U comme UNIFORME  👮

Combinaisons de lettres :
• CH → CHAT    🐱 (son doux)
• PH → PHOTO   📷 (son « f »)
• OI → OIE     🦢 (son « wa »)
• EU → FEU     🔥
• OU → LOUP    🐺

Règle d'or :
Chaque mot s'écrit comme il se prononce...
...mais il y a des exceptions qu'il faut apprendre !`
        },
        {
          title: 'Leçon 2 — Le nom et l\'article',
          content: `LE NOM — Qu'est-ce que c'est ?

Le NOM est un mot qui désigne :
• Une personne : garçon, fille, maître, maman
• Un animal : chien, oiseau, lion, poisson
• Une chose : livre, maison, stylo, table
• Un lieu : école, Cameroun, forêt, rivière

Le NOM PROPRE : désigne une personne ou un lieu précis.
→ Il s'écrit toujours avec une MAJUSCULE.
Exemples : Kofi, Yaoundé, Cameroun, Amina

Le NOM COMMUN : désigne n'importe quel être ou chose.
→ Il s'écrit avec une minuscule.
Exemples : garçon, ville, pays, enfant

L'ARTICLE :
Masculin : LE / UN (le livre, un garçon)
Féminin : LA / UNE (la maison, une fille)
Pluriel : LES / DES (les livres, des enfants)

Exercice :
Classe ces mots : (Yaoundé / école / Amina / livre / Cameroun / stylo)
→ Noms propres : ___________________
→ Noms communs : __________________`
        },
        {
          title: 'Leçon 3 — Le verbe être et avoir',
          content: `LES VERBES ÊTRE ET AVOIR

Ces deux verbes très importants s'appellent les auxiliaires.

ÊTRE au présent :
Je    SUIS    (Je suis content)
Tu    ES      (Tu es gentil)
Il/Elle EST   (Elle est belle)
Nous  SOMMES  (Nous sommes à l'école)
Vous  ÊTES    (Vous êtes des élèves)
Ils/Elles SONT (Ils sont grands)

AVOIR au présent :
J'    AI      (J'ai un livre)
Tu    AS      (Tu as un crayon)
Il/Elle A     (Elle a une règle)
Nous  AVONS   (Nous avons des cahiers)
Vous  AVEZ    (Vous avez une gomme)
Ils/Elles ONT (Ils ont des stylos)

Astuce pour retenir :
ÊTRE : Je SUIS, tu ES, il EST → pense à « SÉE »
AVOIR : J'AI, tu AS, il A → pense à « AAA »

Exercice — Complète avec ÊTRE ou AVOIR :
1. Je ___ un bon élève.
2. Tu ___ content de venir à l'école.
3. Elle ___ une belle robe rouge.
4. Nous ___ faim après la récréation.`
        },
        {
          title: 'Exercices — Dictée et Conjugaison',
          content: `DICTÉE PRÉPARÉE — Leçon du jour :

Texte à lire et à mémoriser :
« Les enfants sont à l'école. Ils ont des cahiers et des crayons. La maîtresse est gentille. Elle a une grande règle. Nous sommes de bons élèves. »

Après la dictée, réponds aux questions :
1. Qui est à l'école ?
2. Qu'est-ce que les enfants ont ?
3. Comment est la maîtresse ?

CONJUGAISON — Exercice de substitution :
Conjugue le verbe ÊTRE avec tous les pronoms :
Exemple : (être) grand(e)
Je ___________
Tu ___________
Il / Elle ___________
Nous ___________
Vous ___________
Ils / Elles ___________

ORTHOGRAPHE — Les mots à savoir écrire :
école / maison / enfant / garçon / tableau
crayon / cahier / maître / leçon / bonjour`
        }
      ]
    },
    {
      id: 6,
      titre: isEn ? 'Science & Technology CM2' : 'Sciences & Technologie CM2',
      title: isEn ? 'Science & Technology CM2' : 'Sciences & Technologie CM2',
      auteur: 'Hatier',
      author: 'Hatier',
      isbn: '978-2-01-444',
      specialty: isEn ? 'Sciences' : 'Sciences',
      category: isEn ? 'Sciences' : 'Sciences',
      copies: 20,
      available: 12,
      rating: 4.0,
      salles: ['CM2 A', 'Class 6'],
      pages: isEn ? [
        {
          title: 'Chapter 1 — The Human Body',
          content: `THE HUMAN BODY AND ITS SYSTEMS

The human body is made up of many organs grouped into SYSTEMS.

The Skeletal System (Skeleton):
• The skeleton consists of 206 bones in adults.
• It supports the body and protects vital organs.
• Main bones: skull, spine, ribs, femur.

The Muscular System:
• Muscles allow body movement.
• There are more than 600 muscles in the human body.
• Muscles attach to bones via tendons.

The Digestive System:
Mouth → Esophagus → Stomach → Small Intestine → Large Intestine
• Digestion transforms food into nutrients.
• It takes on average 24 to 48 hours.

The Respiratory System:
• We breathe about 20,000 times a day.
• Air enters through the nose/mouth, goes down the trachea, arrives in the lungs.
• Lungs exchange oxygen (O₂) for carbon dioxide (CO₂).

Good to know:
The heart beats about 70 times per minute, which is 100,000 times per day!`
        },
        {
          title: 'Chapter 2 — The States of Matter',
          content: `THE STATES OF MATTER

Matter can exist in 3 different states:

1. The SOLID State:
• Fixed shape and volume (do not change)
• Molecules are very close and highly ordered
• Examples: ice, rock, wood, metal

2. The LIQUID State:
• Fixed volume but variable shape (takes the shape of the container)
• Molecules are close but can move
• Examples: water, milk, juice, oil

3. The GASEOUS State:
• Neither shape nor volume is fixed (spreads everywhere)
• Molecules are very far apart and move rapidly
• Examples: water vapor, air, oxygen

Changes of State:
Melting: SOLID → LIQUID (ice melts)
Solidification: LIQUID → SOLID (water freezes)
Vaporization: LIQUID → GAS (water boils)
Condensation: GAS → LIQUID (fog on a mirror)

Experiment: What happens to an ice cube left in the sun?
Step 1: The ice cube melts (MELTING at 0°C)
Step 2: The heated water evaporates (VAPORIZATION at 100°C)`
        },
        {
          title: 'Chapter 3 — Plants',
          content: `PLANT LIFE

Plants are living things that make their own food.

Parts of a Plant:
🌱 ROOT: fixes the plant in the soil, absorbs water and minerals.
🌿 STEM: transports sap between roots and leaves. It supports the plant.
🍃 LEAF: manufactures the plant's food through photosynthesis.
🌸 FLOWER: reproductive organ. It attracts pollinating insects.
🍎 FRUIT: contains seeds for reproduction.

PHOTOSYNTHESIS:
Plants make their food using:
→ Sunlight (energy)
→ Water absorbed by roots (H₂O)
→ CO₂ from air (carbon dioxide)

Light + CO₂ + H₂O → Sugar (food) + O₂

Plants therefore produce the OXYGEN we breathe!

Life Cycle of a Flowering Plant:
Seed → Germination → Seedling → Adult Plant → Flowering → Fruiting → New Seed`
        },
        {
          title: 'Scientific Exercises',
          content: `SCIENCE & TECHNOLOGY EXERCISES — CM2

I. The Human Body — Match each organ to its function:
Heart       ●     ● Digest food
Lungs       ●     ● Pump blood
Stomach     ●     ● Breathe oxygen
Brain       ●     ● Command the body

II. States of Matter — Classify these items:
(water / iron / smoke / milk / stone / vapor / ice / oil / air)
→ Solid: _______________________________
→ Liquid: _______________________________
→ Gaseous: _______________________________

III. Plants — True or False:
a. Roots produce oxygen. ( )
b. Photosynthesis takes place in the leaves. ( )
c. Plants do not need light. ( )
d. Fruit contains seeds. ( )

IV. Mini-experiment to do at home:
Plant a bean in a glass with moist soil. Observe and draw its growth for 7 days. Note your observations each day.`
        }
      ] : [
        {
          title: 'Chapitre 1 — Le corps humain',
          content: `LE CORPS HUMAIN ET SES SYSTÈMES

Le corps humain est constitué de nombreux organes regroupés en SYSTÈMES.

Le système osseux (Le squelette) :
• Le squelette est formé de 206 os chez l'adulte.
• Il soutient le corps et protège les organes vitaux.
• Os principaux : crâne, colonne vertébrale, côtes, fémur.

Le système musculaire :
• Les muscles permettent les mouvements du corps.
• Il y a plus de 600 muscles dans le corps humain.
• Les muscles s'attachent aux os grâce aux tendons.

Le système digestif :
Bouche → Œsophage → Estomac → Intestin grêle → Gros intestin
• La digestion transforme les aliments en nutriments.
• Elle dure en moyenne 24 à 48 heures.

Le système respiratoire :
• Nous respirons environ 20 000 fois par jour.
• L'air entre par le nez/la bouche, descend dans la trachée, arrive aux poumons.
• Les poumons échangent l'oxygène (O₂) contre le dioxyde de carbone (CO₂).

Bon à savoir :
Le cœur bat environ 70 fois par minute, soit 100 000 fois par jour !`
        },
        {
          title: 'Chapitre 2 — Les états de la matière',
          content: `LES ÉTATS DE LA MATIÈRE

La matière peut exister sous 3 états différents :

1. L'état SOLIDE :
• Forme et volume fixes (ne changent pas)
• Les molécules sont très proches et très ordonnées
• Exemples : glace, roche, bois, métal

2. L'état LIQUIDE :
• Volume fixe mais forme variable (prend la forme du récipient)
• Les molécules sont proches mais peuvent bouger
• Exemples : eau, lait, jus, huile

3. L'état GAZEUX :
• Ni forme ni volume fixes (se répand partout)
• Les molécules sont très éloignées et bougent rapidement
• Exemples : vapeur d'eau, air, dioxygène

Les changements d'état :
Fusion : SOLIDE → LIQUIDE (la glace fond)
Solidification : LIQUIDE → SOLIDE (l'eau gèle)
Vaporisation : LIQUIDE → GAZ (l'eau bout)
Condensation : GAZ → LIQUIDE (la buée sur un miroir)

Expérience : Qu'arrive-t-il à un glaçon laissé au soleil ?
Étape 1 : Le glaçon fond (FUSION à 0°C)
Étape 2 : L'eau chauffée s'évapore (VAPORISATION à 100°C)`
        },
        {
          title: 'Chapitre 3 — Les plantes',
          content: `LA VIE DES PLANTES

Les plantes sont des êtres vivants qui fabriquent leur propre nourriture.

Les parties d'une plante :
🌱 La RACINE : fixe la plante dans le sol, absorbe l'eau et les sels minéraux.
🌿 La TIGE : transporte la sève entre les racines et les feuilles. Elle soutient la plante.
🍃 La FEUILLE : fabrique la nourriture de la plante grâce à la photosynthèse.
🌸 La FLEUR : organe de reproduction. Elle attire les insectes pollinisateurs.
🍎 Le FRUIT : contient les graines pour la reproduction.

La PHOTOSYNTHÈSE :
Les plantes fabriquent leur nourriture grâce à :
→ La lumière du soleil (énergie)
→ L'eau absorbée par les racines (H₂O)
→ Le CO₂ de l'air (dioxyde de carbone)

Lumière + CO₂ + H₂O → Sucre (nourriture) + O₂

Les plantes produisent donc l'OXYGÈNE que nous respirons !

Cycle de vie d'une plante à fleurs :
Graine → Germination → Plantule → Plante adulte → Floraison → Fructification → Nouvelle graine`
        },
        {
          title: 'Exercices Scientifiques',
          content: `EXERCICES DE SCIENCES & TECHNOLOGIE — CM2

I. Le corps humain — Relie chaque organe à sa fonction :
Cœur        ●     ● Digérer les aliments
Poumons     ●     ● Respirer l'oxygène
Estomac     ●     ● Pomper le sang
Cerveau     ●     ● Commander le corps

II. États de la matière — Classe ces éléments :
(eau / fer / fumée / lait / pierre / vapeur / glace / huile / air)
→ Solide : _______________________________
→ Liquide : _______________________________
→ Gazeux : _______________________________

III. Les plantes — Vrai ou Faux :
a. Les racines produisent l'oxygène. ( )
b. La photosynthèse se fait dans les feuilles. ( )
c. Les plantes n'ont pas besoin de lumière. ( )
d. Le fruit contient les graines. ( )

IV. Mini-expérience à faire à la maison :
Plante un haricot dans un verre avec de la terre humide. Observe et dessine sa croissance pendant 7 jours. Note tes observations chaque jour.`
        }
      ]
    }
  ];
};
