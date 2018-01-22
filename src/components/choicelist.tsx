import * as React from 'react';
import { List, IconButton, Label } from 'office-ui-fabric-react';

interface AppProps {
    choices: string[];
}

interface AppState {
    
}

export class ChoiceList extends React.Component<AppProps, AppState> {
    constructor(props: AppProps, state: AppState) {
        super(props);
    }

    render() {
        return (
            <List items={this.props.choices} onRenderCell={this._onRenderCell} />
        );
    }

    private _onRenderCell(item: string, index: number): JSX.Element {
        return (
            <div>
                <IconButton
                    iconProps={{ iconName: 'Delete' }}
                    title="Delete"
                    ariaLabel="Delete"
                />
                <Label>{item}</Label>
            </div>
        );
    }
}