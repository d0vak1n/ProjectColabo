import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Home from "./views/home/Home";
import Profile from "./views/profile/Profile";

export default {
    title: 'Views'
  };

export const HomeStory = () => <Home />;
export const ProfileStory = () => <Profile />;
export const LoginStory = () => <Login />;
export const RegisterStory = () => <Register />;