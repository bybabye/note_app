import { NoteAddOutlined } from "@mui/icons-material";
import { Box, Card, CardContent, Grid, IconButton, List, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from 'moment';
import { Link, Outlet, useParams ,useLoaderData ,useSubmit,useNavigate } from "react-router-dom";

function NodeList() {
 
  const { noteId , folderId } = useParams();
  const [activeNoteId, setActiveNoteId] = useState(noteId);
  const {folder} = useLoaderData();
  const submit = useSubmit();
  const navigate = useNavigate();

  useEffect(() => {
    if(noteId) {
      setActiveNoteId(noteId);
      return;
    }


    if(folder?.note?.[0]) {
      navigate(`note/${folder.note[0].id}`)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[noteId,folder.note])

  const handleAddNewNote = () => {

    submit({
      content : ``,
      folderId,
    } , {method : 'post',action : `/folders/${folderId}`})    
  }
 
  return (
    <Grid container height="100%">
      <Grid item xs={4}>
        <List
          sx={{
            width: "100%",
            maxWidth: "360px",
            bgcolor: "#F0EBE3",
            height: "100%",
            padding: "10px",
            textAlign: "left",
            overflowY: "auto",
          }}
          subheader={
            <Box sx={{display : 'flex' , alignItems : 'center' , justifyContent : 'space-between'}}>
              <Typography sx={{ color: "black", fontWeight: "bold" }}>
                Notes
              </Typography>
              <Tooltip title = 'Add Note' onClick={handleAddNewNote}>
                <IconButton size="small">
                  <NoteAddOutlined/>
                </IconButton>

              </Tooltip>
            </Box>
          }
        >
          {folder.notes.map(({ id, content , updatedAt }) => {
            return (
              <Link
                key={id}
                to={`note/${id}`}
                style={{ textDecoration: "none" }}
                onClick={() => setActiveNoteId(id)}
              >
                <Card
                  sx={{
                    mb: "5px",
                    backgroundColor: id === activeNoteId && "rgb(255 211 150)",
                  }}
                >
                  <CardContent
                    sx={{ "&:last-child": { pb: "10px" }, p: "10px" }}
                  >
                    <div
                      style={{ fontSize: 14, fontWeight: "bold" }}
                      dangerouslySetInnerHTML={{
                        __html: `${content.substring(0, 30) || `Empty`}`,
                      }}
                    ></div>
                    <Typography sx={{fontSize : '10px'}}>{moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </List>
      </Grid>
      <Grid item xs={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
}

export default NodeList;
