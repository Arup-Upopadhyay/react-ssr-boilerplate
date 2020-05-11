import React from "react";

class App extends React.Component {
    render() {
        return <div onClick={() => {alert(1)}}>My React application running!</div>;
    }
};

export default App;
