using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using angular7_aspcore.Models;

namespace contact_app.Controllers
{
    // set route attribute to make request as 'api/vehicle'
    [Produces("application/json")]  
    [Route("api/[controller]")]  
    public class VehicleController: ControllerBase {  
        private readonly ContactAppContext _context;  
        // initiate database context  
        public VehicleController(ContactAppContext context) {  
                _context = context;  
            }

        [HttpGet]  
        [Route("getAllVehicles")]  
        public IEnumerable < Vehicle > GetAll() {  
                // fetch all vehicle records  
                return _context.Vehicles.Include(v => v.bodystyle).ToList();  
            }

        [HttpGet("{id}")]  
        [Route("getVehiclesByContactId")]  
        public IEnumerable < Vehicle > GetByContactId(long id) {  
                return _context.Vehicles.Include(v => v.bodystyle).Where(t => t.contactId == id).ToList();  
            }

        [HttpGet("{id}")]  
        [Route("getVehicle")]  
        public IActionResult GetById(long id) {  
                // filter vehicle records by vehicle id  
                var item = _context.Vehicles.Include(v => v.bodystyle).FirstOrDefault(t => t.vehicleId == id);  
                if (item == null) {  
                    return NotFound();  
                }  
                return new ObjectResult(item);  
            }

        [HttpPost]  
        [Route("addVehicle")]  
        public IActionResult Create([FromBody] Vehicle item) {  
                // set bad request if vehicle data is not provided in body  
                if (item == null) {  
                    return BadRequest();  
                }  
                _context.Vehicles.Add(new Vehicle {  
                    make = item.make,
                    model = item.model,
                    version = item.version,
                    registration = item.registration,
                    contactId = item.contactId,
                    typeId = item.typeId
                });  
                _context.SaveChanges();  
                return Ok(new {  
                    message = "Vehicle is added successfully."  
                });  
            }

        [HttpPut("{id}")]  
        [Route("updateVehicle")]  
        public IActionResult Update(long id, [FromBody] Vehicle item) {  
                // set bad request if vehicle data is not provided in body  
                if (item == null || id == 0) {  
                    return BadRequest();  
                }  
                var vehicle = _context.Vehicles.FirstOrDefault(t => t.vehicleId == id);  
                if (vehicle == null) {  
                    return NotFound();  
                }  
                vehicle.make = item.make;
                vehicle.model = item.model;
                vehicle.version = item.version;
                vehicle.registration = item.registration;
                vehicle.contactId = item.contactId;
                vehicle.typeId = item.typeId;  
                _context.Vehicles.Update(vehicle);  
                _context.SaveChanges();  
                return Ok(new {  
                    message = "Vehicle is updated successfully."  
                });  
            } 

        [HttpDelete("{id}")]  
        [Route("deleteVehicle")]  
        public IActionResult Delete(long id) {  
            var vehicle = _context.Vehicles.FirstOrDefault(t => t.vehicleId == id);  
            if (vehicle == null) {  
                return NotFound();  
            }  
            _context.Vehicles.Remove(vehicle);  
            _context.SaveChanges();  
            return Ok(new {  
                message = "Vehicle is deleted successfully."  
            });  
        }  
    }  
}