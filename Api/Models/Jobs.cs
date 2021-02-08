using System;

namespace Api.Models
{
    public class Jobs
    {
        public DateTime Date { get; set; }

        public int JobViews { get; set; }

        public int PredictedJobViews { get; set; }

        public int ActiveJobs { get; set; }
    }
}
