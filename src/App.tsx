/** @jsxImportSource @emotion/react */

import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainView from './components/MainView';
import LoginView from './components/LoginView';
import LogonView from './components/LogonView';
import LoginContext, { LoginData, UserCreate } from './context/LoginContext';
import { css, Global } from '@emotion/react';
import { createUser, getCurrentUser, logout } from './util/api';
import { colorPrimary } from './util/constants';
import Header from './components/Header';
import Column from './components/common/Column';
import PostView from './components/PostView';


interface GlobalProps { };
interface GlobalState {
  loginData: LoginData;
}

class App extends React.Component<GlobalProps, GlobalState> {

  constructor(props: {} | Readonly<{}>) {
    super(props);
    const loginFunc = async (email: string, password: string) => {
      try {
        const user = await getCurrentUser({ username: email, password });
        this.setState(state => ({
          loginData: {
            ...state.loginData,
            user: user.data,
            loggedIn: true,
          }
        }));
        return true;
      } catch (err) {
        console.error(err);
        this.setState(state => ({
          loginData: { ...state.loginData, user: null, loggedIn: false }
        }));
        return false;
      }
    };
    const logonFunc = async (userCreate: UserCreate) => {
      try {
        /*const userId = */await createUser(userCreate);
        const user = await getCurrentUser({ username: userCreate.email, password: userCreate.password });
        this.setState(state => ({
          loginData: {
            ...state.loginData,
            user: user.data,
            loggedIn: true,
          }
        }));
        return true;
      } catch (err) {
        console.error(err);
        this.setState(state => ({
          loginData: { ...state.loginData, user: null, loggedIn: false }
        }));
        return false;
      }
    };

    const logoutFunc = async () => {
      try {
        await logout();
      } catch (err) {
        console.error(err);
      }
      this.setState(state => ({
        loginData: {
          ...state.loginData,
          user: null,
          loggedIn: false,
        }
      }));
    };

    const sessionDetectFunc = async () => {
      try {
        const user = await getCurrentUser();
        this.setState(state => ({
          loginData: {
            ...state.loginData,
            user: user.data,
            loggedIn: true,
          }
        }));
        return true;
      } catch (err) {
        console.error(err);
        this.setState(state => ({
          loginData: { ...state.loginData, user: null, loggedIn: false }
        }));
        return false;
      }
    }
    this.state = {
      loginData: {
        loggedIn: false,
        user: undefined,
        login: loginFunc,
        logon: logonFunc,
        logout: logoutFunc,
        detectSession: sessionDetectFunc
      }
    };
  }



  render() {
    return (
      <div className="App" css={css({
        width: "100%",
        height: "100%",
      })}>
        <Global styles={
          {
            "h2": {
              fontSize: "1.5em",
              marginBlock: "0.3em",
              fontWeight: "bold",
            },
            "a": {
              color: colorPrimary
            },
            "figure": {
              margin: "0",
            }
          }
        } />
        <LoginContext.Provider value={this.state.loginData}>
          <Column css={css({ width: "100%", height: "100%", alignItems: "stretch" })}>
            <Header />
            <Routes>
              <Route path="/" element={<MainView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/logon" element={<LogonView />} />
              <Route path="/post/:id" element={<PostView />}></Route>
            </Routes>
          </Column>
        </LoginContext.Provider>
      </div>
    );
  }
}

export default App;
