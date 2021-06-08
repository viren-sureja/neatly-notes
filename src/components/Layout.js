import {
    AppBar,
    Avatar,
    Drawer,
    makeStyles,
    Toolbar,
    Typography,
} from '@material-ui/core';
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';
import { format } from 'date-fns';

const drawerWidth = 240;

const useStyles = makeStyles(theme => {
    return {
        page: {
            backgroundColor: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3),
        },
        drawer: {
            width: drawerWidth,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        root: {
            display: 'flex',
        },
        active: {
            backgroundColor: '#f4f4f4',
        },
        title: {
            padding: theme.spacing(2),
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1,
        },
        avatar: {
            marginLeft: theme.spacing(2),
        },
    };
});

function Layout({ children }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color="secondary" />,
            path: '/',
        },
        {
            text: 'Create Notes',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/create',
        },
    ];

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar>
                    <Typography className={classes.date}>
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography>Steve</Typography>
                    <Avatar src="/steve-jobs.jpg" className={classes.avatar} />
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                        Neatly Notes
                    </Typography>
                </div>

                <List>
                    {menuItems.map(item => (
                        <ListItem
                            key={item.text}
                            button
                            onClick={() => history.push(item.path)}
                            className={
                                location.pathname === item.path
                                    ? classes.active
                                    : null
                            }
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            {/* to display particular pageRoute (inherited from app.js) */}
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
            ;
        </div>
    );
}

export default Layout;
