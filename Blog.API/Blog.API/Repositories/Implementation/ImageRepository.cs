using Blog.API.Data;
using Blog.API.Models.Domain;
using Blog.API.Repositories.Interface;
using Microsoft.EntityFrameworkCore;

namespace Blog.API.Repositories.Implementation
{
    public class ImageRepository : IImageRepository
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor;
        private readonly ApplicationDbContext dbContext;

        public ImageRepository(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor, ApplicationDbContext dbContext)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.httpContextAccessor = httpContextAccessor;
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<PostImage>> GetAll()
        {
            return await dbContext.PostImages.ToListAsync();
        }

        public async Task<PostImage> Upload(IFormFile file, PostImage postImage)
        {
            var localPath = Path.Combine(webHostEnvironment.ContentRootPath, "Images", $"{postImage.FileName}{postImage.FileExtension}");
            using var stream = new FileStream(localPath, FileMode.Create);
            await file.CopyToAsync(stream);

            var httpRequest = httpContextAccessor.HttpContext.Request;
            var urlPath = $"{httpRequest.Scheme}://{httpRequest.Host}{httpRequest.PathBase}/Images/{postImage.FileName}{postImage.FileExtension}";

            postImage.Url = urlPath;

            dbContext.PostImages.AddAsync(postImage);
            await dbContext.SaveChangesAsync();

            return postImage;
        }
    }
}
