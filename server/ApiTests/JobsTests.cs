using Api.Controllers;
using Api.Models;
using Microsoft.Extensions.Logging;
using Moq;
using System;
using Xunit;

namespace ApiTests
{
    public class JobsTests
    {
        [Fact]
        public void JobsService_GetJobsSync_With_Dates_InWrongOrder()
        {
            //Arrange
            var start = new DateTime(2021, 2, 5);
            var end = new DateTime(2021, 2, 4);
            var mock = new Mock<ILogger<JobsController>>();

            //Act
            var service = new JobsController(mock.Object);
            var result = service.Get(start, end);

            //Assert
            Assert.Empty(result);
        }

        [Fact]
        public void JobsService_GetJobsSync_With_BothDates_AreTheSame()
        {
            //Arrange
            var start = new DateTime(2020, 1, 17);
            var end = new DateTime(2020, 1, 17);
            var mock = new Mock<ILogger<JobsController>>();

            //Act
            var service = new JobsController(mock.Object);
            var result = service.Get(start, end);

            //Assert
            var arrResult = result as Jobs[];
            Assert.Single(arrResult);
            Assert.Equal(200, arrResult[0].PredictedJobViews);
        }

        [Fact]
        public void JobsService_GetJobsSync_With_BothDates_BeforeRange()
        {
            //Arrange
            var start = new DateTime(2019, 1, 1);
            var end = new DateTime(2019, 2, 5);
            var mock = new Mock<ILogger<JobsController>>();

            //Act
            var service = new JobsController(mock.Object);
            var result = service.Get(start, end);

            //Assert
            Assert.Empty(result);
        }

        [Fact]
        public void JobsService_GetJobsSync_With_StartDate_BeforeRange()
        {
            //Arrange
            var start = new DateTime(1995, 12, 28);
            var end = new DateTime(2020, 1, 1);
            var mock = new Mock<ILogger<JobsController>>();

            //Act
            var service = new JobsController(mock.Object);
            var result = service.Get(start, end);

            //Assert
            var arrResult = result as Jobs[];
            Assert.Single(arrResult);
            Assert.Equal(15, arrResult[0].ActiveJobs);
        }

        [Fact]
        public void JobsService_GetJobsSync_With_BothDates_InRange()
        {
            //Arrange
            var start = new DateTime(2021, 2, 4);
            var end = new DateTime(2021, 2, 5);
            var mock = new Mock<ILogger<JobsController>>();

            //Act
            var service = new JobsController(mock.Object);
            var result = service.Get(start, end);

            //Assert
            var arrResult = result as Jobs[];
            Assert.NotNull(arrResult);
            Assert.Equal(2, arrResult.Length);
            Assert.Equal(738, arrResult[0].JobViews);
            Assert.Equal(365, arrResult[1].PredictedJobViews);
        }

        [Fact]
        public void JobsService_GetJobsSync_With_BothDates_AfterRange()
        {
            //Arrange
            var start = new DateTime(2022, 2, 4);
            var end = new DateTime(2022, 2, 5);
            var mock = new Mock<ILogger<JobsController>>();

            //Act
            var service = new JobsController(mock.Object);
            var result = service.Get(start, end);

            //Assert
            Assert.Empty(result);
        }

        [Fact]
        public void JobsService_GetJobsSync_With_EndDate_AfterRange()
        {
            //Arrange
            var start = new DateTime(2021, 2, 10);
            var end = new DateTime(2030, 1, 1);
            var mock = new Mock<ILogger<JobsController>>();

            //Act
            var service = new JobsController(mock.Object);
            var result = service.Get(start, end);

            //Assert
            var arrResult = result as Jobs[];
            Assert.Single(arrResult);
            Assert.Equal(403, arrResult[0].JobViews);
        }
    }
}
