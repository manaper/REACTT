using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
 {
      [HttpGet]
      public async Task<ActionResult<List<Activity>>> GetActivites()
      {
       return await Mediator.Send(new List.Query());
      }  

      [HttpGet("{id}")]
      public async Task<ActionResult<Activity>> GetActivity(Guid id)
      {
        return await Mediator.Send(new Details.Query{Id=id});
      }
      [HttpPost]
      public async Task<IActionResult> CreateActivities(Activity activity){
        return Ok(await Mediator.Send(new Create.Command{Activity = activity}));

      }
      [HttpPut("{id}")]
      public async Task<IActionResult> EditActivities(Guid id, Activity activity){
        activity.Id = id;
        return Ok(await Mediator.Send(new Edit.Command{Activity = activity}));
      }

      [HttpDelete("{id}")]
      public async Task<IActionResult> DeleteActivities(Guid id)
      {
        return Ok(Mediator.Send(new Delete.Command{Id=id}));
      }
      
    }
}