import * as React from 'react';
import { TextField, Button } from 'office-ui-fabric-react';

interface AppProps {

}

interface AppState {

}

export class ChoiceInput extends React.Component<AppProps, AppState> {
    constructor(props: AppProps, state: AppState) {
        super(props);
    }

    render() {
        return (
            <div>
                <TextField /><Button text="Add" onClick={this._addChoice} />
            </div>
        );
    }

    private _addChoice(): void {
        // TODO
    }
}