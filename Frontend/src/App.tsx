import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import './index.css'

export default function App() {
  return <div>
    <RouterProvider router={router} />
  </div>;
}
