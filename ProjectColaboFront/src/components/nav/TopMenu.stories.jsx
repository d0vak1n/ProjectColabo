import TopMenu from "./TopMenu";
import MessageIcon from "./menuComponents/MessageIcon";
import Notifications from "./menuComponents/Notifications";
import UserBadge from "./menuComponents/UserBadge";
import ShowNavButton from "./menuComponents/ShowNavButton";
import SearchBar from "./menuComponents/SearchBar";

export default {
    title: 'TopMenuBar',
    component: TopMenu,
  };

export const TopMenuStory = () => <TopMenu />;
export const MessageIconStory = () => <MessageIcon />;
export const NotificationsStory = () => <Notifications />;
export const UserBadgeStory = () => <UserBadge />;
export const ShowNavButtonStory = () => <ShowNavButton />;
export const SearchBarStory = () => <SearchBar />;



