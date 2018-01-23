import * as React from 'react';
import { TextField, Button } from 'office-ui-fabric-react';

interface AppProps {
    addChoice: (choice: string, list: string[]) => void;
    choices: string[];
}

interface AppState {
    disabled: boolean;
    error: string;
    input: string;
}

export class ChoiceInput extends React.Component<AppProps, AppState> {
    textField: TextField | null;

    constructor(props: AppProps) {
        super(props);
        this.state = {
            disabled: true,
            error: '',
            input: ''
        };
    }

    checkDisabled = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (this.textField!.value!.trim() !== '') {
            if (e.key === 'Enter') {
                this.addChoice();
            } else {
                this.setState({ disabled: false, error: '', input: this.textField!.value! });
            }
        } else {
            if (this.textField!.value! === '') {
                this.setState({ disabled: true, error: '', input: this.textField!.value! });
            } else {
                this.setState({ 
                    disabled: true, 
                    error: 'Choice cannot be an empty string', 
                    input: this.textField!.value! 
                });
            }
        }
    }

    addChoice = () => {
        this.props.addChoice(
            this.textField ? (this.textField.value ? this.textField.value : '') : '',
            this.props.choices);
        this.setState({ disabled: true, error: '', input: '' });
    }

    render() {
        return (
            <div>
                <TextField
                    ref={me => this.textField = me}
                    onKeyUp={this.checkDisabled}
                    placeholder="Enter a choice"
                    errorMessage={this.state.error}
                    value={this.state.input}
                />
                <Button
                    text="Add"
                    onClick={this.addChoice}
                    disabled={this.state.disabled}
                />
            </div>
        );
    }
}