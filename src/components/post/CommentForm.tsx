import { useContext, useState } from "react";
import { addComment, AddComment } from "../../queries/commentQueries";
import { useQueryClient, useMutation } from "react-query";
import { UserContext } from "@/hooks/UserContext";
import Image from "next/image";

type Props = {
  postId: string;
};

const CommentForm = ({ postId }: Props) => {
  const { user } = useContext(UserContext);
  const userId = user?.id;

  const [value, setValue] = useState("");

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    "addComment",
    (data: AddComment) => addComment(data),
    {
      onSuccess: (data) => {
        console.log(data);
        queryClient.invalidateQueries("addComment");
      },
      onError: (error: any) => {
        console.log(error);
      },
    }
  );
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!value) {
      return false;
    }

    if (!userId) {
      return false;
    }

    const data = {
      content: value,
      postId: postId,
      authorId: userId,
    };

    mutate(data);
    setValue("");
  }
  return (
    <form role={"Comment form"} onSubmit={handleSubmit}>
      <div>
        <div className="w-full min-h-min h-auto flex gap-3 items-start justify-center">
          <div className="w-12 h-12 overflow-hidden rounded-full bg-online aspect-square">
            <Image src="/assets/img1.jpg" width={50} height={50} alt={""} />
          </div>
          <div className="w-full h-12 bg-cardColor rounded-md overflow-auto">
            <label htmlFor="comment"></label>
            <input
              name="comment"
              id="comment"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="add a comment..."
              className="basis-1/2 w-full h-full bg-transparent p-2"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
