using Blog.API.Models.Domain;
using System.Net;

namespace Blog.API.Repositories.Interface
{
    public interface IImageRepository
    {
        Task<PostImage> Upload(IFormFile file, PostImage postImage);
        Task<IEnumerable<PostImage>> GetAll();
    }
}
