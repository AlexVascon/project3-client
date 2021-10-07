import React, { useEffect, useState} from 'react';
import './comments.css'
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';


const API_URL = process.env.REACT_APP_API_URL;

export default function Comments({ comment }) {

    // const [comments, setComments] = useState([]);

    
    // useEffect(() => {
    //     const getComments = async () => {
    //         try {
    //             const allComments = await axios.get(`${API_URL}/comments/post/${props.postId}`, { withCredentials: true })
    //             setComments(allComments.data);
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     getComments();
    // }, [])

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    {comment ? (
        <>
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={comment?.sender.username} src={comment?.sender.profilePicture} />
        </ListItemAvatar>
        <ListItemText
          primary={comment?.sender.username}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
              {comment?.description}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </>
    ) : ('loading..') }
    </List>
  );
}

//     const [comments, setComments] = useState([]);

    
//     useEffect(() => {
//         const getComments = async () => {
//             try {
//                 const allComments = await axios.get(`${API_URL}/comments/post/${props.postId}`, { withCredentials: true })
//                 setComments(allComments.data);
//             } catch (err) {
//                 console.log(err)
//             }
//         }
//         getComments();
//     }, [])

//   return (
//     <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//     {comments ? (comments.map(user => { return(
//         <>
//         <ListItem alignItems="flex-start">
//         <ListItemAvatar>
//           <Avatar alt={user.sender.username} src={user.sender.profilePicture} />
//         </ListItemAvatar>
//         <ListItemText
//           primary={user.sender.username}
//           secondary={
//             <React.Fragment>
//               <Typography
//                 sx={{ display: 'inline' }}
//                 component="span"
//                 variant="body2"
//                 color="text.primary"
//               >
//               </Typography>
//               {user.description}
//             </React.Fragment>
//           }
//         />
//       </ListItem>
//       <Divider variant="inset" component="li" />
//       </>
//     )})) : ('loading..') }
//     </List>
//   );
// }
