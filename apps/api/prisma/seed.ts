import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  const defaultPassword = 'Password123!';
  const passwordHash = await bcrypt.hash(defaultPassword, 10);

  // 1. Seed Teacher
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@vlab.edu' },
    update: {
      passwordHash,
      role: 'teacher',
      name: 'Dr. Alan Turing'
    },
    create: {
      email: 'teacher@vlab.edu',
      passwordHash,
      name: 'Dr. Alan Turing',
      role: 'teacher'
    }
  });
  console.log(`✅ Teacher seeded: ${teacher.email} (${teacher.name})`);

  // 2. Seed 5 Students
  const students = [
    { email: 'student1@vlab.edu', name: 'Ada Lovelace' },
    { email: 'student2@vlab.edu', name: 'Grace Hopper' },
    { email: 'student3@vlab.edu', name: 'Linus Torvalds' },
    { email: 'student4@vlab.edu', name: 'Margaret Hamilton' },
    { email: 'student5@vlab.edu', name: 'Claude Shannon' }
  ];

  for (const s of students) {
    const studentUser = await prisma.user.upsert({
      where: { email: s.email },
      update: {
        passwordHash,
        role: 'student',
        name: s.name
      },
      create: {
        email: s.email,
        passwordHash,
        name: s.name,
        role: 'student'
      }
    });
    console.log(`✅ Student seeded: ${studentUser.email} (${studentUser.name})`);
  }

  // 3. Seed Starter Badge
  const firstBuildBadge = await prisma.badge.upsert({
    where: { code: 'FIRST_BOOT' },
    update: {},
    create: {
      code: 'FIRST_BOOT',
      name: 'First Light',
      description: 'Successfully assembled a PC and completed the POST boot sequence.',
      icon: 'zap',
      criteriaJson: JSON.stringify({ type: 'boot_success_count', count: 1 })
    }
  });
  console.log(`✅ Starter Badge seeded: ${firstBuildBadge.name}`);

  // 4. Seed Sample Fault
  const sampleFault = await prisma.fault.upsert({
    where: { code: 'FAULT_NO_RAM' },
    update: {},
    create: {
      code: 'FAULT_NO_RAM',
      title: 'Continuous Beep & No Display',
      description: 'The computer powers on, fans spin, but the motherboard emits continuous beeps with no display.',
      symptomsJson: JSON.stringify(['Continuous long beeps', 'Blank screen', 'Diagnostic LED DRAM solid orange']),
      solution: 'Reseat the RAM in slots A2/B2 firmly until side latches click.'
    }
  });
  console.log(`✅ Sample Fault seeded: ${sampleFault.title}`);

  // 5. Seed Starter Quiz Question
  const sampleQuestion = await prisma.quizQuestion.create({
    data: {
      category: 'cpu',
      prompt: 'What is the primary function of thermal paste applied between the CPU and cooler?',
      optionsJson: JSON.stringify([
        'To glue the cooler permanently to the CPU',
        'To fill microscopic air gaps and facilitate efficient heat transfer',
        'To insulate the CPU electrically from heat pipes',
        'To cool the processor through chemical evaporation'
      ]),
      correctIndex: 1,
      explanation: 'Air is a poor thermal conductor. Thermal paste fills microscopic imperfections on the surfaces of the CPU integrated heat spreader and cooler baseplate to maximize thermal conduction.',
      difficulty: 'easy'
    }
  });
  console.log(`✅ Sample Quiz Question seeded: ID ${sampleQuestion.id}`);

  console.log('✨ Seed finished successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
