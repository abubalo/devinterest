import { ComponentType } from "react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

const CommentContainer = <P extends object>(WrappedContainer: ComponentType<P>) => {
  const WithCommentContainer = (props: P & {postId: string}) => ( 
    <div>
      <CommentForm postId={props.postId}/>
      <WrappedContainer {...props} />
    </div>
  );

  return WithCommentContainer;
};

const CommentContainerComponent = CommentContainer(Comments);
export default CommentContainerComponent;
