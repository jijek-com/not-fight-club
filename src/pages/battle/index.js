import { header } from "../../components/header";
import {cleanUp, loadGame, playerWriteLog} from "../../data/state";

import { enemyTurn } from "../../data/enemy";

import './index.scss';

export function renderBattlePage(container) {
    let state = loadGame();

    if (!state.account.name) {
        window.location.hash = "#/login";
        return;
    }

    container.innerHTML = `
        ${ header() }
        
        <div class="page">
            <div class="battle">
                <div class="battle__box">

                    <main>
                        <div class="battle__row">
                            <div class="battle__player">
                                <div class="battle__name">${state.account.name}</div>
                                <img src="${state.account.src}" alt="player image" class="character" width="230px">
                                    <div class="line"></div>
                                    <div class="health-text">
                                        <span id="playerHP"> ${state.account.health} / 100</span>
                                    </div>
                            </div>   
                         
                            
                            <div class="zones" id="zones">
                                <h3>Please pick 1 Attack zone and 2 Defence zones</h3> 
                                <div class="zones__box"> 
                                    <div class="zones__attack">
                                        <h4>1 Attack zone</h4> 
                                        <div id="attackZones"> 
                                            <label for="attachHead"> <span class=""></span> 
                                                <input type="radio" name="attach" value="head" id="attachHead"> <span>head</span>
                                            </label>
                                            
                                            <label for="attachNeck"> <span class=""></span> 
                                                <input type="radio" name="attach" value="neck" id="attachNeck"><span>neck</span> 
                                            </label> 
                                            
                                            <label for="attachBody"> <span class=""></span>
                                                <input type="radio" name="attach" value="body" id="attachBody"> <span>body</span> 
                                            </label> 
                                            
                                            <label for="attachBelly"> <span class=""></span>
                                                <input type="radio" name="attach" value="belly" id="attachBelly"> <span>belly</span> 
                                            </label>
                                             
                                             <label for="attachLegs"> <span class=""></span> 
                                                <input type="radio" name="attach" value="legs" id="attachLegs"> <span>legs</span> 
                                            </label> 
                                        </div> 
                                    </div> 
                                    
                                    <div class="zones__defense"> 
                                    
                                    <h4>2 Defence zones</h4> 
                                    
                                    <div id="defenseZones"> 
                                   
                                        <label for="defenseHead"> <span class=""></span>
                                            <input type="checkbox" name="defense" value="head" id="defenseHead"> <span>head</span>
                                        </label>
                                      
                                        <label for="defenseNeck"> 
                                            <span class=""></span> <input type="checkbox" name="defense" value="neck" id="defenseNeck"> <span>neck</span> 
                                        </label>
                                         
                                        <label for="defenseBody"> <span class=""></span> 
                                            <input type="checkbox" name="defense" value="body" id="defenseBody"> <span>body</span> 
                                        </label> 
                                        
                                        <label for="defenseBelly"> <span class=""></span> 
                                            <input type="checkbox" name="defense" value="belly" id="defenseBelly"> <span>belly</span> 
                                        </label> 
                                        
                                        <label for="defenseLegs"> <span class=""></span> 
                                            <input type="checkbox" name="defense" value="legs" id="defenseLegs"> <span>legs</span> 
                                        </label> 
                                    
                                    </div>
                                </div> 
                            </div> 
                        
                            <div class="zones__btn">
                                <button id="attackBtn" disabled>Attach !!!</button> 
                            </div> 
                        </div>
                            
                            <div class="battle__enemies">
                                <div class="battle__name">${state.enemy.name}</div>
                                <img src="${state.enemy.src}" alt="player image" class="character" width="230px">
                            
                                <div>
                                    <div class="line"></div>
                                    <div class="health-text"><span id="enemyHP">${state.enemy.health}</span>
                                </div>
                            </div>
                          
                        </div>
                        </div>
                    </main>
                    
                    <footer>
                      <div class="battle__logs" id="battleLog"></div>   
                    </footer>
                </div>
            </div>
            
            <div id="resultModal" class="modal">
              <div class="modal-content">
                <span id="closeModal" class="close">&times;</span>
                <h2>Win </h2>
                
                <div class="modal__img">
                    <img src="./assets/winner.png" alt="Image winner" >
                </div>
              </div>
            </div>
        </div>
    `;

    const battleLog = document.getElementById('battleLog');
    const modal = document.getElementById("resultModal");
    const span = document.getElementById("closeModal");
    const root = document.documentElement;

    function updateLogs() {
        const lastIndex = battleLog.children.length / 2;
        const newLogs = state.logs?.slice(lastIndex);

        root.style.setProperty('--player-health', state.account.health + '%');
        root.style.setProperty('--enemy-health', state.enemy.health + '%');


        newLogs.forEach((log, i) => {
            const block = document.createElement("div");
            const block2 = document.createElement("div");
            block2.classList.add("right");

            const player1 = log.isPlayerAttackPhase ? log.playerName : log.enemyName;
            const player2 = log.isPlayerAttackPhase ? log.enemyName : log.playerName;

            if (!log.hasCrit && !log.hasDefense) {
                block.innerHTML = `
                    <div class="message">
                         <span><span class="red">${player1}</span> attacked 
                         <span class="red">${player2}</span> to <span class="red">${log.attackZone}</span> and deal 
                         <span class="red">${log.damage}</span> damage.
                    </div>
                `;
            } else if (!log.hasCrit && log.hasDefense) {
                block.innerHTML = `
                    <div class="message">
                         <span><span class="red">${player1}</span> attacked 
                         <span class="red">${player2}</span> but was able to block.
                    </div>
                `;
            } else {
                block.innerHTML = `
                    <div class="message">
                         <span><span class="red">${player1}</span> attacked 
                         <span class="red">${player2}</span> to <span class="red">${log.attackZone}</span> but ${player2}
                         was very lucky and crid his oppenent for <span class="red">${log.damage}</span> damage.
                    </div>
                `;
            }

            battleLog.append(block);
            battleLog.append(block2);

            battleLog.scrollTo({
                top: battleLog.scrollHeight,
                behavior: "smooth"
            });
        })
    }

    setupListeners(state.account);
    updateLogs();

    function setupListeners(player) {
        const attackBtn = document.getElementById("attackBtn");
        const attackZones = document.querySelectorAll('#attackZones input[type="radio"]');
        const defenseZones = document.querySelectorAll('#defenseZones input[type="checkbox"]');

        function validateSelection() {
            const attackSelected = [...attackZones].filter(cb => cb.checked).length === player.attackCount;
            const defenseSelected = [...defenseZones].filter(cb => cb.checked).length === player.blockCount;
            attackBtn.disabled = !(attackSelected && defenseSelected);
        }

        attackZones.forEach(cb => {
            cb.addEventListener("change", () => {
                const checked = [...attackZones].filter(c => c.checked);
                if (checked.length > player.attackCount) cb.checked = false;
                validateSelection();
            });
        });

        defenseZones.forEach(cb => {
            cb.addEventListener("change", () => {
                const checked = [...defenseZones].filter(c => c.checked);
                if (checked.length > player.blockCount) cb.checked = false;
                validateSelection();
            });
        });

        attackBtn.addEventListener("click", () => {
            const playerHP = document.getElementById("playerHP");
            const enemyHP = document.getElementById("enemyHP");

            const turn = enemyTurn(state.enemy);
            const blockZones = [...defenseZones].filter(cb => cb.checked).map(z => z.value);

            const playerAttack = Array.from(attackZones).find(input => input.checked)?.value;

            playerWriteLog(playerAttack, turn.blockZones, player, state, true);
            enemyHP.textContent = state.enemy.health;

            if (state.account.health <= 0 || state.enemy.health <= 0) {
                updateLogs();
                return;
            }

            turn.attackZones.forEach(zone => {
                if (state.account.health <= 0) return;
                playerWriteLog(zone, blockZones, player, state, false);
                playerHP.textContent = state.account.health;
            })

            updateLogs()
        });
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
            state = cleanUp();

            window.location.hash = "#/home";
        }
    };

    span.onclick = function() {
        modal.style.display = "none";
        state = cleanUp();

        window.location.hash = "#/home";
    };
}