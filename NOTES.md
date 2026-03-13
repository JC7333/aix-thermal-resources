# NOTES — ÉTUVE Sprint 1 Blocage

## Date : 2026-03-12

## BLOCAGE — ÉTAPE 0 OBLIGATOIRE

### Commande exécutée
```powershell
cd C:\dev\coolance; git branch; git status; node -e "const d = require('./src/data/evidence-pack.json'); console.log('V1 entries: ' + d.length)"; npx tsc -p tsconfig.json --noEmit 2>&1 | Select-String -Pattern "error" | Measure-Object | Select-Object -ExpandProperty Count
```

### Résultat obtenu
- Branche : `main` ✅
- Working tree : clean ✅
- V1 entries : **5** ❌ (attendu : 11)
- Erreurs TypeScript : `0` ✅

### Problème
`src/data/evidence-pack.json` ne contient que **5 entrées** au lieu des **11 attendues**.

Le brief indique que les 11 pathologies suivantes doivent déjà être présentes :
- arthrose
- lombalgie-chronique
- insuffisance-veineuse-chronique
- bpco
- otites-a-repetition-enfant
- coxarthrose
- fibromyalgie
- rhinosinusite-chronique
- tendinopathie-coiffe
- arthrose-digitale
- asthme

### Action requise
Le Dr ou l'équipe doit vérifier pourquoi `evidence-pack.json` n'a que 5 entrées.
Possibilités :
1. Le fichier a été écrasé lors d'un commit récent (vérifier `git log -- src/data/evidence-pack.json`)
2. Les 6 entrées manquantes n'ont pas encore été ajoutées au fichier
3. Mauvaise branche ou mauvais repo

### Commandes de diagnostic suggérées
```powershell
# Historique du fichier
cd C:\dev\coolance; git log --oneline -- src/data/evidence-pack.json

# Voir le contenu actuel
cd C:\dev\coolance; node -e "const d = require('./src/data/evidence-pack.json'); d.forEach(e => console.log(e.id || e.slug || JSON.stringify(e).slice(0,60)))"
```

### Décision
Sprint 1 **EN ATTENTE**. Aucun fichier créé ou modifié conformément aux instructions.
Reprendre lorsque `evidence-pack.json` contiendra bien 11 entrées.
