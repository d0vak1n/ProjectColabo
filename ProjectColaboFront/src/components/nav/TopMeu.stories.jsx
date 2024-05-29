import * as React from "react";
import TopMenu from "./TopMenu";
import MessageIcon from "./menucomponents/MessageIcon";

export default {
    title: 'TopMenuBar',
    component: TopMenu,
  };

export const TopMenuStory = () => <TopMenu />;

export const MessageIconStory = () => <MessageIcon />;