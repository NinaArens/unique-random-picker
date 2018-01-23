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
  waitingChoices: string[];
  usedChoices: string[];
  pickedChoice: string;
  resetDisabled: boolean;
  pickerDisabled: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);
    this.state = {
      waitingChoices: localStorage.getItem('waitingChoices') ? localStorage.getItem('waitingChoices')!.split(',') : [],
      usedChoices: localStorage.getItem('usedChoices') ? localStorage.getItem('usedChoices')!.split(',') : [],
      pickedChoice: localStorage.getItem('pickedChoice') ? localStorage.getItem('pickedChoice')! : '',
      resetDisabled: localStorage.getItem('pickedChoice') ? false : true,
      pickerDisabled: localStorage.getItem('waitingChoices') ? false : true
    };
  }

  addChoice = (choice: string, list: string[]): void => {
    if (list === this.state.waitingChoices) {
      this.setState({ waitingChoices: [...list, choice], pickerDisabled: false });
      localStorage.setItem('waitingChoices', [...list, choice].toString());
    } else if (list === this.state.usedChoices) {
      this.setState({ usedChoices: [...list, choice] });
      localStorage.setItem('usedChoices', [...list, choice].toString());
    }
  }

  removeChoice = (index: number, list: string[]): void => {
    let choices = list.slice();
    choices.splice(index, 1);

    if (list === this.state.waitingChoices) {
      this.setState({ waitingChoices: choices });
      localStorage.setItem('waitingChoices', choices.toString());
      if (choices.length === 0) {
        if (this.state.pickedChoice.length === 0) {
          this.setState({ resetDisabled: true });
        }
        this.setState({ pickerDisabled: true });
      }
    } else if (list === this.state.usedChoices) {
      this.setState({ usedChoices: choices });
      localStorage.setItem('usedChoices', choices.toString());
    }
  }

  pickChoice = (): void => {
    if (this.state.pickedChoice !== '') {
      this.addChoice(this.state.pickedChoice, this.state.usedChoices);
    }
    let randomIndex = Math.floor(Math.random() * this.state.waitingChoices.length);
    this.setState({ pickedChoice: this.state.waitingChoices[randomIndex], resetDisabled: false });
    localStorage.setItem('pickedChoice', this.state.waitingChoices[randomIndex]);
    this.removeChoice(randomIndex, this.state.waitingChoices);
  }

  resetChoices = (): void => {
    this.setState({
      waitingChoices: this.state.waitingChoices.concat(this.state.usedChoices.concat(this.state.pickedChoice)),
      pickedChoice: '',
      pickerDisabled: false,
      resetDisabled: true
    });
    localStorage.setItem(
      'waitingChoices',
      this.state.waitingChoices.concat(
        this.state.usedChoices.concat(this.state.pickedChoice)
      ).toString());
    this.setState({ usedChoices: [] });
    localStorage.setItem('usedChoices', '');
    localStorage.setItem('pickedChoice', '');
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
            <ChoiceInput addChoice={this.addChoice} choices={this.state.waitingChoices} />
            <div className="ms-clearfix" />
            <ChoiceList choices={this.state.waitingChoices} removeChoice={this.removeChoice} />
          </div>
          <div className="ms-Grid-col ms-md4">
            <RandomPicker
              pickedChoice={this.state.pickedChoice}
              pickChoice={this.pickChoice}
              waitingChoices={this.state.waitingChoices}
              pickerDisabled={this.state.pickerDisabled}
            />
          </div>
          <div className="ms-Grid-col ms-md4">
            <Button text="Reset" onClick={this.resetChoices} disabled={this.state.resetDisabled} />
            <div className="ms-clearfix" />
            <ChoiceList choices={this.state.usedChoices} removeChoice={this.removeChoice} />
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