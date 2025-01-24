import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "../../components/ui/provider";
import { LoginPage, AdminPage, Page404 } from "../../pages";

import {
  AlbumsList,
  CreateAlbum,
  Dashboard,
  EditAlbum,
  Posts,
  ShowAlbum,
  ShowPost
} from "..";

import './app.css';

const App = () => {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<AdminPage/>}>
            <Route index element={<Dashboard />}/>
            <Route path="albums" element={<AlbumsList/>}/>
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
  );
}

export default App;
