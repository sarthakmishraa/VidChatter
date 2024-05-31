import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreatePost } from "./pages/posts/createPost";
import { EditPost } from "./pages/posts/editPost";
import { NotFound } from "./pages/notFound";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { store } from "./app/store";
import { Provider } from "react-redux";
import React, { Suspense } from "react";
const Home = React.lazy(() => import("./pages/home").then(({ Home }) => ({ default: Home })));
const Posts = React.lazy(() => import("./pages/posts/posts").then(({ Posts }) => ({ default: Posts })));
const VidMeet = React.lazy(() => import("./pages/vidmeet/vidmeet").then(({ VidMeet }) => ({ default: VidMeet })));
const Login = React.lazy(() => import("./pages/login").then(({ Login }) => ({ default: Login })));

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<h1 className="loadingState">Loading Home...</h1>}>
              <Home />
            </Suspense>
          } />
          <Route path="/login" element={
            <Suspense fallback={<h1 className="loadingState">Loading Login Page...</h1>}>
              <Login />
            </Suspense>
          } />
          <Route path="/posts" element={
            <Suspense fallback={ <h1 className="LoadingState">Loading Posts...</h1> }>
              <Posts />
            </Suspense>
          } />
          <Route path="/posts/createPost" element={<CreatePost />} />
          <Route path="/posts/editPost" element={<EditPost />} />
          <Route path="/vidmeet" element={
            <Suspense fallback={<h1 className="loadingState">Loading VidMeet...</h1>}>
              <VidMeet />
            </Suspense>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Provider>
    </Router>
  );
};

export default App;