using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Api.Models;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly ILogger<JobsController> _logger;
        private static readonly List<Jobs> _jobs = JsonSerializer.Deserialize<List<Jobs>>(System.IO.File.ReadAllText("Properties/dataSource.json"));

        public JobsController(ILogger<JobsController> logger)
        {
            _logger = logger;
        }

        private static int FindIndex(DateTime key, int edge)
        {
            int index = _jobs.FindIndex(jobs => jobs.Date == key);
            return index < 0 ? edge : index;
        }

        [EnableCors("AllowOrigin")]
        [HttpGet]
        public IEnumerable<Jobs> Get(DateTime start, DateTime end)
        {
            start = start.Date;
            end = end.Date;

            if (start > end || start > _jobs[^1].Date || end < _jobs[0].Date)
            {
                _logger.LogWarning("No data for: start date = " + start + ", end date = " + end);
                return Enumerable.Empty<Jobs>();
            }

            int min = FindIndex(start, 0);
            int max = FindIndex(end, _jobs.Count - 1);

            var data = Enumerable.Range(min, max - min + 1).Select(index => _jobs[index]).ToArray();
            _logger.LogDebug("Request: start date = " + start + ", end date = " + end + "\n\tJSON Response: " + JsonSerializer.Serialize(data));

            return data;
        }
    }
}
