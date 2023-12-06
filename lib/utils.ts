const random = (max: number) => Math.floor(Math.random() * max) + 1;

export const getRandomSpeed = (initialSpeed: number) => {
    return random(initialSpeed) * (Math.random() > 0.5 ? 1 : -1);
};

export const getRandomScreenPosition = (
    dimension: number,
    clientDimension: number,
    offset = 50
) => {
    const positionOffset = offset + clientDimension;

    const min = 0 + positionOffset;
    const max = dimension < positionOffset ? positionOffset : dimension - positionOffset;

    return Math.floor(Math.random() * (max - min + 1) + min);
};
