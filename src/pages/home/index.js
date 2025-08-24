import { header } from "../../components/header";
import { loadGame } from "../../data/state";

import './index.scss';

export function renderHomePage(container) {
    const state = loadGame();

    if (!state.account.name) {
        window.location.hash = "#/login";
        return;
    }

    container.innerHTML = `
        ${ header() }
        
        <div class="page">
            <div class="home">
                <div class="home__box">
                    <main>
                        <button class="home__btn-fight" onclick="window.location.hash = '#/battle'">fight !!!</button>
                    </main>
                </div>
            </div>
        </div>
    `;
}