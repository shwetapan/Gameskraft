import React from 'react';
import './home.css';
import Logo from './logo.PNG'
const Home = () => {
    return (
        <div className="main-container">
        <div className="container">
           <div class="page-header__logo">
            <img src={Logo} alt="logo"/>
            <span class="page-header__logo_text">eGAMER COMMUNITY</span>
            </div>
            <div class="page-header__content">
                <div class="page-header__search">
                    <div class="search">
                        <div class="search__input"><i class="ico_search"></i><input type="search" name="search" placeholder="Search"/></div>
                        <div class="search__btn"><button type="button"><i class="ico_microphone"></i></button></div>
                    </div>
                </div>
            <div class="page-header__action"></div>
            </div>
            </div>
            </div>
    
    );
};

export default Home;