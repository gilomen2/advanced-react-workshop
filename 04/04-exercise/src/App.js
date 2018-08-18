/*
Create a `withStorage` higher order component that manages saving and retrieving
the `sidebarIsOpen` state to local storage
*/

import './index.css';
import React from 'react';
import MenuIcon from 'react-icons/lib/md/menu';
import { set, get, subscribe } from './local-storage';

const withStorage = (storageName, dfState, Comp) => {
  return class WithStorage extends React.Component {
    state = {
      storageValue: get(storageName, dfState)
    };

    componentDidMount() {
      this.unsubscribe = subscribe(() => {
        this.setState({
          storageValue: get(storageName, dfState)
        });
      });
    }

    componentWillUnmount() {
      this.unsubscribe();
    }

    setStorage(name, value) {
      set(name, value);
    }

    render() {
      return <Comp storageValue={this.state.storageValue} setStorage={this.setStorage} />;
    }
  };
};

class App extends React.PureComponent {
  render() {
    const { storageValue, setStorage } = this.props;
    return (
      <div className="app">
        <header>
          <button
            className="sidebar-toggle"
            title="Toggle menu"
            onClick={() => {
              setStorage(!storageValue);
            }}>
            <MenuIcon />
          </button>
        </header>

        <div className="container">
          <aside className={storageValue ? 'open' : 'closed'} />
          <main />
        </div>
      </div>
    );
  }
}

export default withStorage('sideBarIsOpen', false, App);
