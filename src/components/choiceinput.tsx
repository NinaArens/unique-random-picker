import * as React from 'react';
import { TextField, Button } from 'office-ui-fabric-react';

interface AppProps {
    addChoice: (choice: string) => void;
}

interface AppState {

}

export class ChoiceInput extends React.Component<AppProps, AppState> {
    textField: TextField | null;

    constructor(props: AppProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <TextField ref={me => this.textField = me} />
                <Button
                    text="Add"
                    onClick={() => this.props.addChoice(this.textField ?
                        (this.textField.value ? this.textField.value : '') : '')}
                />
            </div>
        );
    }
}