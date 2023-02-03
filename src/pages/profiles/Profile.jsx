import React, { useEffect, useState } from 'react';
import { useProfileData, useSetProfileData } from '../../contexts/ProfileDataContext';
import { axiosReq } from '../../api/axiosDefaults';
import { useParams } from 'react-router-dom';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Spinner from '../../components/Spinner';
import { fetchMoreData } from '../../utils/utils';
import { Navbar } from '../../components';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProfilePost from './ProfilePost';
import Masonry from 'react-masonry-css';
import MasonryLayout from '../../components/MasonryLayout';


function Profile() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const [post, setPost] = useState({ results: [] });

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
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
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
              <img src={profile?.image} />
              <h2>{profile?.owner}</h2>
              <div><p>{profile?.posts_count}</p></div>
              <div>Posts</div>
              <div><p>{profile?.followers_count}</p></div>
              <div>Followers</div>
              <div><p>{profile?.following_count}</p></div>
              <div>Following</div>
            </div>
            <div>
              {currentUser &&
                !is_owner &&
                (profile?.following_id ? (
                  <button
                    type="button"
                    className="bg-red-400 text-white font-bold p-2 rounded-full w-28 outline-none"
                  >
                    unfollow
                  </button>
                ) : (
                  <button
                    type="button"
                    className="bg-red-400 text-white font-bold p-2 rounded-full w-28 outline-none"
                  >
                    follow
                  </button>
                ))}
            </div>
          </div>
          {profile?.content && <col className="p-3">{profile.content}</col>}
        </div>
      </div>
    </>
  );

  const mainProfilePosts = (
    <>
      <p className="text-center">{profile?.owner}'s images</p>
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
      <div>
        {hasLoaded ? (
          <>
            {mainProfile}
            {mainProfilePosts}
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  )
}

export default Profile