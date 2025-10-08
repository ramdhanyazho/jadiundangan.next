import crypto from 'node:crypto';

type InvitationComment = {
  uuid: string;
  own: string;
  name: string;
  presence: boolean;
  comment: string | null;
  created_at: string;
  is_admin: boolean;
  is_parent: boolean;
  gif_url: string | null;
  ip: string | null;
  user_agent: string | null;
  comments: InvitationComment[];
  like_count: number;
};

type CreateCommentPayload = {
  name: string;
  presence: boolean;
  comment: string | null;
};

const comments: InvitationComment[] = [];
const commentMap = new Map<string, InvitationComment>();
const likeMap = new Map<string, string>();
const commentLikes = new Map<string, Set<string>>();

const formatDate = () => {
  return new Intl.DateTimeFormat('id-ID', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(new Date());
};

const getLikeCount = (uuid: string) => commentLikes.get(uuid)?.size ?? 0;

const withFreshLikeCount = (comment: InvitationComment): InvitationComment => ({
  ...comment,
  like_count: getLikeCount(comment.uuid),
  comments: comment.comments.map(withFreshLikeCount),
});

export const invitationStore = {
  list(offset: number, limit: number) {
    const slice = comments.slice(offset, offset + limit).map(withFreshLikeCount);
    return {
      count: comments.length,
      lists: slice,
    };
  },
  create({ name, presence, comment }: CreateCommentPayload) {
    const uuid = crypto.randomUUID();
    const own = crypto.randomUUID();
    const entry: InvitationComment = {
      uuid,
      own,
      name,
      presence,
      comment,
      created_at: formatDate(),
      is_admin: false,
      is_parent: true,
      gif_url: null,
      ip: null,
      user_agent: null,
      comments: [],
      like_count: 0,
    };

    comments.unshift(entry);
    commentMap.set(uuid, entry);
    return withFreshLikeCount(entry);
  },
  addLike(commentId: string) {
    const comment = commentMap.get(commentId);
    if (!comment) {
      return null;
    }

    const uuid = crypto.randomUUID();
    likeMap.set(uuid, commentId);

    const likes = commentLikes.get(commentId) ?? new Set<string>();
    likes.add(uuid);
    commentLikes.set(commentId, likes);
    return { uuid };
  },
  removeLike(likeId: string) {
    const commentId = likeMap.get(likeId);
    if (!commentId) {
      return false;
    }

    likeMap.delete(likeId);
    const likes = commentLikes.get(commentId);
    if (likes) {
      likes.delete(likeId);
      if (likes.size === 0) {
        commentLikes.delete(commentId);
      }
    }

    return true;
  },
};
