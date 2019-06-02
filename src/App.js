import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import DistanceForm from "./components/DistanceForm";

// http://localhost:8080/calculatedistance

class App extends Component {

  state = {
    result : 0
    // fromLongitude : 0,
    // fromLatitude : 0,
    // toLongitude : 0,
    // toLatitude : 0
  }

  getLon(location){
    console.log(">>>>>>>>>>>>>> Location ", location);
    axios.get('https://eu1.locationiq.com/v1/search.php?key=395807791e46d7&q='+{location}+'&format=json')
    .then((res) => {
      console.log("From location Longitude co-ordinate ", res.data[0].lon);
      console.log("From location Latitude co-ordinate ", res.data[0].lat);
      return res.data[0].lon;
      // this.setState({
      //   fromLongitude: res.data[0].lon,
      //   fromLatitude : res.data[0].lat
      // });
    })
    .catch(err => {
      console.log("Error in getting longitude co-ordinate ", err)
    })
  }

  getLat(location){
    console.log(">>>>>>>>>>>>>> Location ", location);
    axios.get('https://eu1.locationiq.com/v1/search.php?key=395807791e46d7&q='+{location}+'&format=json')
    .then((res) => {
      console.log("To location Longitude co-ordinate ", res.data[0].lon);
      console.log("To location Latitude co-ordinate ", res.data[0].lat);
      return res.data[0].lat;
      // this.setState({
      //   toLongitude: res.data[0].lon,
      //   toLatitude : res.data[0].lat
      // });
    })
    .catch(err => {
      console.log("Error in getting latitude co-ordinate ", err)
    })
  }

  getDistance = (e) => {
    e.preventDefault();
    const fromLocation = e.target.elements.fromLocation.value;
    const toLocation = e.target.elements.toLocation.value;
    console.log("locations :", fromLocation, toLocation);

    this.getLon(fromLocation);
    this.getLat(fromLocation);
    console.log("###################");
    this.getLon(toLocation);
    this.getLat(toLocation);

    const data = {
      'from': { 'longitude': 24.931572491457246, 'latitude': 60.16854264792225 },
      'to': { 'longitude': 18.070610577394746, 'latitude': 59.33008098849257 }
    }

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      headers,
      body: JSON.stringify(data)
    }

    axios.post('http://localhost:8080/calculatedistance', data , options)
    .then((res) => {
      console.log(res.data)
      this.setState({
        result: res.data
      });
    })
    .catch(err => {
      console.log(err)
    })

  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Calculate distance between two points</h1>
        </header>
        <DistanceForm getDistance={this.getDistance} result={this.state.result}/>
      </div>
    );
  }
}

export default App;
