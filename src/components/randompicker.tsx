import * as React from 'react';
import { Button, Label } from 'office-ui-fabric-react';

interface AppProps {
    
}

export class RandomPicker extends React.Component<AppProps> {
    constructor(props: AppProps) {
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