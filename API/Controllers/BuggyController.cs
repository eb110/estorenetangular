using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _storeContext;

        public BuggyController(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var item = _storeContext.Products.Find(42);
            if(item == null)
            return NotFound(new ApiResponse(404));

            return Ok(item);
        }

        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            var item = _storeContext.Products.Find(42);
            //trigger exception
            var itemToReturn = item.ToString();

            return Ok(itemToReturn);
        }

        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("badrequest/{id}")]
        public ActionResult GetNotFoundRequest(int id)
        {
            return Ok();
        }
    }
}