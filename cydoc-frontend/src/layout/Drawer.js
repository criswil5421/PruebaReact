import React ,{useEffect, useCallback, useState, Component}  from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import axios from 'axios';



import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';


const drawerWidth = 240;


const url = "http://localhost:3001/menu";


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



const SubMenu=(prop) => {

  return (
    prop.sabrir ? <ExpandLess /> : <ExpandMore />

  );
};

const MenuPadres=() =>{

  const [abrir, setAbrir] = React.useState(false);
  const handleClick = () => {
    setAbrir(!abrir);
  };

  const [menu, setMenu] = useState([])
    const fetchApi = async () => {
      await axios.get(url)
      .then(response=>{
        setMenu(response.data);
        console.log(response.data);
      })
    }

    useEffect(async() => {
      await fetchApi();
    }, [])


    var menus;
  

         if (menu) { 
              menus = menu.map ((text, index) => {

                const submenu = text.submenu.map((sm, index) =>{
                  return <ListItemText key={index} primary={sm.nombre} />


                });

                return <ListItem button key={text.id} onClick={handleClick} >
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text.tipo} />
                    <ListItem  key={index} disabled={true} nestedItems={submenu}/>
                  <SubMenu sabrir={abrir}/>
                </ListItem>
                
              
              });
          }
  
  return menus;
};


export default function MiniDrawer(props){

  const theme = useTheme();
  
  return (

      <Drawer variant={props.variant} open={props.open}>
          <DrawerHeader>
            <IconButton onClick={props.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
            <List>
              <MenuPadres />
            </List>
          <Divider />
      </Drawer>
  );
}


