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
import { TextField } from '@material-ui/core';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


const API_URL = process.env.REACT_APP_API_URL;

export default function Comments(props) {

    // const [comments, setComments] = useState([]);
    const [comments, setComments] = useState(null)
    const [comment, setComment] = useState(null)
    
    const handleComment = (e) => setComment(e.target.value); 

    const getAllComments = async () => {
      try {
        const allComments = await axios.get(`${API_URL}/comments/post/${props.postId}`, { withCredentials: true })
          setComments(allComments.data);
      } catch(err) {
        console.log(err)
      }
    }

    const handleCommentSubmit = async (e) => {
      e.preventDefault();

      try {
          const postId = await props.postId
          const data = { comment, postId };
          await axios.post(`${API_URL}/comments/create`, data, { withCredentials: true })
          await getAllComments();
          setComment('')
      } catch (err) {
          console.log(err)
      }
  }

  useEffect(() => {
    getAllComments();
  }, [])

  return (
    <>
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    {comments ? (comments.map(user => { return(
        <>
        <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt={user?.sender.username} src={user?.sender.profilePicture} />
        </ListItemAvatar>
        <ListItemText
          primary={user?.sender.username}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
              </Typography>
              {user.description}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      </>
    )})) : ('loading...')}
   
    </List>
    <form className='post-comment-form' onSubmit={handleCommentSubmit}>
            <TextField
                size="small"
                value={comment}
                variant="outlined"
                className="comment-post-input"
                placeholder="add comment"
                onChange={handleComment}
            />
            <Button
            variant="contained"
            size="small"
            color='secondary'
            endIcon={<SendIcon />}
            type="submit"
             >
            Send
            </Button>
        </form>
      </>
  );
}
