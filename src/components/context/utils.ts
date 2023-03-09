export type RootNote = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
export const rootNotes: RootNote[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

export type Mode = 'major' | 'minor';
export const modes: Mode[] = ['major', 'minor'];

export interface KeySignature {
  root: RootNote;
  mode: Mode;
}

export type TimeSignature = [number, number];
const timeSignatureNumerators = [1, 2, 3, 4, 5, 6, 7, 9, 11, 13];
const timeSignatureDenominators = [2, 4, 8, 16, 32];

export function generateNextFunction<T>(arr: T[]) {
  return (curr: T) => arr[(arr.indexOf(curr) + 1) % arr.length];
}

export function generatePreviousFunction<T>(arr: T[]) {
  return (curr: T) => {
    const currIndex = arr.indexOf(curr);

    if (currIndex === 0) return arr[arr.length - 1];
    return arr[arr.indexOf(curr) - 1];
  };
}

export const getNextRootNote = generateNextFunction(rootNotes);
export const getPreviousRootNote = generatePreviousFunction(rootNotes);

export const getNextMode = generateNextFunction(modes);
export const getPreviousMode = generatePreviousFunction(modes);

export const getNextTimeSignatureNumerator = generateNextFunction(
  timeSignatureNumerators
);
export const getPreviousTimeSignatureNumerator = generatePreviousFunction(
  timeSignatureNumerators
);

export const getNextTimeSignatureDenominator = generateNextFunction(
  timeSignatureDenominators
);
export const getPreviousTimeSignatureDenominator = generatePreviousFunction(
  timeSignatureDenominators
);

export function splitArray<T>(array: T[], groupSize: number) {
  const output = [];
  let i;

  for (i = 0; i < array.length; i += groupSize) {
    if (i + groupSize <= array.length) {
      output.push(array.slice(i, i + groupSize));
    }
  }

  if (i !== array.length) {
    output.push(
      array.slice(
        i - groupSize,
        i - groupSize + (array.length - (i - groupSize))
      )
    );
  }

  return output;
}
