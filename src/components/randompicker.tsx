import * as React from 'react';
import { Button, Label } from 'office-ui-fabric-react';

interface AppProps {
    pickedChoice: string;
    pickChoice: () => void;
    waitingChoices: string[];
    pickerDisabled: boolean;
}

interface AppState {
    
}

export class RandomPicker extends React.Component<AppProps, AppState> {
    constructor(props: AppProps, state: AppState) {
        super(props);
        this.state = {
            disabled: true
        };
    }

    render() {
        return (
            <div>
                <Button
                    primary={true}
                    text="Pick"
                    onClick={() => this.props.pickChoice()}
                    disabled={this.props.pickerDisabled} 
                />
                <Label>{this.props.pickedChoice}</Label>
            </div>
        );
    }
}