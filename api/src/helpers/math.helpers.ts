export function generateBalancedLatinSquare(size: number): number[][] {
  let latinSquare: number[][] = [];

  if (size % 2 === 0) {
    // Generate a Balanced Latin Square for even sizes
    for (let i = 0; i < size; i++) {
      latinSquare[i] = [];
      for (let j = 0; j < size; j++) {
        if (j % 2 === 0) {
          latinSquare[i][j] = (i + j / 2) % size;
        } else {
          latinSquare[i][j] = (size + i - (j + 1) / 2) % size;
        }
      }
    }
  } else {
    // Odd case: Adjusted Latin Square (may not be perfectly balanced)
    for (let i = 0; i < size; i++) {
      latinSquare[i] = [];
      for (let j = 0; j < size; j++) {
        latinSquare[i][j] = (i + j) % size;
      }
    }
  }

  return latinSquare;
}

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);
