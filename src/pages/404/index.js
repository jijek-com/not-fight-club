import './index.scss';

export function pageNotFound(container) {
    container.innerHTML = `
        <div class="page">
            <div class="not-found">
                <div class="not-found__box">
                    <img class="not-found__img" src="../../assets/images/atlant.png" alt="page not found image" >
                    <h1>Page not found</h1>
                    <button class="not-found__btn" onclick="window.location.hash = '#/login'">назад к персонажу</button>
                </div>
            </div>
        </div>
    `;
}