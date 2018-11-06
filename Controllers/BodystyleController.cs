using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using angular7_aspcore.Models;

namespace contact_app.Controllers
{
    // set route attribute to make request as 'api/bodystyle'
    [Produces("application/json")]  
    [Route("api/[controller]")]  
    public class BodystyleController: ControllerBase {  
        private readonly ContactAppContext _context;  
        // initiate database context  
        public BodystyleController(ContactAppContext context) {  
                _context = context;  
            }

        [HttpGet]  
        [Route("getAllBodystyles")]  
        public IEnumerable < Bodystyle > GetAll() {  
                // fetch all bodystyle records  
                return _context.Bodystyles.ToList();  
            }

        [HttpGet("{id}")]  
        [Route("getBodystyle")]  
        public IActionResult GetById(long id) {  
                // filter bodystyle records by vehicle id  
                var item = _context.Bodystyles.FirstOrDefault(t => t.TypeId == id);  
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
                    TypeId = item.TypeId,
                    Name = item.Name
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
                var bodystyle = _context.Bodystyles.FirstOrDefault(t => t.TypeId == id);  
                if (bodystyle == null) {  
                    return NotFound();  
                }  
                bodystyle.TypeId = item.TypeId;
                bodystyle.Name = item.Name;  
                _context.Bodystyles.Update(bodystyle);  
                _context.SaveChanges();  
                return Ok(new {  
                    message = "Bodystyle is updated successfully."  
                });  
            } 

        [HttpDelete("{id}")]  
        [Route("deleteBodystyle")]  
        public IActionResult Delete(long id) {  
            var bodystyle = _context.Bodystyles.FirstOrDefault(t => t.TypeId == id);  
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