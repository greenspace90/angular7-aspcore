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
    // set route attribute to make request as 'api/bodystyle'
    [Produces("application/json")]  
    [Route("api/[controller]")]  
    public class BodystyleController: ControllerBase {  
        // initiate database context 
        private readonly ContactAppContext _context;  
        private readonly IMapper _mapper; 
 
        public BodystyleController(ContactAppContext context, IMapper mapper) {  
                _context = context;
                _mapper = mapper;  
            }

        [HttpGet]  
        [Route("getAllBodystyles")]  
        public IEnumerable < DTO.Bodystyle > GetAll() {  
                // fetch all bodystyle records  
                return _mapper.Map<IEnumerable<DTO.Bodystyle>>(_context.Bodystyles.OrderBy(n => n.name).ToList()); 
            }

        [HttpGet("{id}")]  
        [Route("getBodystyle")]  
        public IActionResult GetById(long id) {  
                // filter bodystyle records by vehicle id  
                var item = _context.Bodystyles.FirstOrDefault(t => t.typeId == id);  
                if (item == null) {  
                    return NotFound();  
                }  
                return new ObjectResult(item);  
            }

        [HttpPost]  
        [Route("addBodystyle")]  
        public IActionResult Create([FromBody] Bodystyle item) {  
                // set bad request if bodystyle data is not provided in body  
                if (item == null) {  
                    return BadRequest();  
                }  
                _context.Bodystyles.Add(new Bodystyle {  
                    typeId = item.typeId,
                    name = item.name
                });  
                _context.SaveChanges();  
                return Ok(new {  
                    message = "Bodystyle is added successfully."  
                });  
            }

        [HttpPut("{id}")]  
        [Route("updateBodystyle")]  
        public IActionResult Update(long id, [FromBody] Bodystyle item) {  
                // set bad request if bodystyle data is not provided in body  
                if (item == null || id == 0) {  
                    return BadRequest();  
                }  
                var bodystyle = _context.Bodystyles.FirstOrDefault(t => t.typeId == id);  
                if (bodystyle == null) {  
                    return NotFound();  
                }  
                bodystyle.typeId = item.typeId;
                bodystyle.name = item.name;  
                _context.Bodystyles.Update(bodystyle);  
                _context.SaveChanges();  
                return Ok(new {  
                    message = "Bodystyle is updated successfully."  
                });  
            } 

        [HttpDelete("{id}")]  
        [Route("deleteBodystyle")]  
        public IActionResult Delete(long id) {  
            var bodystyle = _context.Bodystyles.FirstOrDefault(t => t.typeId == id);  
            if (bodystyle == null) {  
                return NotFound();  
            }  
            _context.Bodystyles.Remove(bodystyle);  
            _context.SaveChanges();  
            return Ok(new {  
                message = "Bodystyle is deleted successfully."  
            });  
        }  
    }  
}