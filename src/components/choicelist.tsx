import * as React from 'react';
import { List, IconButton, Label } from 'office-ui-fabric-react';

interface AppProps {
    choices: string[];
    removeChoice: (index: number, list: string[]) => void;
}

interface AppState {
    
}

export class ChoiceList extends React.Component<AppProps, AppState> {
    constructor(props: AppProps, state: AppState) {
        super(props);
    }

    onRenderCell = (item: string, index: number): JSX.Element => {
        return (
            <div>
                <IconButton
                    iconProps={{ iconName: 'Delete' }}
                    title="Delete"
                    ariaLabel="Delete"
                    onClick={() => this.props.removeChoice(index, this.props.choices)}
                />
                <Label>{item}</Label>
            </div>
        );
    }

    render() {
        return (
            <List items={this.props.choices} onRenderCell={this.onRenderCell} />
        );
    }
}