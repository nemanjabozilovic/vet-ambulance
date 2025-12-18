import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const veterinarians = [
    {
      id: randomUUID(),
      firstName: 'Sarah',
      lastName: 'Johnson',
      specialty: 'Small Animal Medicine',
    },
    {
      id: randomUUID(),
      firstName: 'Michael',
      lastName: 'Chen',
      specialty: 'Emergency and Critical Care',
    },
    {
      id: randomUUID(),
      firstName: 'Emily',
      lastName: 'Rodriguez',
      specialty: 'Surgery and Orthopedics',
    },
  ];

  const createdVeterinarians = await Promise.all(
    veterinarians.map(async (vet) => {
      const existing = await prisma.veterinarian.findFirst({
        where: {
          firstName: vet.firstName,
          lastName: vet.lastName,
        },
      });

      if (existing) {
        return existing;
      }

      return prisma.veterinarian.create({
        data: vet,
      });
    })
  );

  const veterinarian1 = createdVeterinarians[0];
  const veterinarian2 = createdVeterinarians[1];
  const veterinarian3 = createdVeterinarians[2];

  const pets = [
    {
      id: randomUUID(),
      name: 'Max',
      ownerName: 'John Smith',
      birthDate: new Date('2020-03-15'),
      isVaccinated: true,
      imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
      veterinarianId: veterinarian1.id,
    },
    {
      id: randomUUID(),
      name: 'Bella',
      ownerName: 'Emma Wilson',
      birthDate: new Date('2019-07-22'),
      isVaccinated: true,
      imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
      veterinarianId: veterinarian1.id,
    },
    {
      id: randomUUID(),
      name: 'Charlie',
      ownerName: 'David Brown',
      birthDate: new Date('2021-11-08'),
      isVaccinated: false,
      imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
      veterinarianId: veterinarian2.id,
    },
    {
      id: randomUUID(),
      name: 'Luna',
      ownerName: 'Sophia Martinez',
      birthDate: new Date('2020-05-30'),
      isVaccinated: true,
      imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400',
      veterinarianId: veterinarian2.id,
    },
    {
      id: randomUUID(),
      name: 'Rocky',
      ownerName: 'James Taylor',
      birthDate: new Date('2018-12-10'),
      isVaccinated: true,
      imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
      veterinarianId: veterinarian3.id,
    },
    {
      id: randomUUID(),
      name: 'Milo',
      ownerName: 'Olivia Anderson',
      birthDate: new Date('2022-01-18'),
      isVaccinated: false,
      imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400',
      veterinarianId: veterinarian3.id,
    },
    {
      id: randomUUID(),
      name: 'Daisy',
      ownerName: 'William Thomas',
      birthDate: new Date('2019-09-25'),
      isVaccinated: true,
      imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400',
      veterinarianId: veterinarian1.id,
    },
    {
      id: randomUUID(),
      name: 'Cooper',
      ownerName: 'Ava Jackson',
      birthDate: new Date('2021-04-12'),
      isVaccinated: false,
      imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
      veterinarianId: veterinarian2.id,
    },
    {
      id: randomUUID(),
      name: 'Lucy',
      ownerName: 'Noah White',
      birthDate: new Date('2020-08-07'),
      isVaccinated: true,
      imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400',
      veterinarianId: veterinarian3.id,
    },
    {
      id: randomUUID(),
      name: 'Buddy',
      ownerName: 'Isabella Harris',
      birthDate: new Date('2022-06-20'),
      isVaccinated: false,
      imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
      veterinarianId: veterinarian1.id,
    },
    {
      id: randomUUID(),
      name: 'Zoe',
      ownerName: 'Lucas Clark',
      birthDate: new Date('2021-02-14'),
      isVaccinated: true,
      imageUrl: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400',
      veterinarianId: veterinarian2.id,
    },
    {
      id: randomUUID(),
      name: 'Toby',
      ownerName: 'Mia Lewis',
      birthDate: new Date('2019-10-03'),
      isVaccinated: false,
      imageUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400',
      veterinarianId: veterinarian3.id,
    },
  ];

  for (const pet of pets) {
    const existing = await prisma.pet.findFirst({
      where: {
        name: pet.name,
        ownerName: pet.ownerName,
      },
    });

    if (!existing) {
      await prisma.pet.create({
        data: pet,
      });
    }
  }

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

