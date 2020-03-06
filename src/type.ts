export type Topic = {
  title: string;
  description: string;
  authorUid: string;
  authorName: string;
  createdAt: Date;
  id: string;
};

export type TopicComment = {
  content: string;
  authorUid: string;
  authorName: string;
  createdAt: Date;
  id: string;
};
