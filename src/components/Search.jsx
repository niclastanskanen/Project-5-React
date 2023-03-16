import React, { useEffect, useState } from 'react';
import { axiosReq } from '../api/axiosDefaults';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useLocation } from "react-router";

import Spinner from './Spinner';
import ProfilePost from '../pages/profiles/ProfilePost';
import { useCurrentUser } from '../contexts/CurrentUserContext';
import { fetchMoreData } from '../utils/utils';

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
        <form
          className=''
          onSubmit={(event) => event.preventDefault()}
        >
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mt-1 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
            placeholder="Search Image"
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
              <div className='pt-10'>
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