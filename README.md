# TP5 - Heroes Dashboard

## Questions obligatoires

### 1. Comment avez-vous structuré votre application ?
L'application est structurée sans framework en séparant les responsabilités en plusieurs fichiers et dossiers. Le point d'entrée `main.ts` sert de routeur minimaliste basé sur le hash de l'URL (`#/` ou `#/hero/:id`). Les vues sont isolées dans le dossier `views/` (`heroList.ts` et `heroDetail.ts`) pour gérer le rendu du DOM et l'interface utilisateur. La communication avec l'API est extraite dans `api.ts`, qui utilise des interfaces TypeScript strictes définies dans `types.ts`. Enfin, la logique 3D complexe est encapsulée dans une classe orientée objet au sein de `three/statsChart.ts`.

### 2. Comment gérez-vous les appels API ?
Les appels API sont gérés dans un module dédié (`api.ts`) en utilisant la fonction native `fetch` et `async/await`. Les réponses sont typées grâce aux interfaces TypeScript (comme `IHero`). Pour éviter les problèmes de CORS, un proxy a été configuré dans `vite.config.ts` qui redirige les requêtes `/api` vers le port 3000 de l'API REST locale. La liste implémente également un système de "debounce" (délai de 300ms) sur le champ de recherche pour éviter de spammer l'API à chaque frappe clavier.

### 3. Quels problèmes avez-vous rencontrés avec Three.js ?
L'un des défis avec Three.js a été de faire correspondre la taille du canvas à celle de son conteneur HTML sans étirer la modélisation, ce qui nécessite une écoute de l'événement `resize` de la fenêtre et une mise à jour de la matrice de projection de la caméra (`camera.updateProjectionMatrix()`). Le positionnement circulaire des barres a également nécessité des calculs trigonométriques (`Math.cos` et `Math.sin`) basés sur le nombre de statistiques à afficher.

### 4. Comment gérez-vous la mémoire et le cycle de vie ?
La mémoire et le cycle de vie sont gérés de manière rigoureuse lors du changement de route. La classe `StatsChart3D` dispose d'une méthode `destroy()` appelée explicitement par le routeur lorsque l'on quitte la page de détails du héros. Cette méthode arrête la boucle d'animation (`cancelAnimationFrame`), supprime les écouteurs d'événements comme le `resize`, vide la scène de tous ses objets, appelle `renderer.dispose()` et nettoie le conteneur HTML pour éviter toute fuite de mémoire ou superposition de contextes WebGL.

### 5. Quels compromis avez-vous faits ?
Pour garder une application minimaliste "Vanilla", j'ai choisi de manipuler le DOM avec `innerHTML` et `document.createElement`, ce qui peut être verbeux, plutôt que d'implémenter un moteur de templating complexe ou un DOM virtuel. Concernant la 3D, la visualisation est simplifiée en de simples cylindres pour les statistiques, et ne charge pas de modèles 3D externes lourds. La validation des données de l'API à l'exécution n'est pas effectuée (pas de librairie de schéma comme Zod) ; on fait confiance au type retourné par `response.json()`.

## Installation et lancement

1. S'assurer que le backend (TP4) tourne sur le port `3000`.
2. Installer les dépendances : `npm install`
3. Lancer le serveur de développement Vite : `npm run dev`
