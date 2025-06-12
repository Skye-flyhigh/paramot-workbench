import prisma from '../lib/prisma';

interface BrandResult {
  brand: string;
}

interface ModelResult {
  modelName: string;
}

interface SizeResult {
  sizeLabel: string;
}

export class GliderRepository {
  async getAvailableBrands() {
    const brands = await prisma.gliderModel.findMany({
      select: { brand: true },
      distinct: ['brand'],
      orderBy: { brand: 'asc' },
    });
    return brands.map((b: BrandResult) => b.brand);
  }

  async getModelsForBrand(brand: string) {
    const models = await prisma.gliderModel.findMany({
      where: { brand },
      select: { modelName: true },
      orderBy: { modelName: 'asc' },
    });
    return models.map((m: ModelResult) => m.modelName);
  }

  async getSizesForModel(brand: string, modelName: string) {
    const glider = await prisma.gliderModel.findFirst({
      where: { brand, modelName },
      include: {
        sizes: {
          select: { sizeLabel: true },
          orderBy: { sizeLabel: 'asc' },
        },
      },
    });
    return glider?.sizes.map((s: SizeResult) => s.sizeLabel) || [];
  }

  async getGliderByModelAndSize(brand: string, modelName: string, sizeLabel: string) {
    return prisma.gliderModel.findFirst({
      where: {
        brand,
        modelName,
        sizes: {
          some: { sizeLabel },
        },
      },
      include: {
        sizes: {
          where: { sizeLabel },
          include: {
            sizeLineLengths: true,
            lineSets: {
              include: {
                physicalLines: true,
                groupMappings: true,
              },
            },
          },
        },
      },
    });
  }

  async getSizeLineLengths(gliderSizeId: number) {
    return prisma.sizeLineLengths.findFirst({
      where: { gliderSizeId },
    });
  }

  async getLinesetBySize(gliderSizeId: number) {
    return prisma.lineSet.findFirst({
      where: { gliderSizeId },
      include: {
        physicalLines: true,
        groupMappings: true,
      },
    });
  }
} 