import { Post, PostsService } from './posts.service';


describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };


  beforeEach(async () => {
    postsService = new PostsService();


    postsService.create({ text: 'Some pre-existing post' });
  });


  it('should add a new post', () => {
    postsService.create(post);
    const allPosts = postsService.getAll();
    expect(allPosts.length).toBe(2); // был один "pre-existing", плюс новый
    expect(allPosts[1].text).toBe(post.text);
  });


  it('should find a post', () => {
    const createdPost = postsService.create(post);
    const foundPost = postsService.findById(createdPost.id);
    expect(foundPost).toEqual(createdPost);
    expect(foundPost.text).toBe(post.text);
  });
});