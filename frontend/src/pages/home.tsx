import { Link } from "react-router-dom";

export const Home = () => {
    return(
        <div>
            <h2>Home</h2>
            <Link to="/posts">Posts</Link>
        </div>
    )
};