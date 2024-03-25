const {ERROR_MESSAGE_COMMON} = require("#avada/functions/const/index.js");

/**
 * TaskTwo
 * @param {{id: number; name: string; username: string; email: string; address: {street: string; suite: string; city: string; zipcode: string; geo: {lat: string; lng: string}}; phone: string; website: string; company: {name: string; catchPhrase: string; bs: string;}}[]} users
 * @return {{id: number; name: string; username: string; email: string; address: {street: string; suite: string; city: string; zipcode: string; geo: {lat: string; lng: string}}; phone: string; website: string; company: {name: string; catchPhrase: string; bs: string;}}[]}
 */
function taskTwo(users) {
  if (!users) return ERROR_MESSAGE_COMMON;
  return users;
}

/**
 * TaskThree //refrence as email
 * @param {{users: {id: number; name: string; username: string; email: string; address: {street: string; suite: string; city: string; zipcode: string; geo: {lat: string; lng: string}}; phone: string; website: string; company: {name: string; catchPhrase: string; bs: string;}}[]; posts: {userId: number; id: number; title: string; body: string;}[]; comments: {postId: number; id: number; name: string; email: string; body: string;}[]}} data
 * @return {{id: number; name: string; username: string; email: string; comments: {postId: number; id: number; name: string; email: string; body: string;}[]; posts: {userId: number; id: number; title: string; body: string;}[]}[]}
 */
function taskThree(data) {
  if (!data.users || !data.posts || !data.comments) return ERROR_MESSAGE_COMMON;

  //Map array of users to assigned properties user's posts and user's comments
  data.users.map((user) => {
    // FIXME: Refactor-V1
    const commentUser = data.comments.filter((comment) => comment.email === user.email);
    const postComment = data.posts.filter((post) => commentUser.postId === post.id)
    user.posts = postComment;
    user.comments = commentUser;
  });
  return data.users;
}

/**
 * TaskFour
 * @param  {{id: number; name: string; username: string; email: string; comments: {postId: number; id: number; name: string; email: string; body: string;}[]; posts: {userId: number; id: number; title: string; body: string;}[]}[]} users
 * @return {{id: number; name: string; username: string; email: string; comments: {postId: number; id: number; name: string; email: string; body: string;}[]; posts: {userId: number; id: number; title: string; body: string;}[]}[]}
 */
function taskFour(users) {
  if (!users) return ERROR_MESSAGE_COMMON;
  return users.filter((user) => user.comments.length > 3);
}

/**
 * TaskFive
 * @param  {{id: number; name: string; username: string; email: string; comments: {postId: number; id: number; name: string; email: string; body: string;}[]; posts: {userId: number; id: number; title: string; body: string;}[]}[]} users
 * @return {{id: number; name: string; username: string; email: string; comments: {postId: number; id: number; name: string; email: string; body: string;}[]; posts: {userId: number; id: number; title: string; body: string;}[]; commentsCount: number; postsCount: number}[]}
 */
function taskFive(users) {
  if (!users) return ERROR_MESSAGE_COMMON;
  return users.map((user) => {
    user.postsCount = user.posts.length;
    user.commentsCount = user.comments.length;
  });
}

/**
 * TaskSix
 * @param  {{id: number; name: string; username: string; email: string; comments: {postId: number; id: number; name: string; email: string; body: string;}[]; posts: {userId: number; id: number; title: string; body: string;}[]}[]} users
 * @param  {string} type
 * @return {{id: number; name: string; username: string; email: string; comments: {postId: number; id: number; name: string; email: string; body: string;}[]; posts: {userId: number; id: number; title: string; body: string;}[]; commentsCount: number; postsCount: number}}
 */
function taskSix(users, type = "comments") {
  if (!users) return ERROR_MESSAGE_COMMON;
  let result; 
  // FIXME: Refactor-V1
  result = users.reduce((acc, curr) => {
    const currentCount = type === "comments" ? curr.comments.length : curr.posts.length;
    const accumulationCount = acc ? acc.count : 0;
    if (currentCount > accumulationCount) {
      return { user: curr, count: currentCount };
    } else {
      return accumulationCount;
    }
  }, null)
  return result;
}

/**
 * TaskSeven
 * @param  {{id: number; name: string; username: string; email: string; comments: {postId: number; id: number; name: string; email: string; body: string;}[]; posts: {userId: number; id: number; title: string; body: string;}[]}[]} users
 * @return {{id: number; name: string; username: string; email: string; comments: {postId: number; id: number; name: string; email: string; body: string;}[]; posts: {userId: number; id: number; title: string; body: string;}[]; commentsCount: number; postsCount: number}[]}
 */
function taskSeven(users) {
  if (!users) return ERROR_MESSAGE_COMMON;
  return users.sort((prev, curr) => curr.postsCount - prev.postsCount);
}

/**
 * TaskEight
 * @param  {{userId: number; id: number; title: string; body: string;}} post
 * @param  {{postId: number; id: number; name: string; email: string; body: string;}} comment
 * @return {{postId: number; id: number; name: string; email: string; body: string; comments: {postId: number; id: number; name: string; email: string; body: string;}[]}}
 */
function taskEight(post, comments) {
  if (!post || !comments) return ERROR_MESSAGE_COMMON;
  post.comments = comments;
  return post;
}
module.exports = {
  taskTwo,
  taskThree,
  taskFour,
  taskFive,
  taskSix,
  taskSeven,
  taskEight
}
