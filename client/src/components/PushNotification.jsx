import { Notifications } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { createClient } from 'graphql-ws';
import { QRAPHQL_SUBCRIPTION_ENDPOINT } from '../utils/constants';
import { Badge, Menu, MenuItem } from '@mui/material';
const client = createClient({
    url: QRAPHQL_SUBCRIPTION_ENDPOINT,
});

const q = `subscription PushNotification {
    notification {
      message
    }
  }`
function PushNotification() {

    const [invisible,setInvisible] = useState(true);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const [notification,setNotification] = useState('');
  const open = Boolean(anchorEl);

 

  const handleClose = () => {
    setAnchorEl(null);
    setNotification('')
    setInvisible(true)
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
    
    
    useEffect(() => {
        (async () => {
            const onNext = (data) => {
              setInvisible(false)
              const message = data?.data?.notification?.message ;
              setNotification(message);
              console.log(data);
            };

            await new Promise((resolve, reject) => {
                client.subscribe(
                {
                  query: q,
                },
                {
                  next: onNext,
                  error: reject,
                  complete: resolve,
                },
              );
            });
          
            expect(onNext).toBeCalledTimes(5); // we say "Hi" in 5 languages
          })();
    })


    return (
      <Badge color='secondary' variant='dot' invisible = {invisible}> <Notifications onClick={handleClick}  />
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} >{notification}</MenuItem>
      </Menu>
      </Badge>
    );
}

export default PushNotification;