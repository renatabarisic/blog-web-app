using Blog.API.Data;
using Blog.API.Models.Domain;
using Blog.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Blog.API.Repositories.Implementation
{
    public class PostRepository : IPostRepository
    {
        private readonly ApplicationDbContext dbContext;

        public PostRepository(ApplicationDbContext dbContext) 
        {
            this.dbContext = dbContext;
        }
        public async Task<Post> CreateAsync(Post post)
        {
            await dbContext.Posts.AddAsync(post);
            await dbContext.SaveChangesAsync();
            return post;
        }

        public async Task<Post?> DeleteAsync(Guid id)
        {
            var existingPost = await dbContext.Posts.FirstOrDefaultAsync(x => x.Id == id);

            if (existingPost is not null)
            {
                dbContext.Posts.Remove(existingPost);
                await dbContext.SaveChangesAsync();
                return existingPost;
            }

            return null;
        }

        public async Task<Post?> EditAsync(Post post)
        {
            var existingPost = await dbContext.Posts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == post.Id);

            if(existingPost is null)
            {
                return null;
            }

            dbContext.Entry(existingPost).CurrentValues.SetValues(post);
            existingPost.Categories = post.Categories;

            await dbContext.SaveChangesAsync();

            return post;
        }

        public async Task<IEnumerable<Post>> GetAllAsync()
        {
            return await dbContext.Posts.Include(x => x.Categories).ToListAsync();
        }

        public async Task<Post?> GetByIdAsync(Guid id)
        {
            return await dbContext.Posts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Post?> GetByUrlHandleAsync(string urlHandle)
        {
            return await dbContext.Posts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.UrlHandle == urlHandle);
        }
    }
}
