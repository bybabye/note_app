export const typeDefs = `#graphql 
    scalar Date

    type Folder {
        id : String,
        name : String,
        createdAt : String,
        author : Author,
        notes : [Note]
    }
    type Author {
        uid : String!,
        name : String!,
    }

    type Query {  
        folders : [Folder],
        folder(folderId: String) : Folder
        note(noteId: String) : Note
    }
    type Note {
        id : String!,
        content : String,
        updatedAt : Date,
    }
    type Mutation {
        addFolder(name: String!) : Folder,
        register(uid: String!,name: String!) : Author
        addNote(content : String!,folderId : ID!) : Note,
        updateNote(id : String!,content: String!) : Note,
        pushNotification(content : String) : Message

    }

    type Message {
        message : String
    }
    type Subscription {
        folderCreated : Message
        notification : Message
    }
`;
