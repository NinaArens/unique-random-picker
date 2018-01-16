import * as React from 'react';
import { Button, Label } from 'office-ui-fabric-react';

interface AppProps {

}

interface AppState {
    
}

export class RandomPicker extends React.Component<AppProps, AppState> {
    constructor(props: AppProps, state: AppState) {
        super(props);
    }

    render() {
        return (
            <div>
                <Button primary={true} text="Pick" />
                <Label>&nbsp;</Label>
            </div>
        );
    }
}