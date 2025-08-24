import { defaultState } from "./gameState";
import { avatars, enemies } from "./characters";

const STORAGE_KEY = "gameState";

export function loadGame() {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return data || structuredClone(defaultState);
}

export function saveGame(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function createPlayer(userName) {
    const randomCharacter = avatars[Math.floor(Math.random() * avatars.length)];
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];

    const playerState = {
        ...defaultState,
        account: {
            name: userName,
            wins: 0,
            losses: 0,
            health: 100,
            attack: 20,
            critChance: 25,
            critMultiplier: 1.5,
            attackCount: 1,
            blockCount: 2,
            src: randomCharacter.src
        },
        enemy: randomEnemy,
        logs: []
    };

    saveGame(playerState);
    return playerState;
}

export function savePlayerName(name) {
    let state = loadGame();

    state.account.name = name;

    saveGame(state);

    return state;
}

export function cleanUp() {
    const state = loadGame();

    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];

    const playerState = {
        ...defaultState,
        account: {
            ...state.account,
            health: 100
        },
        enemy: randomEnemy,
        logs: []
    };

    saveGame(playerState);

    return playerState
}

export function playerWriteLog(playerAttack, blockZones, player, state, isPlayerAttackPhase) {
    const modal = document.getElementById("resultModal");

    const crit = Math.floor(Math.random() * 100) + 1;
    const critShance = isPlayerAttackPhase ? state.account.critChance : state.enemy.critChance;
    const entety = isPlayerAttackPhase ? player : state.enemy;

    const playerLog = {
        isPlayerAttackPhase: isPlayerAttackPhase,
        playerName: player.name,
        enemyName: state.enemy.name,
        damage: 0,
        hasCrit: false,
        attackZone: playerAttack,
        hasDefense: false,
    }

    if (blockZones.includes(playerAttack)) {
        playerLog.hasDefense = true;
    }

    if (critShance >= crit) {
        playerLog.hasCrit = true;
        playerLog.damage = entety.attack * entety.critMultiplier;
    } else if (!playerLog.hasDefense) {
        playerLog.damage = entety.attack;
    }

    if (isPlayerAttackPhase) {
        state.enemy.health -= playerLog.damage;
    } else {
        player.health -= playerLog.damage;
    }

    if (state.enemy.health <= 0 || player.health <= 0) {
        if (state.enemy.health <= 0) {
            state.account.wins++;

            modal.style.display = "block";
            modal.querySelector('h2').textContent = `Win ${player.name}`
        }

        if (player.health <= 0) {
            state.account.losses++;

            modal.style.display = "block";
            modal.querySelector('h2').textContent = `Win ${state.enemy.name}`
        }

    } else {
        state.logs.push(playerLog);
    }

    saveGame(state);
}
