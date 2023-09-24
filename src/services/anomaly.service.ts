import { injectable } from "tsyringe";
import { ICheckDirectionInput } from "../domain/interfaces/anomaly.interface";

@injectable()
export class AnomalyService {
  constructor() {}

  checkForAnomaly(matrix: string[][]): boolean {
    const rows = matrix.length;
    const cols = matrix[0].length;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (
          this.checkDirection({
            matrix,
            x: i,
            y: j,
            dx: 1,
            dy: 0,
            rows,
            cols,
          }) || // Horizontal
          this.checkDirection({
            matrix,
            x: i,
            y: j,
            dx: 0,
            dy: 1,
            rows,
            cols,
          }) || // Vertical
          this.checkDirection({
            matrix,
            x: i,
            y: j,
            dx: 1,
            dy: 1,
            rows,
            cols,
          }) || // Diagonal
          this.checkDirection({ matrix, x: i, y: j, dx: 1, dy: -1, rows, cols }) // Diagonal inversa
        ) {
          return true;
        }
      }
    }
    return false;
  }

  checkDirection(args: ICheckDirectionInput): boolean {
    const { matrix, x, y, dx, dy, rows, cols } = args;
    const startChar = matrix[x][y];
    let count = 1;

    for (let i = 1; i <= 2; i++) {
      const newX = x + i * dx;
      const newY = y + i * dy;
      if (newX >= 0 && newX < rows && newY >= 0 && newY < cols) {
        if (matrix[newX][newY] === startChar) {
          count++;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    return count >= 3;
  }

  generateRandomMatrix(rows: number, cols: number): string[][] {
    const characters = "ACGTOPQ";
    const matrix: string[][] = [];

    for (let i = 0; i < rows; i++) {
      const row: string[] = [];
      for (let j = 0; j < cols; j++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        row.push(characters[randomIndex]);
      }
      matrix.push(row);
    }

    return matrix;
  }

  generateMatrixMala(rows: number, cols: number): string[][] {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const matrix: string[][] = Array.from({ length: rows }, () =>
      Array(cols).fill("")
    );

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let randomChar: string;
        do {
          randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
        } while (
          (i >= 2 &&
            matrix[i - 1][j] === randomChar &&
            matrix[i - 2][j] === randomChar) ||
          (j >= 2 &&
            matrix[i][j - 1] === randomChar &&
            matrix[i][j - 2] === randomChar) ||
          (i >= 2 &&
            j >= 2 &&
            matrix[i - 1][j - 1] === randomChar &&
            matrix[i - 2][j - 2] === randomChar) ||
          (i >= 2 &&
            j <= cols - 3 &&
            matrix[i - 1][j + 1] === randomChar &&
            matrix[i - 2][j + 2] === randomChar)
        );
        matrix[i][j] = randomChar;
      }
    }
    return matrix;
  }
}
