import './index.scss';

export function header() {
    return `
        <header class="header">
            <div class="header__box">
                <div class="header__logo">Not Fight Club</div>
                
                <ul class="header__ul">
                    <li class="header__li" onclick="window.location.hash = '#/home'">
                        <img src="../../assets/images/icons/home.png" alt="page home image" >
                    </li>
                    <li class="header__li" onclick="window.location.hash = '#/avatar'">
                        <img src="../../assets/images/icons/user.png" alt="page character image" >
                    </li>
                    <li class="header__li" onclick="window.location.hash = '#/settings'">
                        <img src="../../assets/images/icons/setting.png" alt="page settings image" >
                    </li>
                </ul>
            </div>
        </header>
    `;
}
