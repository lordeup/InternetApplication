using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Server.Data.FileManager
{
    public interface IFileManager
    {
        Task<string> UploadFile(IFormFile image);
        void DeleteFile(string path);
    }
}
