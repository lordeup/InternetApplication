using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Server.Data.FileManager
{
    public class FileManager : IFileManager
    {
        private readonly string _imagesPath;

        public FileManager(IConfiguration configuration)
        {
            _imagesPath = configuration["Paths:Images"];
        }

        public async Task<string> UploadFile(IFormFile image)
        {
            if (!Directory.Exists(_imagesPath))
            {
                Directory.CreateDirectory(_imagesPath);
            }

            var fileName = Guid.NewGuid() + Path.GetExtension(image.FileName);
            var filePath = Path.Combine(_imagesPath, fileName);

            await using var fileStream = new FileStream(filePath, FileMode.Create);
            await image.CopyToAsync(fileStream);

            return fileName;
        }

        public void DeleteFile(string path)
        {
            var filePath = Path.Combine(_imagesPath, path);

            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }
        }
    }
}
