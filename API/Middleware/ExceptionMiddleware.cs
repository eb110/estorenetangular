using System.Net;
using System.Text.Json;
using API.Errors;

namespace API.Middleware
{
    //handle server error => add to program cs
    public class ExceptionMiddleware
    {
        //it can process the http request
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;        
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                //if no exception -> move to the next stage of request
                await _next(context);
            }
            catch(Exception ex)
            {
                //display exception to the console
                _logger.LogError(ex, ex.Message);
                //we want to sent the ex to the client => JSON!
                context.Response.ContentType = "application/json";
                //set the status code
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var response = _env.IsDevelopment() 
                    ?
                    //dev 
                    new ApiException((int)HttpStatusCode.InternalServerError, ex.Message, ex.StackTrace.ToString()) 
                    :
                    //prod
                    new ApiException((int)HttpStatusCode.InternalServerError);

                    //serializer to camel case
                    var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                    //to json
                    var json = JsonSerializer.Serialize(response, options);

                    //update response
                    await context.Response.WriteAsync(json);
            }
        }
    }
}