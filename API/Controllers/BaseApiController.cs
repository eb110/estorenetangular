using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController] //overriden in program cs to provide better error chandling
    [Route("api/[controller]")] //api/products
    public class BaseApiController : ControllerBase
    {

    }
}