import logo from './logo.svg';
import './App.css';
import { Box, Typography, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';

function App() {
  const [open, setOpen] = React.useState(false);
  const[ToDos, setToDos] = React.useState([]);
  const[ToDoTitleValue, setToDoTitleValue] = React.useState("")
  const[ToDoBodyValue, setToDoBodyValue] = React.useState("")
  const[Update, setUpdate] = React.useState(false)
  const[SelectedItemIndex, setSelectedItemIndex] = React.useState()

 const onNewToDoClicked = (e) => {
  setOpen(true)

 }
 const handleClose=() => {
  setToDoTitleValue("")
  setToDoBodyValue("")
  setOpen(false)
  setUpdate(false)
 }
 
 const addToDo=() => {
  if(Update){
    setToDos(current=>current.map((ToDo)=>{
      if(ToDos.indexOf(ToDo)===SelectedItemIndex){
        return{...ToDo, Title:ToDoTitleValue, Body:ToDoBodyValue}
      }
    }))
  }
  else{
    setToDos([...ToDos,{Title:ToDoTitleValue, Body:ToDoBodyValue}]);
  }

  setToDoTitleValue("")
  setToDoBodyValue("")
  setOpen(false)
  
 }
 const handleDeleteToDo=(index) => {
  console.log(index)
  var localToDos = [...ToDos]
  localToDos.splice(index, 1)
  setToDos(localToDos)
 }
 const handleUpdateToDo=(index)=> {
  setSelectedItemIndex(index)
  setUpdate(true)
  var localToDos = [...ToDos]
  setOpen(true)
  var foundItem = localToDos[index]
  console.log(foundItem)
  setToDoTitleValue(foundItem.Title)
  setToDoBodyValue(foundItem.Body)
  
 }
 
  return (
    <div className="App">
      <header className="App-header">
        <Box>
          <Typography variant="h2">
            ToDo list
          </Typography>
          <Button variant='contained' color='secondary' onClick={(e)=>{onNewToDoClicked()}}> 
            New ToDo
          </Button>
          <Stack orientation = "column">
            { 
            <List>
              {ToDos.map((ToDo)=>{
                return(
                  < >
                  <ListItem>
                 <ListItemText primary={ToDo.Title} secondary={ToDo.Body} />
                </ListItem>
                <Button variant='contained' color='success' sx={{margin:2}} onClick={()=> {handleUpdateToDo(ToDos.indexOf(ToDo))}}>Update</Button>
                <Button variant='contained' color='error' onClick={()=> {handleDeleteToDo(ToDos.indexOf(ToDo))}} >Delete</Button>
                  </>

                )
            
              })}
          
            </List> }
          </Stack>
        </Box>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New ToDo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="ToDo Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {setToDoTitleValue(e.target.value)}}
            value={ToDoTitleValue}
          />
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="ToDo body"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {setToDoBodyValue(e.target.value)}}
            value={ToDoBodyValue}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addToDo}>{Update? "Update": "Add"}</Button>
        </DialogActions>
      </Dialog>
      </header>
    </div>
  );
}

export default App;
