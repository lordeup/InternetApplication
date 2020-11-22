using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Data.FileManager;
using Server.ViewModels;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileManagerController : ControllerBase
    {
        private readonly IFileManager _fileManager;

        public FileManagerController(IFileManager fileManager)
        {
            _fileManager = fileManager;
        }

        // GET: api/FileManager/:fileName
        [HttpGet("{fileName}")]
        public IActionResult GetImageStreamResult(string fileName)
        {
            try
            {
                return _fileManager.GetImageStreamResult(fileName);
            }
            catch (FileNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // PATCH: api/FileManager/:fileName
        [HttpPatch("{fileName}")]
        [Authorize]
        public async Task<ActionResult<FileViewModel>> UpdateFile(string fileName, [FromForm] IFormFile file)
        {
            try
            {
                _fileManager.DeleteFile(fileName);
                var path = await _fileManager.UploadFile(file);

                return new FileViewModel
                {
                    Path = path
                };
            }
            catch (FileNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // POST: api/FileManager/upload
        [Route("upload")]
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<FileViewModel>> UploadFile([FromForm] IFormFile file)
        {
            try
            {
                var path = await _fileManager.UploadFile(file);

                return new FileViewModel
                {
                    Path = path
                };
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }

        // DELETE: api/FileManager/:path
        [HttpDelete("{path}")]
        [Authorize]
        public ActionResult DeleteFile(string path)
        {
            try
            {
                _fileManager.DeleteFile(path);
                return NoContent();
            }
            catch (FileNotFoundException e)
            {
                return NotFound(new {message = e.Message});
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new {message = e.Message});
            }
        }
    }
}
