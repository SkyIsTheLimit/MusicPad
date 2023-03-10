export function calculateArc(
  [cx, cy]: [number, number],
  [rx, ry]: [number, number],
  [t1, sweep]: [number, number],
  rotation: number
) {
  const cos = Math.cos;
  const sin = Math.sin;
  const PI = Math.PI;

  const multiplyMatrices = (
    [[a, b], [c, d]]: [[number, number], [number, number]],
    [x, y]: [number, number]
  ): [number, number] => [a * x + b * y, c * x + d * y];
  const rotateMatrix = (x: number): [[number, number], [number, number]] => [
    [cos(x), -sin(x)],
    [sin(x), cos(x)],
  ];
  const addVectors = (
    [a1, a2]: [number, number],
    [b1, b2]: [number, number]
  ) => [a1 + b1, a2 + b2];
  sweep = sweep % (2 * PI);
  const rotMatrix: [[number, number], [number, number]] =
    rotateMatrix(rotation);

  const [sX, sY] = addVectors(
    multiplyMatrices(rotMatrix, [rx * cos(t1), ry * sin(t1)]),
    [cx, cy]
  );
  const [eX, eY] = addVectors(
    multiplyMatrices(rotMatrix, [rx * cos(t1 + sweep), ry * sin(t1 + sweep)]),
    [cx, cy]
  );
  const fA = sweep > PI ? 1 : 0;
  const fS = sweep > 0 ? 1 : 0;

  return (
    'M ' +
    sX +
    ' ' +
    sY +
    ' A ' +
    [rx, ry, (rotation / (2 * PI)) * 360, fA, fS, eX, eY].join(' ')
  );
}

export const toRads = (angle: number) => (angle / 180) * Math.PI;

export function getPath(radius: number) {
  return (value: number) =>
    calculateArc(
      [radius, radius],
      [radius * 0.86, radius * 0.86],
      [toRads(90), toRads(value)],
      0
    );
}
