import SideBar from './components/SideBar';
import "./styles/stylesheets/style.css";
import UpBar from './components/UpBar';
import ContentWrapper from './components/ContentWrapper';
const App = () => {
    return(
    <div>
    <UpBar/>
    <SideBar/>
    <ContentWrapper/>
    </div>)
};

export default App;