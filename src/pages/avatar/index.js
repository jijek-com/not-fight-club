
import { header } from "../../components/header";
import { avatars } from "../../data/characters";
import { loadGame, saveGame } from "../../data/state";

import './index.scss';

export function renderAvatarsPage(container) {
    const state = loadGame();

    if (!state.account.name) {
        window.location.hash = "#/login";
        return;
    }

    container.innerHTML = `
        ${ header() }
        
        <div class="page">
            <div class="character">
                <div class="character__box">
                
                    <div class="character__left" style="background-image: url(${state.account.src})">
                      <div class="change">
                        <button class="change__btn" id="changeBtn">change</button>
                      </div>
                    </div>
                    
                    <div class="character__right stats">
                        <div class="stats__row">
                            <div class="stats__title">Name: </div>
                            <div class="stats__desc">${state.account.name}</div>
                        </div>
                        
                        <div class="stats__row">
                            <div class="stats__title">Wins: </div>
                            <div class="stats__desc">${state.account.wins}</div>
                        </div>
                        
                        <div class="stats__row">
                            <div class="stats__title">Loses: </div>
                            <div class="stats__desc">${state.account.losses}</div>
                        </div>
                       
                   
                    </div>
                </div>
            </div>
            
            <div id="avatarModal" class="modal">
              <div class="modal-content">
                <span id="closeModal" class="close">&times;</span>
                <h2>Выберите персонажа</h2>
                <div id="characterList" class="character-list"></div>
              </div>
            </div>
        </div>
    `;

    const changeBtn = document.getElementById("changeBtn");
    const modal = document.getElementById("avatarModal");
    const listContainer = document.getElementById("characterList");
    const span = document.getElementById("closeModal");

    function renderCharacterList() {
        listContainer.innerHTML = "";
        avatars.forEach(char => {
            const img = document.createElement("img");
            img.src = char.src;
            img.alt = `Character ${char.id}`;

            if (char.src === state.account.src) {
                img.classList.add("active");
            } else {
                img.onclick = function() {
                    state.account = {
                        ...state.account,
                        src: char.src,
                    };

                    saveGame(state);

                    modal.style.display = "none";
                    updatePlayerAvatar();
                };
            }

            listContainer.appendChild(img);
        });
    }

    function updatePlayerAvatar() {
        const avatarImg = document.querySelector(".character__left");
        if (avatarImg && state.account.src) {
            avatarImg.style.backgroundImage = `url(${state.account.src})`;
        }
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    span.onclick = function() {
        modal.style.display = "none";
    };

    changeBtn.onclick = function()  {
        renderCharacterList();
        modal.style.display = "block";
    };
}