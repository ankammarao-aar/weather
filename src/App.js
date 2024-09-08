import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CitiesTable from './components/CitiesTable';
import WeatherDetails from './components/WeatherDetails';
import './App.css';

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={CitiesTable} />
            <Route exact path="/city/:name" component={WeatherDetails} />
        </Switch>
    </BrowserRouter>
)

export default App;
