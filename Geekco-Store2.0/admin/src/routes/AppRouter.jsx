import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Error from '../pages/Error';
import Categories from '../pages/Categories';
import Users from '../pages/Users';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
            
                <Route exact path="/" element={<Home />} />
                <Route exact path="/products" element={<Products />} />
                <Route exact path="/categories" element={<Categories />} />
                <Route exact path="/users" element={<Users />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
