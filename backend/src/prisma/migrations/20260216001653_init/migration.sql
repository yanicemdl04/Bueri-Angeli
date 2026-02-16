-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Enseignant', 'Parent');

-- CreateEnum
CREATE TYPE "Niveau" AS ENUM ('Maternelle', 'Primaire');

-- CreateEnum
CREATE TYPE "TypeEvaluation" AS ENUM ('Interrogation', 'Examen');

-- CreateTable
CREATE TABLE "Utilisateur" (
    "idUtilisateur" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nom" TEXT NOT NULL,
    "postnom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "motDePasse" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'Parent',
    "dernierLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("idUtilisateur")
);

-- CreateTable
CREATE TABLE "Notification" (
    "idNotification" UUID NOT NULL DEFAULT gen_random_uuid(),
    "titre" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "lue" BOOLEAN NOT NULL DEFAULT false,
    "idUtilisateur" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("idNotification")
);

-- CreateTable
CREATE TABLE "ClasseScolaire" (
    "idClasse" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nomClasse" TEXT NOT NULL,
    "niveau" "Niveau" NOT NULL,
    "anneeScolaire" TEXT NOT NULL,

    CONSTRAINT "ClasseScolaire_pkey" PRIMARY KEY ("idClasse")
);

-- CreateTable
CREATE TABLE "Eleve" (
    "idEleve" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "sexe" TEXT NOT NULL,
    "adresse" TEXT,
    "risquesDecrochage" DOUBLE PRECISION,
    "idClasse" UUID NOT NULL,

    CONSTRAINT "Eleve_pkey" PRIMARY KEY ("idEleve")
);

-- CreateTable
CREATE TABLE "Enseignant" (
    "idEnseignant" UUID NOT NULL DEFAULT gen_random_uuid(),
    "specialite" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "idUtilisateur" UUID NOT NULL,

    CONSTRAINT "Enseignant_pkey" PRIMARY KEY ("idEnseignant")
);

-- CreateTable
CREATE TABLE "EnseignantClasse" (
    "idEnseignant" UUID NOT NULL,
    "idClasse" UUID NOT NULL,

    CONSTRAINT "EnseignantClasse_pkey" PRIMARY KEY ("idEnseignant","idClasse")
);

-- CreateTable
CREATE TABLE "Cours" (
    "idCours" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nomCours" TEXT NOT NULL,
    "ponderation" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Cours_pkey" PRIMARY KEY ("idCours")
);

-- CreateTable
CREATE TABLE "Evaluation" (
    "idNote" UUID NOT NULL DEFAULT gen_random_uuid(),
    "valeur" DOUBLE PRECISION NOT NULL,
    "type" "TypeEvaluation" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "idEleve" UUID NOT NULL,
    "idCours" UUID NOT NULL,

    CONSTRAINT "Evaluation_pkey" PRIMARY KEY ("idNote")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilisateur_email_key" ON "Utilisateur"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Enseignant_idUtilisateur_key" ON "Enseignant"("idUtilisateur");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_idUtilisateur_fkey" FOREIGN KEY ("idUtilisateur") REFERENCES "Utilisateur"("idUtilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Eleve" ADD CONSTRAINT "Eleve_idClasse_fkey" FOREIGN KEY ("idClasse") REFERENCES "ClasseScolaire"("idClasse") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enseignant" ADD CONSTRAINT "Enseignant_idUtilisateur_fkey" FOREIGN KEY ("idUtilisateur") REFERENCES "Utilisateur"("idUtilisateur") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnseignantClasse" ADD CONSTRAINT "EnseignantClasse_idEnseignant_fkey" FOREIGN KEY ("idEnseignant") REFERENCES "Enseignant"("idEnseignant") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnseignantClasse" ADD CONSTRAINT "EnseignantClasse_idClasse_fkey" FOREIGN KEY ("idClasse") REFERENCES "ClasseScolaire"("idClasse") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_idEleve_fkey" FOREIGN KEY ("idEleve") REFERENCES "Eleve"("idEleve") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Evaluation" ADD CONSTRAINT "Evaluation_idCours_fkey" FOREIGN KEY ("idCours") REFERENCES "Cours"("idCours") ON DELETE RESTRICT ON UPDATE CASCADE;
