import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <h1>Phishing Email Security App</h1>
      <h2>Send your Phishing mail from here</h2>
      <div>To Test it..</div>
      <Link className="nav-link" to="/login">
        Login
      </Link>
    </div>
  );
};
export default Home;
