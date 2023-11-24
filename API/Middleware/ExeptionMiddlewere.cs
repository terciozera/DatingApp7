using System.Net;
using System.Text.Json;
using API.Erros;

namespace API.Middleware
{
    public class ExeptionMiddlewere
    {
        
        readonly RequestDelegate _next;
        readonly ILogger<ExeptionMiddlewere> _logger;
        readonly IHostEnvironment _env;
        public ExeptionMiddlewere(RequestDelegate next, ILogger<ExeptionMiddlewere> logger, IHostEnvironment env)
        {
            _env = env;
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var responce = _env.IsDevelopment()
                    ? new ApiExeption(context.Response.StatusCode, ex.Message, ex.StackTrace?.ToString())
                    : new ApiExeption(context.Response.StatusCode, ex.Message, "Internal Server Error");

                var options = new JsonSerializerOptions{PropertyNamingPolicy = JsonNamingPolicy.CamelCase};

                var json = JsonSerializer.Serialize(responce, options);

                await context.Response.WriteAsync(json);
            }
        }
    }
}