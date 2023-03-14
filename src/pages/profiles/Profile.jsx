import React, { useEffect, useState } from 'react';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';
import { axiosReq } from '../../api/axiosDefaults';
import { useNavigate, useParams } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Spinner from '../../components/Spinner';
import { fetchMoreData } from '../../utils/utils';
import { Navbar } from '../../components';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProfilePost from './ProfilePost';
import { AiOutlineUser, AiOutlineIdcard } from 'react-icons/ai';
import { MdOutlinePassword } from 'react-icons/md';



function Profile() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });

  const navigate = useNavigate();

  const currentUser = useCurrentUser();
  const { id } = useParams();

  const { setProfileData } = useSetProfileData();
  const { pageProfile } = useProfileData();

  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  const { handleFollow, handleUnfollow } = useSetProfileData();

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
        setHasLoaded(true);
      } catch (err) {

      }
    };
    fetchData();
  }, [id, setProfileData]);


  const mainProfile = (
    <>
      {profile?.is_owner}
      <div className='relative pb-2 h-full justify-center items-center'>
        <div className='flex flex-col pb-5'>
          <div className='relative flex flex-col mb-7'>
            <div className='flex flex-col justify-center items-center'>
              <img
                className='w-full h-370 2xl:h-510 shadow-lg object-cover'
                src='https://images.wallpaperscraft.com/image/single/forest_trees_fog_769304_1600x900.jpg'
                alt='user-background'
              />
              <img
                className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
                src={profile?.image}
                alt='profile'
              />
              <h1 className='font-bold text-3xl text-center mt-3'>{profile?.owner}</h1>
              {is_owner && (
              <div className='flex items-center justify-center gap-10 pt-2'>
                <div className='flex flex-col items-center'>
                  <AiOutlineIdcard 
                    className='cursor-pointer'
                    fontSize={34}
                    onClick={() => navigate(`/profiles/${id}/edit`)}
                  />
                  <p>Edit Profile</p>
                </div>
                <div className='flex flex-col items-center'>
                  <AiOutlineUser
                    className='cursor-pointer'
                    fontSize={34}
                    onClick={() => navigate(`/profiles/${id}/edit/username`)}
                  />
                  <p>Change Username</p>
                </div>
                <div className='flex flex-col items-center'>
                  <MdOutlinePassword
                    className='cursor-pointer'
                    fontSize={34}
                    onClick={() => navigate(`/profiles/${id}/edit/password`)}
                    />
                  <p>Change Password</p>
                </div>
              </div>
              )}
              <p className='mt-3'>{profile?.posts_count} Posts</p>
              <p>{profile?.followers_count} Followers</p>
              <p>{profile?.following_count} Following</p>
            </div>
            <div className='text-center mb-7 mt-7'>
              {currentUser &&
                !is_owner &&
                (profile?.following_id ? (
                  <button
                    type="button"
                    className="bg-red-400 hover:bg-red-300 text-white font-bold p-2 rounded-full w-28 outline-none"
                    onClick={() => handleUnfollow(profile)}
                  >
                    unfollow
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-red-400 hover:bg-red-300 text-white font-bold p-2 rounded-full w-28 outline-none"
                    onClick={() => handleFollow(profile)}
                  >
                    follow
                  </button>
                ))}
            </div>
          </div>
          {profile?.content && <div className="p-3">{profile.content}</div>}
        </div>
      </div>
    </>
  );

  const mainProfilePosts = (
    <>
      {profilePosts.results.length ? (
        <InfiniteScroll
          children={profilePosts.results.map((post) => (
            <ProfilePost key={post.id} {...post} setPosts={setProfilePosts} className='w-max' />
          ))}
          dataLength={profilePosts.results.length}
          loader={<Spinner />}
          hasMore={!!profilePosts.next}
          next={() => fetchMoreData(profilePosts, setProfilePosts)}
        />
      ) : (
        <Spinner
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (

    <div>
      <Navbar />

      {hasLoaded ? (
        <>
          {mainProfile}
          {mainProfilePosts}
        </>
      ) : (
        <Spinner />
      )}
    </div>

  )
}

export default Profile