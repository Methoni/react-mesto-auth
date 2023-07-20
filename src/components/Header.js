import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header__logo.svg';

function Header({ name, userEmail, onSignOut }) {
  function onSignOut() {
    localStorage.removeItem('jwt');
  }

  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип Mesto" />

      {name === 'register' || name === 'login' ? (
        <Link
          to={name === 'register' ? '/sign-in' : '/sign-up'}
          className="header__link"
        >
          {name === 'register' ? 'Войти' : 'Регистрация'}
        </Link>
      ) : (
        <>
          <div className="header__text">
            <p className="header__email">{userEmail}</p>
            {
              <Link
                to={'/sign-in'}
                className="header__link"
                onClick={onSignOut}
              >
                Выйти
              </Link>
            }
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
