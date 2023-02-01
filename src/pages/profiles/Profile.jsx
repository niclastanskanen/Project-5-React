import React, { useEffect, useState } from 'react';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';
import { axiosReq } from '../../api/axiosDefaults';
import { useParams } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Spinner from '../../components/Spinner';
import { fetchMoreData } from '../../utils/utils';
import { Navbar } from '../../components';


function Profile() {

  const [profilePosts, setProfilePosts] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setProfileData } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profilePosts }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/posts/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfilePosts(profilePosts);
      } catch (err) {
        // console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      {profile?.is_owner}
      <div>
      <img  src={profile?.image} />
      <h3>{profile?.owner}</h3>
      <p>{profile?.posts_count}</p>
      <p>{profile?.followers_count}</p>
      <p>{profile?.following_count}</p>
      <div lg={3} className="text-lg-right">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <button
                className=''

              >
                unfollow
              </button>
            ) : (
              <button
                className=''

              >
                follow
              </button>
            ))}
        </div>
      </div>
    </>
  );

  const mainProfilePosts = (
    <>
      <p>{profile?.owner}</p>
      <hr />
    </>
  )

  return (

    <div>
          <Navbar />
        {profile?.content && <col className="p-3">{profile.content}</col>}
        {mainProfile}
        {mainProfilePosts}
    </div>
  )
}

export default Profile