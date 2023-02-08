import { GraphQLScalarType } from 'graphql'

import { AuthorModel, NotifcationModel, folderModel,noteModel } from "../models/index.js";

import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();


export const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),
  Query: {
   
    folders: async (parent, args, context) => {
      console.log(context.uid);
      const folders = await folderModel.find({
        authorId: context.uid,
      }).sort({
        updatedAt : 'desc'
      });
      return folders;
    },
    folder: async (parent, agrs) => {
      const folderId = agrs.folderId;
      const foundFolder = await folderModel.findOne({
        _id: folderId,
      });
      return foundFolder;
    },
    note: async (parent, args) => {
      const noteId = args.noteId;
      const note = await noteModel.findOne({_id : noteId})
      return note;
    },
  },

  Folder: {
    author: async (parent, args, context, info) => {
      const authorId = parent.authorId;
      const author = await AuthorModel.findOne({ uid: authorId });
      return author;
    },

    notes: async (parent, args) => {
      const notes = await noteModel.find({
        folderId : parent.id
      }).sort({
        updatedAt : 'desc'
      });
      return notes;
    },
  },

  Mutation: {
    
    register: async (parent, args) => {
      const foundUser = await AuthorModel.findOne({ uid: args.uid });
      if (!foundUser) {
        const newUser = new AuthorModel(args);

        await newUser.save();
        return newUser;
      }
      console.log(foundUser);
      return foundUser;
    },
    updateNote : async (parent,args) => {
      console.log(args);
      const noteId = args.id;
      const note = await noteModel.findByIdAndUpdate(noteId,args);

      return note;
    },
    addFolder: async (parent, args, context) => {
      const newFolder = new folderModel({ ...args, authorId: context.uid });
      pubsub.publish('FOLDER_CREATED',{
        folderCreated : {
          message : 'A new folder created'
        }
      })
      await newFolder.save();
      return newFolder;
    },
    addNote : async (parent, args) => {
        const newNote = new noteModel(args);
        await newNote.save();

        return newNote;
    },
    pushNotification : async (parent,args) => {
      const newNotification = new NotifcationModel(args)
      pubsub.publish('PUSH_NOTIFICATION',{
        notification : {
          message : args.content
        }
      })
      await newNotification.save();
      
      return {message : 'SUCCESS'}
    }
  },
  Subscription: {
    folderCreated :  {
      subscribe : () => pubsub.asyncIterator(['FOLDER_CREATED'])
    },
    notification: {
      subscribe : () => pubsub.asyncIterator(['PUSH_NOTIFICATION'])
    }
  },
};
