import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import AuthProvider from "../context/AuthProvider";
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";
import NodeList from "../components/NodeList";
import Node from "../components/Node";
import { addNewNote, nodeLoader, nodesLoader, updateNote } from "../utils/noteUtils";
import { folderLoader } from "../utils/folderUtils";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Login />,
        path: "/login",
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <Home />,
            path: "/",
            loader: folderLoader,
            children: [
              {
                element: <NodeList />,
                path: `folders/:folderId`,
                action : addNewNote,
                loader: nodesLoader,
                children: [
                  {
                    element: <Node />,
                    action : updateNote,
                    path: `note/:noteId`,
                    loader : nodeLoader
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
