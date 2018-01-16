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

ReactDOM.render(
  <div className="ms-Grid">
    <div className="ms-Grid-row">
      <div className="ms-Grid-col">
        <h1 className="ms-fontColor-themePrimary ms-font-su">Unique random picker</h1>
      </div>
    </div>
    <div className="ms-Grid-row">
      <div className="ms-Grid-col ms-md4">
        <ChoiceInput />
        <div className="ms-clearfix" />
        <ChoiceList />
      </div>
      <div className="ms-Grid-col ms-md4">
        <RandomPicker />
      </div>
      <div className="ms-Grid-col ms-md4">
        <Button text="Reset" />
        <div className="ms-clearfix" />
        <ChoiceList />
      </div>
    </div>
  </div>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
