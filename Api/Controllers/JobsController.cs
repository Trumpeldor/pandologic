using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly ILogger<JobsController> _logger;
        private static readonly List<Jobs> _jobs;

        static JobsController()
        {
            _jobs = new List<Jobs>();
            var today = DateTime.Now.Date;
            Random rnd = new Random();
            for (var i = -365; i <= 0; i++)
            {
                _jobs.Add(new Jobs
                {
                    Date = today.AddDays(i),
                    JobViews = rnd.Next(1000),
                    PredictedJobViews = rnd.Next(500),
                    ActiveJobs = rnd.Next(100)
                });
            }
        }

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
                return Enumerable.Empty<Jobs>();
            }

            int min = FindIndex(start, 0);
            int max = FindIndex(end, _jobs.Count - 1);

            return Enumerable.Range(min, max - min + 1).Select(index => _jobs[index]).ToArray();
        }
    }
}
