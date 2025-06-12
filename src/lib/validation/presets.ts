// Example APPI measurement preset for a 3-liner glider
export const bonanza2XS = {
  model: 'Gin Bonanza 2',
  size: 'XS',
  aspectRatio: 6.44,
  groups: [
    {
      name: 'G1',
      lines: ['A1', 'B1', 'C1'],
      manufacturer: { A: 7295, B: 7265, C: 7265 },
    },
    {
      name: 'G2',
      lines: ['A2', 'B2', 'C2'],
      manufacturer: { A: 7200, B: 7170, C: 7170 },
    },
    {
      name: 'G3',
      lines: ['A3', 'B3', 'C3'],
      manufacturer: { A: 7075, B: 7050, C: 7050 },
    },
    // ... more groups as per real glider config
  ],
  tolerance: 10, // mm, from APPI aspect ratio table
};

// Example for a 4-liner glider
export const fourLinerExample = {
  model: 'Example 4Liner',
  size: 'M',
  aspectRatio: 6.0,
  groups: [
    {
      name: 'G1',
      lines: ['A1', 'B1', 'C1', 'D1'],
      manufacturer: { A: 8000, B: 7950, C: 7900, D: 7850 },
    },
    // ... more groups
  ],
  tolerance: 15, // mm
};

// Example for a 2-liner glider
export const twoLinerExample = {
  model: 'Example 2Liner',
  size: 'L',
  aspectRatio: 7.0,
  groups: [
    {
      name: 'G1',
      lines: ['A1', 'B1'],
      manufacturer: { A: 9000, B: 8950 },
    },
    // ... more groups
  ],
  tolerance: 10, // mm
};

export const ozoneLyghtXS = {
  model: 'Ozone Lyght',
  size: 'XS',
  minWeight: 60,
  maxWeight: 75,
  aspectRatio: undefined, // Not provided
  groups: [
    {
      name: 'G1',
      lines: ['G1A', 'G1B', 'G1C', 'G1D', 'G1K'],
      manufacturer: {
        G1A: 6649, G1B: 6637, G1C: 6611, G1D: 6696, G1K: 7164,
      },
    },
    {
      name: 'G2',
      lines: ['G2A', 'G2B', 'G2C', 'G2K'],
      manufacturer: {
        G2A: 6484, G2B: 6475, G2C: 6450, G2K: 6812,
      },
    },
    {
      name: 'G3',
      lines: ['G3A', 'G3B', 'G3C', 'G3K'],
      manufacturer: {
        G3A: 6294, G3B: 6288, G3C: 6265, G3K: 6197,
      },
    },
    {
      name: 'ST',
      lines: ['STA', 'STB', 'STC'],
      manufacturer: {
        STA: 5912, STB: 5906, STC: 5906,
      },
    },
  ],
  tolerance: 10, // mm, APPI default
};

export const gliderPresets = [bonanza2XS, fourLinerExample, twoLinerExample, ozoneLyghtXS]; 