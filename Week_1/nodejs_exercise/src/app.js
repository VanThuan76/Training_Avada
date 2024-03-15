const dotenv = require("dotenv");
const tasks = require("#avada/tasks/index.js");
const fetch = require("#avada/functions/helpers/fetch.js");
const {
  taskEight,
  taskFive,
  taskFour,
  taskSeven,
  taskSix,
  taskThree,
  taskTwo,
} = tasks;
const { fetchAsync, fetchAllAsync } = fetch;
dotenv.config();

function main() {
  const test = fetchAsync(`${process.env.NODE_PUBLIC_FAKE_API}/users`);
  test.then((data) => console.log(data));

  const urls = [
    `${process.env.NODE_PUBLIC_FAKE_API}/users`,
    `${process.env.NODE_PUBLIC_FAKE_API}/posts`,
    `${process.env.NODE_PUBLIC_FAKE_API}/comments`,
    `${process.env.NODE_PUBLIC_FAKE_API}/posts/1`,
    `${process.env.NODE_PUBLIC_FAKE_API}/comments?postId=1`,
  ];
  fetchAllAsync(urls) //await
    .then((data) => {
      const [users, posts, comments, postById, commentByPostId] = data;
      taskTwo(users);
      taskThree({ users, posts, comments });
      taskFour(users);
      taskFive(users);
      taskSix(users, "comments");
      taskSeven(users);
      taskEight(postById, commentByPostId);
    })
    .catch((error) => {
      console.error(error);
    });
  return 1;
}
main();
