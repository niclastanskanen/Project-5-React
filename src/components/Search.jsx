import React, { useEffect, useState } from 'react';
import { axiosReq } from '../api/axiosDefaults';
import Spinner from './Spinner';
import ProfilePost from '../pages/profiles/ProfilePost';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { fetchMoreData } from '../utils/utils';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from "react-router";


function Search({ message, filter = '' }) {
  const [profilePosts, setProfilePosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}search=${query}`);
        setProfilePosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <div className="h-100">
      <div className="py-2 p-0 p-lg-2">
        <i className='fas fa-search' />
        <form
          className=''
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search posts"
          />
        </form>

        {hasLoaded ? (
          <>
            {profilePosts.results.length ? (
              <InfiniteScroll
                children={profilePosts.results.map((post) => (
                  <ProfilePost key={post.id} {...post} setPosts={setProfilePosts} />
                ))}
                dataLength={profilePosts.results.length}
                loader={<Spinner />}
                hasMore={!!profilePosts.next}
                next={() => fetchMoreData(profilePosts, setProfilePosts)}
              />
            ) : (
              <div>
                <Spinner message={message} />
                <p>Can't find any photos</p>
                </div>
            )}
          </>
        ) : (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search