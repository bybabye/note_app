import { graphQLRequest } from "./request";

export const nodesLoader = async ({ params: { folderId } }) => {
  const query = `query Folder($folderId: String!) {
      folder(folderId: $folderId) {
        id
        name
        notes {
          content
          id
          updatedAt
        }
      }
    }`;
  const data = await graphQLRequest({
    query,
    variables: {
      folderId,
    },
  });

  return data;
};
export const nodeLoader = async ({ params: { noteId } }) => {
  const query = `query Note($noteId: String) {
        note(noteId: $noteId) {
          content
          id
        }
      }`;

  const data = await graphQLRequest({
    query,
    variables: {
      noteId,
    },
  });

  return data;
};


export const addNewNote = async ({params,request}) => {
  const newNote = await request.formData();

  const formDateObj = {};

  newNote.forEach((value,key) => (formDateObj[key] = value))

  const query = `mutation Mutation($content : String!, $folderId : ID!) {
    addNote(content : $content, folderId : $folderId) {
      id 
      content
    }
  }`

  const  { addNote } = await graphQLRequest({query,variables : formDateObj})


  console.log(addNote);
  return addNote;
}

export const updateNote = async ({params,request}) => {
  const updatedNote = await request.formData();

  const formDateObj = {};

  updatedNote.forEach((value,key) => (formDateObj[key] = value))

  const query = `mutation Mutation($id: String!, $content: String!) {
    updateNote(id: $id, content: $content) {
      id
      content
    }
  }`;

  const  { updateNote } = await graphQLRequest({query,variables : formDateObj})


  console.log(updateNote);
  return updateNote;
}