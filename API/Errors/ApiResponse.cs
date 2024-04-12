namespace API.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statusCode, string message = null)
        {
            StatusCode = statusCode;
            Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        }

        public int StatusCode { get; set; }
        public string Message { get; set; }

        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "a bad request you have made",
                401 => "authorized, you are not",
                404 => "resource found, it was not",
                500 => "errors are the path to the dark side",
                _ => "null"
            };
        }
    }
}