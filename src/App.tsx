import React, { FunctionComponent } from 'react';

import HomeScreen from './containers/HomeScreen';

const App: FunctionComponent = () => {
    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
            }}
        >
            <HomeScreen />
        </div>
    );
};

export default App;
