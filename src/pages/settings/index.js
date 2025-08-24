import { header } from "../../components/header";

import { loadGame, savePlayerName } from "../../data/state";

import './index.scss';

export function renderSettingsPage(container) {
    let state = loadGame();

    if (!state.account.name) {
        window.location.hash = "#/login";
        return;
    }

    container.innerHTML = `
        ${ header() }
        
        <div class="page">
            <div class="settings">
                <div class="settings__box">

                    <main>
                        <h1>Настройки</h1>
                        
                        <div class="settings__row">
                            <label for="nameInput">Имя игрока:</label>
                            <input id="nameInput" type="text" value="${state.account.name}">
                            <button class="settings__btn" id="saveNameBtn" disabled>Сохранить</button>
                        </div>
                        
                    </main>
                </div>
            </div>
        </div>
    `;

    const nameInput = document.getElementById('nameInput');
    const saveBtn = document.getElementById("saveNameBtn");

    nameInput.addEventListener("input", () => {
        const newName = nameInput.value.trim();
        saveBtn.disabled = !newName || newName === state.account.name;
    });

    document.getElementById("saveNameBtn").addEventListener("click", () => {
        const newName = nameInput.value.trim();

        if (newName) {
            state = savePlayerName(newName);
            saveBtn.disabled = true;
            alert("Имя сохранено!");
        } else {
            alert("Имя не может быть пустым!");
        }
    });
}
