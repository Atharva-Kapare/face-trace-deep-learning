import "../css/Database.css"

import React, { Component } from 'react';

class Database extends Component {

    render() {
        return (
            <div className="dataset">
                {this.props.images.map((img) => (
                    <>
                        <div key={img.name} className="imageDiv">
                            <img src={img.image} alt="test"></img>
                            <p>{img.name}</p>
                        </div>
                    </>
                ))}
            </div>
        );
    }
}

export default Database;
