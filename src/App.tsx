/** @jsxImportSource @emotion/react */

import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainView from './components/MainView';
import LoginView from './components/LoginView';
import LogonView from './components/LogonView';
import LoginContext, { LoginData, User, UserCreate } from './context/LoginContext';
import axios, { AxiosResponse } from 'axios';
import { api } from './constants';
import { css, Global } from '@emotion/react';


interface GlobalProps { };
interface GlobalState {
  loginData: LoginData;
}

class App extends React.Component<GlobalProps, GlobalState> {

  constructor(props: {} | Readonly<{}>) {
    super(props);
    const loginFunc = async (email: string, password: string) => {
      try {
        const user = await axios.get(api + "/user", {
          responseType: "json",
          auth: {
            username: email,
            password: password
          },
          withCredentials: true
        }) as AxiosResponse<User, any>;
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
        const userId = await axios.post(api + "/user", userCreate, {
          responseType: "text",
          withCredentials: true
        }) as AxiosResponse<User, any>;
        const user = await axios.get(api + "/user" + userId.data, {
          responseType: "json",
          withCredentials: true,
        }) as AxiosResponse<User, any>;
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

    const logoutFunc = () => {
      this.setState(state => ({
        loginData: {
          ...state.loginData,
          user: null,
          loggedIn: false,
        }
      }))
    };

    const sessionDetectFunc = async () => {
      try {
        const user = await axios.get(api + "/user", {
          responseType: "json",
          withCredentials: true,
        }) as AxiosResponse<User, any>;
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
            }
          }
        } />
        <LoginContext.Provider value={this.state.loginData}>
          <Routes>
            <Route path="/" element={<MainView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/logon" element={<LogonView />} />
          </Routes>
        </LoginContext.Provider>
      </div>
    );
  }
}

export default App;
