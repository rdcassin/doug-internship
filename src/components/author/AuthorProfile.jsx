import React, { useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

export const AuthorProfile = ({ authorInfo = [] }) => {
  const authorDetails = authorInfo;
  const [followersCount, setFollowersCount] = useState(authorDetails.followers);
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="d_profile de-flex">
      <div className="de-flex-col">
        <div className="profile_avatar">
          <img src={authorDetails.authorImage} alt="" />

          <i className="fa fa-check"></i>
          <div className="profile_name">
            <h4>
              {authorDetails.authorName}
              <span className="profile_username">{`@${authorDetails.tag}`}</span>
              <span id="wallet" className="profile_wallet">
                {authorDetails.address}
              </span>
              <button id="btn_copy" title="Copy Text">
                Copy
              </button>
            </h4>
          </div>
        </div>
      </div>
      <div className="profile_follow de-flex">
        <div className="de-flex-col">
          <div className="profile_follower">{`${followersCount} followers`}</div>
          {isFollowing ? (
            <Link
              to="#"
              className="btn-main"
              onClick={() => {
                setFollowersCount((prevFollowers) => prevFollowers - 1);
                setIsFollowing(false);
              }}
            >
              Unfollow
            </Link>
          ) : (
            <Link
              to="#"
              className="btn-main"
              onClick={() => {
                setFollowersCount((prevFollowers) => prevFollowers + 1);
                setIsFollowing(true);
              }}
            >
              Follow
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export const AuthorProfileSkeleton = () => {
  return (
    <div className="d_profile de-flex">
      <div className="de-flex-col">
        <div className="profile_avatar">
          <Skeleton width="150px" height="150px" borderRadius="50%" />
          <i className="fa fa-check"></i>
          <div className="profile_name">
            <h4>
              <Skeleton width="200px" height="24px" borderRadius="0px" />
              <span className="profile_username">
                <Skeleton width="100px" height="16px" borderRadius="0px" />
              </span>
              <span id="wallet" className="profile_wallet">
                <Skeleton width="250px" height="16px" borderRadius="0px" />
              </span>
            </h4>
          </div>
        </div>
      </div>
      <div className="profile_follow de-flex">
        <div className="de-flex-col">
          <div className="profile_follower"></div>
          <Skeleton width="150px" height="40px" borderRadius="0px" />
        </div>
      </div>
    </div>
  );
};
