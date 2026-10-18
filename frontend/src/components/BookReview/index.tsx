type ReviewProps = {
  text: string;
  author: string;
};

export default function Review({ text, author }: ReviewProps) {
  return (
    <div className="flex rounded items-end ">
      <div className="font-pacifico">{text}</div>
      <div className="font-pacifico">{author}</div>
    </div>
  );
}
