import 'dotenv/config';
import bcrypt from 'bcryptjs';
import prisma from '../config/database.js';

async function main() {
  const hashed = await bcrypt.hash('admin123', 10);

  const admin = await prisma.utilisateur.upsert({
    where: { email: 'admin@bueri-angeli.cd' },
    update: {},
    create: {
      nom: 'Admin',
      postnom: 'Bueri-Angeli',
      email: 'admin@bueri-angeli.cd',
      motDePasse: hashed,
      role: 'Admin',
    },
  });

  let classe1 = await prisma.classeScolaire.findFirst({
    where: { nomClasse: '1ère Primaire A', anneeScolaire: '2024-2025' },
  });
  if (!classe1) {
    classe1 = await prisma.classeScolaire.create({
      data: {
        nomClasse: '1ère Primaire A',
        niveau: 'Primaire',
        anneeScolaire: '2024-2025',
      },
    });
  }

  let cours1 = await prisma.cours.findFirst({
    where: { nomCours: 'Français' },
  });
  if (!cours1) {
    cours1 = await prisma.cours.create({
      data: { nomCours: 'Français', ponderation: 3 },
    });
  }

  console.log('Seed OK:', { admin: admin.email, classe: classe1.nomClasse, cours: cours1.nomCours });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
