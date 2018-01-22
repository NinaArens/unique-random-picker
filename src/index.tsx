import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { ChoiceList } from './components/choicelist';
import { ChoiceInput } from './components/choiceinput';
import 'office-ui-fabric-react/dist/css/fabric.min.css';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { RandomPicker } from './components/randompicker';
import { Button } from 'office-ui-fabric-react';

initializeIcons(/* optional base url */);

interface AppProps {
  
}

interface AppState {
  choices: string[];
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);
    this.state = {
      choices: localStorage.getItem('choices') ? localStorage.getItem('choices')!.split(',') : [],
    };
  }

  addChoice = (choice: string): void =>  {
    this.setState({choices: [...this.state.choices, choice]});
    localStorage.setItem('choices', [...this.state.choices, choice].toString());
  }

  removeChoice = (key: number): void => {
    let choices = this.state.choices.slice();
    choices.splice(key - 1, 1);
    this.setState({choices: choices});
    localStorage.setItem('choices', choices.toString());
  }

  render() {
    return (
      <div className="ms-Grid">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col">
            <h1 className="ms-fontColor-themePrimary ms-font-su">Unique random picker</h1>
          </div>
        </div>
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-md4">
            <ChoiceInput addChoice={this.addChoice} />
            <div className="ms-clearfix" />
            <ChoiceList choices={this.state.choices} removeChoice={this.removeChoice} />
          </div>
          <div className="ms-Grid-col ms-md4">
            <RandomPicker />
          </div>
          <div className="ms-Grid-col ms-md4">
            <Button text="Reset" />
            <div className="ms-clearfix" />
            <ChoiceList choices={[]} removeChoice={this.removeChoice} />
          </div>
        </div>
      </div>
    );
  }
}
registerServiceWorker();

ReactDOM.render(
  <App />,
  document.getElementById('root')
);