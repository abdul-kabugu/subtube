import { useAmplify } from "./useAmplify";
import useAuthenticate from "./useAuthenticate";
import useCreateComment from "./useCreateComment";
import useCreatePost from "./useCreatePosts";
import { useCreateProfile } from "./useCreateProfile";
import useCreateSpace from "./useCreateSpace";
import useDiscoverVideos from "./useDiscoverVideos";
import { useDonate } from "./useDonate";
import useGetPostComments from "./useGetPostComments";
import { useGetUserData } from "./useGetUserData";
import { useGetVideoById } from "./useGetVideoById";
import useReactions from "./useLikePost";
import { UseSubscribe } from "./useSubscribe";
import useTruncateText from "./useTruncateText";

export {
    useAuthenticate, useTruncateText, useCreateSpace, useCreatePost, useDiscoverVideos,
    useGetVideoById, useGetPostComments, useCreateComment, useReactions, UseSubscribe,
    useGetUserData, useAmplify, useCreateProfile, useDonate
}