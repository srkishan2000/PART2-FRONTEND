import React from 'react';

const DistanceForm = (props) => {
    console.log(props);
    return (
        <form onSubmit={props.getDistance}>
            <div style={{margin: "20px auto", display:"block"}} >
                From : <input type="text" name="fromLocation" />
            </div>
            <div style={{margin: "20px auto", display:"block"}} >
                To : <input type="text" name="toLocation" />
            </div>
            <button>Calculate</button>
            <div style={{margin: "20px auto", display:"block"}} >
                Calculated distance is {props.result} Km
            </div>
        </form>
    );
}

export default DistanceForm;