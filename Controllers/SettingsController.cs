using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using angular7_aspcore.Models;
using DTO = angular7_aspcore.Models.DTOs;
using AutoMapper;

namespace contact_app.Controllers
{
    // set route attribute to make request as 'api/contact'  
    [Route("api/[controller]")]  
    public class SettingsController: Controller {  
        private readonly ContactAppContext _context; 
        private readonly IMapper _mapper; 
        // initiate database context  
        public SettingsController(ContactAppContext context, IMapper mapper) {  
                _context = context;
                _mapper = mapper;  
            }

        [HttpGet]  
        [Route("getSettings")]  
        public IActionResult Get() {  
                // fetch all contact records  
                return new ObjectResult(_context.Settings.First());  
            }
        [HttpPut]  
        [Route("updateSettings")]  
        public IActionResult Update([FromBody] Settings updates) {  
                // set bad request if contact data is not provided in body  
                if (updates == null) {  
                    return BadRequest();  
                }  
                var settings = _context.Settings.FirstOrDefault();  
                if (settings == null) {  
                    return NotFound();  
                }  
                _mapper.Map(updates, settings);
                _context.Settings.Update(settings);  
                _context.SaveChanges();  
                return Ok(new {  
                    message = "Settings are updated successfully."  
                });  
            } 
    }  
}