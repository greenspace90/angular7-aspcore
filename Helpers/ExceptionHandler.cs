using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using angular7_aspcore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace angular7_aspcore.Helpers {
    public class ExceptionHandler

    {
        private readonly RequestDelegate _next;

        public ExceptionHandler (RequestDelegate next) {
            _next = next;
        }

        public async Task Invoke (HttpContext context) {
            try {
                await _next.Invoke (context);
            } catch (Exception ex) {
                await HandleExceptionAsync (context, ex);
            }
        }

        private async Task HandleExceptionAsync (HttpContext context, Exception exception) {
            var response = context.Response;
            response.ContentType = "application/json";
            response.StatusCode = (int) HttpStatusCode.InternalServerError;
            await response.WriteAsync (JsonConvert.SerializeObject (new {
                // customize as you need
                error = new {
                    message = exception.Message,
                    exception = exception.GetType ().Name
                }
            }));
        }
    }
}