import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Adduser from './Adduser';
import Home from './Home';
import Login from './Login';
import Deleteuser from './Deleteuser';
import Searchuser from './Searchuser';
import TodoList from './TodoList';
import ViewTodolist from './ViewTodolist';
import Selection from './Selection';
import Admin from './Admin';
import ViewUsers from './ViewUsers' 

function App()
{
    return(
        <Router>
            <Routes>
                <Route path = "/" element = {<Home/>}/>
                <Route path = "/adduser" element = {<Adduser/>}/>
                <Route path='/admin' element = {<Admin/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/admin/view' element = {<ViewUsers/>}/>
                <Route path='/admin/deluser' element={<Deleteuser/>}/>
                <Route path = '/admin/searchuser' element={<Searchuser/>}/>
                <Route path='/login/select/:userID' element={<Selection/>}/>
                <Route path = '/login/select/todolist/:userID' element = {<TodoList/>}/> {/*The url should be /login/select/:userID.Should not be given as /login/select/:id*/ }
                <Route path='/login/select/viewtodolist/:userID' element = {<ViewTodolist/>}/>
            </Routes>
        </Router>
    );
}
export default App;