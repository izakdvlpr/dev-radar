import React from 'react';

import { Web } from './styles';

type Params = {
  route: {
    github_username: string;
  }
}

const Profile: React.FC<Params> = ({ route }) => {  
  return (
    <Web source={{ uri: `https://github.com/${route.params.github_username}` }} />
  );
};

export default Profile;
