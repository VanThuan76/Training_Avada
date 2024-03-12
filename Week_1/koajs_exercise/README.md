1. Use this Fake JSON API: https://jsonplaceholder.typicode.com/
2. Get data from all users from API above. You will get a list of 10 users.
3. Get all the posts and comments from the API. Map the data with the users array. The data format should be like this: 
*LOGIC: users has multiple posts and comments, posts has multiple comments and comments has one post
*Eg: users(id = 1) -> comments(id = 5, ...) -> posts(id = 1 which has id comments = 5)
const users = [
  {
    "id": 1,
    ...
    "comments": [
      {
        "id": 5,
        ...
      },
    ],
    "posts": [
      {
        "id": 1,
        ...
      }
    ]
  }
]
4. Filter only users with more than 3 comments.
5. Reformat the data with the count of comments and posts
const users = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "commentsCount": 12,
    "postsCount": 34
  },
]
6. Who is the user with the most comments/posts?
7. Sort the list of users by the postsCount value descending?
8. Get the post with ID of 1 via API request, at the same time get comments for post ID of 1 via another API request. Merge the post data with format:
const post = {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  "comments": [
    {
      "postId": 1,
      "id": 1,
      "name": "id labore ex et quam laborum",
      "email": "Eliseo@gardner.biz",
      "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
    },
    // More comments
  ]
}