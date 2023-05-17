import { formatDistanceToNow } from "date-fns";

type Props = {
  createdAt: Date | number | string | undefined;
};

const PostedAgo = ({ createdAt }: Props) => {
  if (!createdAt) {
    return null;
  }

  const parsedDate = new Date(createdAt);
  const formattedDate = formatDistanceToNow(parsedDate, { addSuffix: true });

  return <>{formattedDate}</>;
};

export default PostedAgo;
