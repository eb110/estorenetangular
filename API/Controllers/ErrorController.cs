using API.Errors;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("errors/{code}")]
    //the swagger requires at least one get request within controller
    //as there is no chance to create this type of request we have to 
    //inform the swagger about it
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : BaseApiController
    {
        public ActionResult Error(int code)
        {
            return new ObjectResult(new ApiResponse(code));
        }
    }
}