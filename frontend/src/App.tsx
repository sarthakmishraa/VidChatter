import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Posts } from "./pages/posts/posts";
import { CreatePost } from "./pages/posts/createPost";
import { EditPost } from "./pages/posts/editPost";
import { NotFound } from "./pages/notFound";
import { Login } from "./pages/login";
import { Navbar } from "./components/Navbar";
import { store } from "./app/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/createPost" element={<CreatePost />} />
          <Route path="/posts/editPost" element={<EditPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </Router>
  );
};

export default App;