import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "../../components/ui/provider";
import { LoginPage, AdminPage, Page404 } from "../../pages";

import {
  Albums,
  CreateAlbum,
  Dashboard,
  EditAlbum,
  Posts,
  ShowAlbum,
  ShowPost
} from "..";

import { RequireAuth } from "../../hoc/RequireAuth";
import { AuthProvider } from "../../hoc/AuthProvider";

import './app.css';

const App = () => {
  return (
    <AuthProvider>
      <Provider>
        <Router>
          <Routes>
            <Route path="/" element={
              <RequireAuth>
                <AdminPage/>
              </RequireAuth>
              }>
              <Route index element={<Dashboard />}/>
              <Route path="albums" element={<Albums/>}/>
              <Route path="albums/create" element={<CreateAlbum />}/>
              <Route path="albums/:id" element={<ShowAlbum/>}/>
              <Route path="albums/:id/edit" element={<EditAlbum />}/>
              <Route path="posts" element={<Posts/>} />
              <Route path="posts/:id" element={<ShowPost/>} />
            </Route>
            <Route path="login" element={<LoginPage />}/>
            <Route path="*" element={<Page404 />}/>
          </Routes>
        </Router>
      </Provider>
    </AuthProvider>
  );
}

export default App;
