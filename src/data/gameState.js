
export const defaultState = {
    account: {
        name: '',
        src: '',
        wins: 0,
        losses: 0,
        health: 100,
        attack: 20,
        critChance: 25,
        critMultiplier: 1.5,
        attackCount: 1,
        blockCount: 2
    },
    enemy: {
        name: "",
        src: "",
        health: 0,
        attack: 0,
        critChance: 0,
        critMultiplier: 0,
        attackCount: 0,
        blockCount: 0
    },
    logs: []
};
