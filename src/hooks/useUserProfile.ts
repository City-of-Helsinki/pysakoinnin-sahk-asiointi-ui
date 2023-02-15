import { getClient } from '../client/oidc-react';
import { getProfileData, ProfileQueryResult } from '../profile/profile';
import { useEffect, useState } from 'react';
import { GraphQLClientError } from '../graphql/graphqlClient';
import { UserProfile } from '../common';

const useUserProfile = () => {
  const client = getClient();
  const user = client.getUserProfile();
  const [profile, setProfile] = useState<UserProfile | Error | undefined>(
    undefined
  );

  // listen to user and fetch the profile if a user is found
  useEffect(() => {
    const fetchProfile = async () => {
      const apiAccessToken = await client.getApiAccessToken({
        audience: window._env_.REACT_APP_PROFILE_AUDIENCE,
        permission: window._env_.REACT_APP_API_BACKEND_PERMISSION,
        grantType: window._env_.REACT_APP_API_BACKEND_GRANT_TYPE
      });
      const result = await getProfileData(
        Object.values(apiAccessToken)[0] as string
      );
      if ((result as GraphQLClientError).error) {
        sessionStorage.setItem('promptLogin', 'true');
      } else {
        sessionStorage.setItem('promptLogin', 'false');
        setProfile((result as ProfileQueryResult).data.myProfile);
      }
    };

    if (user) {
      fetchProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return profile;
};

export default useUserProfile;
