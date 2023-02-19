import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"
import {QueryClientProvider, QueryClient} from "react-query"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Bgd from "./pages/Bgd";
import Rqm from "./pages/Rqm";
import Bgs from "./pages/Bgs";
import "./style.scss"

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

const router = createBrowserRouter([
  {
      path:'/',
      element:<Layout/>,
      children:[
        {
          path:'/',
          element:<Home/>
        },
        {
          path:'/Rqm',
          element:<Rqm/>
        },
        {
          path:'/bgd',
          element:<Bgd/>
        },
        {
          path:'/bgs',
          element:<Bgs/>
        },
      ]
    },
]
) 

const queryClient = new QueryClient()

function App() {
  return (
  <QueryClientProvider client={queryClient}>
    <div className="App">
      <div className="container">
        <RouterProvider router={router}/>
      </div>
    </div>
  </QueryClientProvider>
  );
}

export default App;
