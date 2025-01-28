import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Grid,
  GridItem, 
  Flex,
  Center,
  Button,
} from "@chakra-ui/react";
import { Toaster } from "../components/ui/toaster";

const AdminPage = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem('isLogined');
    navigate('/login');
  }

  return (
    <>
      <Grid height="100vh" gridTemplateColumns="250px 1fr">
        <GridItem as="aside" p="5" bg="gray.300">
          <Flex direction="column" justifyContent="space-between" gap="5" height="100%">
            <nav>
              <ul>
                <li>
                  <NavLink end to="/" style={({isActive}) => ({'color': isActive ? 'red' : 'initial'})}>
                    Dashboard
                  </NavLink>
                  </li>
                <li>
                  <NavLink to="albums" style={({isActive}) => ({'color': isActive ? 'red' : 'initial'})}>
                    Albums
                  </NavLink>
                </li>
                <li>
                  <NavLink to="posts" style={({isActive}) => ({'color': isActive ? 'red' : 'initial'})}>
                    Posts
                  </NavLink>
                </li>
              </ul>
            </nav>
            <Center>
              <Button variant="surface" onClick={() => logOut()}>Log out</Button>
            </Center>
          </Flex>
        </GridItem>
        <GridItem as="main" p="5" overflowY="auto">
          <Outlet />
        </GridItem>
      </Grid>
      <Toaster />
    </>
  )
  
};

export default AdminPage;