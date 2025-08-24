import { createPlayer, loadGame } from "../../data/state";

import './index.scss';

export function renderLoginPage(container) {
    const state = loadGame();

    if (state.account.name) {
        window.location.hash = "#/home";
        return;
    }

    container.innerHTML = `
        <div class="page">
            <div class="login">
                <div class="login__box">
                    <h1>Create your character</h1>
                    <input id="playerName" placeholder="Character name" value="${state.account.name}">
                    <button class="login__btn" id="startBtn">Create</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById("startBtn").addEventListener("click", () => {
        const name = document.getElementById("playerName").value.trim();
        if (name) {
            createPlayer(name);
            window.location.hash = "#/home";
        } else {
            alert("Введите имя!");
        }
    });
}
