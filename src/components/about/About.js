import React, { Component } from 'react';
import { twitterAccount } from '../../assets/constants';

class App extends Component {
    render = () => {
      const href = `https://twitter.com/${twitterAccount}`;

      return(
        <div>
          <div className="container center-text">
            <p className="developed-by">Developed by <b><a href={href} target="_blank">{twitterAccount}</a></b>.</p>
            <p>Some new tools will be added in the future, if you have any suggestions or improves, please send to the twitter above. </p>
          </div>
          <footer className="footer">
            <div className="container center-text">Runescape is a registered trademark of Jagex © 1999 - 2019 Jagex Ltd. 220 Science Park, Cambridge, CB4 0WA, United Kingdom. </div>
          </footer>
        </div>
      );
    }
 }

export default App;