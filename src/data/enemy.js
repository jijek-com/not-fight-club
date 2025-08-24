import { zones } from "./characters";

function pickRandomZones(possibleZones, count) {
    const shuffled = possibleZones.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
}

export function enemyTurn(enemy) {
    const attackZones = pickRandomZones(zones, enemy.attackCount);
    const blockZones = pickRandomZones(zones, enemy.blockCount);

    return { attackZones, blockZones };
}