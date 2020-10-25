// Elements html
const $joueur = document.querySelector('.joueur');
const $plateau = document.querySelector('.plateau');
const $cellules = document.querySelectorAll('.cellule');
const $rejouer = document.querySelector('.rejouer');

// Constantes
const CLASS_JOUEUR_1 = "player-one";
const CLASS_JOUEUR_2 = "player-two";
const NOM_JOUEUR_1 = 'Le vert';
const NOM_JOUEUR_2 = 'Le rouge';

// Variables
let tourJoueur2 = false;


// Nouvelle partie
$rejouer.addEventListener('click', reset);
$joueur.textContent = NOM_JOUEUR_1;
nouvellePartie();

function nouvellePartie() {

    $cellules.forEach(cellule => {
        cellule.addEventListener('click', auClic, { once: true });
    }); 

}


// Je fais queloque chose quand je clique sur une cellule
function auClic(event){
    
    const celluleActuelle = event.target;
    const classeActuelle = tourJoueur2 ? CLASS_JOUEUR_2 : CLASS_JOUEUR_1;
    const joueurSuivant = tourJoueur2 ? NOM_JOUEUR_1 : NOM_JOUEUR_2;
    const joueurActuel = tourJoueur2 ? NOM_JOUEUR_2 : NOM_JOUEUR_1;

    celluleActuelle.classList.add(classeActuelle);
    $joueur.textContent = joueurSuivant;
    

    // if (tourJoueur2) {
    //     // True
    //     classeActuelle = CLASS_JOUEUR_2
    // }
    // else {
    //     // False
    //     classeActuelle = CLASS_JOUEUR_1
    // }
    if(verifierVictoire(classeActuelle, joueurSuivant)){

        $joueur.textContent = joueurActuel + ' a gagné !';
        stop();
    } else {

        if(egalite() == true) {
            $joueur.textContent = 'Egalité';
        }
    
        nouveauTour();
    }


}

function nouveauTour() {
    tourJoueur2 = !tourJoueur2;
}

function reset() {

    $joueur.textContent = NOM_JOUEUR_1;
    tourJoueur2 = false;
    
    $cellules.forEach(cellule => {
        cellule.classList.remove(CLASS_JOUEUR_1, CLASS_JOUEUR_2);
    });

    nouvellePartie();
}

function egalite() {

    for(let i = 0; i < $cellules.length; i++)
    {
        const cellule = $cellules[i];
        const classeExistante = cellule.classList.contains(CLASS_JOUEUR_1) || cellule.classList.contains(CLASS_JOUEUR_2);

        if (classeExistante == false){
            // return console.log('Pas rempli')
            return false;
        }
    }

    return true;

}

function verifierVictoire(classeActuelle, joueurSuivant) {

    // if($cellules[0].classList.contains(classeActuelle) && $cellules[1].classList.contains(classeActuelle) && $cellules[2].classList.contains(classeActuelle)) console.log('Gagné');

    for (let i = 0; i < $cellules.length; i = i + 3) {
        if (verifHorizontal($cellules, i, classeActuelle, joueurSuivant)) return true;
    }

    for (let i = 0; i < $cellules.length - 6 ; i++) {
        if (verifVertical($cellules, i, classeActuelle, joueurSuivant)) return true;
    }

    if(verifDiagonal($cellules, classeActuelle, joueurSuivant)) return true;

    return false;

}

function verifHorizontal(cell, i, classeActuelle) {
    if (cell[i].classList.contains(classeActuelle) && cell[i + 1].classList.contains(classeActuelle) && cell[i + 2].classList.contains(classeActuelle)) {
        return true;
    }
    else{
        return false;
    }
}

function verifVertical(cell, i, classeActuelle){
    if (cell[i].classList.contains(classeActuelle) && cell[i + 3].classList.contains(classeActuelle) && cell[i + 6].classList.contains(classeActuelle)) {
        return true;
    }
    else{
        return false;
    }

}

function verifDiagonal(cell, classeActuelle){
    if (cell[0].classList.contains(classeActuelle) && cell[4].classList.contains(classeActuelle) && cell[8].classList.contains(classeActuelle) 
    || cell[2].classList.contains(classeActuelle) && cell[4].classList.contains(classeActuelle) && cell[6].classList.contains(classeActuelle)) {
            // console.log('Gagné diagonal');
            // $joueur.textContent = joueurSuivant;
            return true;
    } else {
        return false;
    }
}

function stop() {

    $cellules.forEach(cellule => {
        cellule.removeEventListener('click', auClic);
    });
    
}