using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using angular7_aspcore.Models;
using angular7_aspcore.Services;
using DTO = angular7_aspcore.Models.DTOs;
using AutoMapper;

namespace contact_app.Controllers
{
    // set route attribute to make request as 'api/vehicle'
    [Produces("application/json")]  
    [Route("api/[controller]")]  
    public class VehicleController: ControllerBase {  
        private readonly ContactAppContext _context;
        private readonly IMapper _mapper;

        private IVehicleService _vehicleService; 
  
        // initiate database context  
        public VehicleController(IVehicleService vehicleService, ContactAppContext context, IMapper mapper) {  
                _context = context; 
                _mapper = mapper;
                _vehicleService = vehicleService;
            }

        [HttpGet]  
        [Route("getAllVehicles")]  
        public IEnumerable < DTO.VehicleDTO > GetAll() {  
                // fetch all vehicle records
                return _mapper.Map<List<DTO.VehicleDTO>>(_context.Vehicles.Include(v => v.bodystyle).ToList());  
                // return _context.Vehicles.Include(v => v.bodystyle).ToList();  
            }

        [HttpGet("{id}")]  
        [Route("getVehiclesByContactId")]  
        public IEnumerable < DTO.VehicleDTO > GetByContactId(long id) {  
            return _mapper.Map<List<DTO.VehicleDTO>>(_context.Vehicles.Include(v => v.bodystyle).Where(t => t.contactId == id).ToList());
            // return _context.Vehicles.Include(v => v.bodystyle).Where(t => t.contactId == id).ToList();  
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

        [HttpGet("{id}")]  
        [Route("getChartData")]  
        public IEnumerable <DTO.Datapoint> GetChartDataById(long id) {  

                var data = _vehicleService.GetChartDataById(id);
                  
                return data;  
            }


        [HttpPost]  
        [Route("addVehicle")]  
        public IActionResult Create([FromBody] DTO.Vehicle item) {  
                // set bad request if vehicle data is not provided in body  
                if (item == null) {  
                    return BadRequest();  
                }
                _context.Vehicles.Add(_mapper.Map<Vehicle>(item));  
                _context.SaveChanges();  
                return Ok(new {  
                    message = "Vehicle is added successfully."  
                });  
            }

        [HttpPut("{id}")]  
        [Route("updateVehicle")]  
        public IActionResult Update(long id, [FromBody] DTO.Vehicle item) {  
                // set bad request if vehicle data is not provided in body  
                if (item == null || id == 0) {  
                    return BadRequest();  
                }  
                var vehicle = _context.Vehicles.FirstOrDefault(t => t.vehicleId == id);  
                if (vehicle == null) {  
                    return NotFound();  
                }
                _mapper.Map(item, vehicle);
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