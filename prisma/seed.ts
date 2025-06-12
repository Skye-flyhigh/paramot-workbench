import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Create Ozone Lyght model
  const model = await prisma.gliderModel.create({
    data: {
      brand: 'Ozone',
      modelName: 'Lyght',
      notes: 'Demo seed for Ozone Lyght, all sizes',
    },
  });

  // Create shared lineset
  const lineset = await prisma.lineSet.create({
    data: {
      name: 'Ozone Lyght Standard Lineset',
      gliderModelId: model.id,
      physicalLines: {
        create: [
          // A lines
          ...Array.from({ length: 13 }, (_, i) => ({ lineLabel: `A${i + 1}`, position: i + 1 })),
          // B lines
          ...Array.from({ length: 8 }, (_, i) => ({ lineLabel: `B${i + 1}`, position: i + 1 })),
          // C lines
          ...Array.from({ length: 13 }, (_, i) => ({ lineLabel: `C${i + 1}`, position: i + 1 })),
          // D lines
          ...Array.from({ length: 8 }, (_, i) => ({ lineLabel: `D${i + 1}`, position: i + 1 })),
          // K lines
          ...Array.from({ length: 13 }, (_, i) => ({ lineLabel: `K${i + 1}`, position: i + 1 })),
          // Stabilo
          { lineLabel: 'STA', position: 21 },
          { lineLabel: 'STB', position: 22 },
          { lineLabel: 'STC', position: 23 },
        ],
      },
      groupMappings: {
        create: [
          // Example group mappings for A lines (fill in for all as needed)
          { physicalLine: { connect: { lineLabel: 'A1' } }, groupLabel: 'G1A' },
          { physicalLine: { connect: { lineLabel: 'A2' } }, groupLabel: 'G1A' },
          { physicalLine: { connect: { lineLabel: 'A3' } }, groupLabel: 'G1A' },
          { physicalLine: { connect: { lineLabel: 'A4' } }, groupLabel: 'G1A' },
          { physicalLine: { connect: { lineLabel: 'A5' } }, groupLabel: 'G2A' },
          { physicalLine: { connect: { lineLabel: 'A6' } }, groupLabel: 'G2A' },
          { physicalLine: { connect: { lineLabel: 'A7' } }, groupLabel: 'G2A' },
          { physicalLine: { connect: { lineLabel: 'A8' } }, groupLabel: 'G2A' },
          { physicalLine: { connect: { lineLabel: 'A9' } }, groupLabel: 'G3A' },
          { physicalLine: { connect: { lineLabel: 'A10' } }, groupLabel: 'G3A' },
          { physicalLine: { connect: { lineLabel: 'A11' } }, groupLabel: 'G3A' },
          { physicalLine: { connect: { lineLabel: 'A12' } }, groupLabel: 'G3A' },
          { physicalLine: { connect: { lineLabel: 'A13' } }, groupLabel: 'G3A' },
          { physicalLine: { connect: { lineLabel: 'B1' } }, groupLabel: 'G1B' },
          { physicalLine: { connect: { lineLabel: 'B2' } }, groupLabel: 'G1B' },
          { physicalLine: { connect: { lineLabel: 'B3' } }, groupLabel: 'G1B' },
          { physicalLine: { connect: { lineLabel: 'B4' } }, groupLabel: 'G1B' },
          { physicalLine: { connect: { lineLabel: 'B5' } }, groupLabel: 'G2B' },
          { physicalLine: { connect: { lineLabel: 'B6' } }, groupLabel: 'G2B' },
          { physicalLine: { connect: { lineLabel: 'B7' } }, groupLabel: 'G2B' },
          { physicalLine: { connect: { lineLabel: 'B8' } }, groupLabel: 'G2B' },
          { physicalLine: { connect: { lineLabel: 'B9' } }, groupLabel: 'G3B' },
          { physicalLine: { connect: { lineLabel: 'B10' } }, groupLabel: 'G3B' },
          { physicalLine: { connect: { lineLabel: 'B11' } }, groupLabel: 'G3B' },
          { physicalLine: { connect: { lineLabel: 'B12' } }, groupLabel: 'G3B' },
          { physicalLine: { connect: { lineLabel: 'B13' } }, groupLabel: 'G3B' },
          { physicalLine: { connect: { lineLabel: 'STA' } }, groupLabel: 'STA' },
        ],
      },
    },
  });

  // Add sizes and size-specific line specs
  const sizes = [
    { label: 'XS', min: 60, max: 75 },
    { label: 'S', min: 70, max: 85 },
    { label: 'MS', min: 80, max: 95 },
    { label: 'ML', min: 90, max: 105 },
    { label: 'L', min: 100, max: 115 },
  ];

  for (const size of sizes) {
    const gliderSize = await prisma.gliderSize.create({
      data: {
        sizeLabel: size.label,
        minWeight: size.min,
        maxWeight: size.max,
        gliderModelId: model.id,
        lineSets: { connect: { id: lineset.id } },
      },
    });

    // Add size-specific line lengths as JSON
    let lengths;
    if (size.label === 'XS') {
      lengths = {
        A: [6649, 6554, 6521, 6551, 6484, 6358, 6294, 6306, 6150, 6038, 5978, 5917, 5912],
        B: [6637, 6542, 6510, 6542, 6475, 6351, 6288, 6304, null, null, null, null, null],
        C: [6611, 6521, 6487, 6515, 6450, 6330, 6265, 6271, 6137, 6043, 6002, 5936, 5906],
        D: [6696, 6609, 6573, 6592, 6527, 6401, 6330, 6321, null, null, null, null, null],
        K: [7164, 6822, 6812, 6553, null, 6197, 6179, 6294, 6188, 6222, 6195, 6384, null],
      };
    } else if (size.label === 'S') {
      lengths = {
        A: [6979, 6881, 6846, 6878, 6806, 6674, 6607, 6618, 6449, 6332, 6267, 6197, 6191],
        B: [6966, 6867, 6833, 6866, 6796, 6665, 6601, 6615, null, null, null, null, null],
        C: [6938, 6844, 6809, 6838, 6761, 6635, 6557, 6572, 6429, 6330, 6285, 6216, 6217],
        D: [7025, 6934, 6897, 6916, 6840, 6708, 6633, 6623, null, null, null, null, null],
        K: [7485, 7117, 6919, 6848, null, 6472, 6469, 6668, 6494, 6472, 6472, 6668, null],
      };
    } else if (size.label === 'MS') {
      lengths = {
        A: [7259, 7157, 7121, 7154, 7077, 6940, 6869, 6880, 6702, 6579, 6510, 6437, 6431],
        B: [7245, 7142, 7108, 7142, 7067, 6931, 6863, 6877, null, null, null, null, null],
        C: [7214, 7117, 7081, 7110, 7031, 6900, 6829, 6834, 6687, 6584, 6536, 6457, 6457],
        D: [7309, 7214, 7176, 7196, 7117, 6980, 6901, 6891, null, null, null, null, null],
        K: [7802, 7420, 7138, 7138, null, 6819, 6754, 6857, 6741, 6747, 6747, 6951, null],
      };
    } else if (size.label === 'ML') {
      lengths = {
        A: [7521, 7415, 7378, 7412, 7331, 7190, 7117, 7128, 6946, 6818, 6746, 6670, 6663],
        B: [7506, 7400, 7364, 7400, 7321, 7180, 7110, 7124, null, null, null, null, null],
        C: [7476, 7376, 7338, 7369, 7289, 7153, 7079, 7084, 6925, 6817, 6767, 6691, 6690],
        D: [7570, 7472, 7433, 7454, 7374, 7232, 7151, 7139, null, null, null, null, null],
        K: [8094, 7699, 7485, 7406, null, 7210, 7194, 7210, 6994, 7030, 7000, 7210, null],
      };
    } else if (size.label === 'L') {
      lengths = {
        A: [7752, 7643, 7605, 7639, 7559, 7412, 7336, 7347, 7159, 7027, 6952, 6872, 6864],
        B: [7736, 7627, 7590, 7626, 7547, 7402, 7328, 7343, null, null, null, null, null],
        C: [7707, 7604, 7566, 7597, 7524, 7383, 7306, 7311, 7152, 7040, 7040, 6893, 6892],
        D: [7804, 7704, 7663, 7685, 7611, 7464, 7380, 7368, null, null, null, null, null],
        K: [8361, 7732, 7650, 7650, null, 7311, 7250, 7247, 7262, 7262, 7247, 7447, null],
      };
    }
    await prisma.sizeLineLengths.create({
      data: {
        gliderSizeId: gliderSize.id,
        lengths,
      },
    });
  }

  const groupings = {
    G1: {
      A: [1, 2, 3, 4],
      B: [1, 2, 3, 4],
      C: [1, 2, 3, 4],
      D: [1, 2, 3, 4],
      K: [1, 2, 3, 4],
    },
    G2: {
      A: [5, 6, 7, 8],
      B: [5, 6, 7, 8],
      C: [5, 6, 7, 8],
      D: [5, 6, 7, 8],
      K: [5, 6, 7, 8],
    },
    G3: {
      A: [9, 10, 11, 12, 13],
      C: [9, 10, 11, 12, 13],
      K: [9, 10, 11, 12],
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 

