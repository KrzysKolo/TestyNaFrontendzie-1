import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { CommentFormState, NewCommentForm } from "../molecules/NewCommentForm";
import { getComments } from "../api/api";
import { Comment } from "../types/Comment";
import Loader from "../atoms/Loader";

type CommentsWrapperProps = {
  productId: string;
};
const CommentsWrapper = ({ productId }: CommentsWrapperProps): JSX.Element => {
  const { t } = useTranslation();
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getComments(productId);
        setComments(data as Comment[]);
      } catch (e) {
        setError(true);
      }
    };

    fetch();
  }, []);

  if (error)
    return (
      <div>
        {t(
          "Something wrong happened with comments feature. Please try again later."
        )}
      </div>
    );

  if (!comments) {
    return <Loader />;
  }

  return <Comments comments={comments} />;
};
type CommentsProps = {
  comments: Comment[];
};
const Comments = ({ comments }: CommentsProps): JSX.Element => {
  const { t } = useTranslation();
  const [showAddNewCommentBox, setShowAddNewCommentBox] =
    useState<boolean>(false);

  const onSubmit = (commentForm: CommentFormState) => {
    // setComments([
    //   ...comments,
    //   {
    //     id: `${comments.length + 1}`,
    //     productId,
    //     comment: commentForm.comment,
    //     owner: commentForm.userName,
    //     date: format(new Date(), "yyyy-MM-dd HH:mm"),
    //   },
    // ]);
    setShowAddNewCommentBox(false);
  };

  return (
    <div>
      <CommentsContainer>
        {comments.length === 0 ? (
          <div>{t("No comments yet")}</div>
        ) : (
          comments.map((comment) => {
            return (
              <div key={comment.id}>
                <CommentHeader>
                  <OwnerName>{comment.owner}</OwnerName>
                  <CommentDate>{comment.date}</CommentDate>
                </CommentHeader>
                <CommentBox>{comment.comment}</CommentBox>
              </div>
            );
          })
        )}
      </CommentsContainer>
      {showAddNewCommentBox ? (
        <NewCommentForm submit={onSubmit} />
      ) : (
        <button type="button" onClick={() => setShowAddNewCommentBox(true)}>
          {t("Add a new comment")}
        </button>
      )}
    </div>
  );
};

const CommentsContainer = styled.div`
  & > div {
    margin-bottom: 20px;
  }
`;

const CommentBox = styled.div`
  padding: 20px 10px;
  outline: 1px solid #000;
  outline-offset: -1px;
`;

const CommentHeader = styled.div`
  padding: 5px 10px;
  display: flex;
  height: 30px;
  background: #9ab4bf;
  border: 1px solid #a8bee3;
`;

const OwnerName = styled.div`
  color: black;
  font-weight: bold;
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const CommentDate = styled.div`
  font-size: 0.8em;
  color: #000000;
`;

export { CommentsWrapper };
