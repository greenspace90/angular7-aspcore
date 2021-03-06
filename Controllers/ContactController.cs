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
    public class ContactController: Controller {  
        private readonly ContactAppContext _context; 
        private readonly IMapper _mapper; 
        // initiate database context  
        public ContactController(ContactAppContext context, IMapper mapper) {  
                _context = context;
                _mapper = mapper;  
            }

        [HttpGet]  
        [Route("getAllContacts")]  
        public IEnumerable < Contact > GetAll() {  
                // fetch all contact records  
                return _context.Contacts.ToList();  
            }

        [HttpGet("{id}")]  
        [Route("getContact")]  
        public IActionResult GetById(long id) {  
                // filter contact records by contact id  
                var item = _context.Contacts.FirstOrDefault(t => t.contactId == id);  
                if (item == null) {  
                    return NotFound();  
                }  
                return new ObjectResult(item);  
            }

        [HttpPost]  
        [Route("addContact")]  
        public IActionResult Create([FromBody] DTO.Contact item) {  
                // set bad request if contact data is not provided in body  
                if (item == null) {  
                    return BadRequest();  
                }

                _context.Contacts.Add(_mapper.Map<Contact>(item));
                _context.SaveChanges();  
                return Ok(new {  
                    message = "Contact is added successfully."  
                });  
            }

        // [HttpPost]  
        // [Route("addContact")]  
        // public IActionResult Create([FromBody] Contact item) {  
        //         // set bad request if contact data is not provided in body  
        //         if (item == null) {  
        //             return BadRequest();  
        //         }

        //         _context.Contacts.Add(new Contact {  
        //             name = item.name,  
        //                 email = item.email,  
        //                 gender = item.gender,  
        //                 birth = item.birth,  
        //                 techno = item.techno,  
        //                 message = item.message  
        //         });  
        //         _context.SaveChanges();  
        //         return Ok(new {  
        //             message = "Contact is added successfully."  
        //         });  
        //     }

        [HttpPut("{id}")]  
        [Route("updateContact")]  
        public IActionResult Update(long id, [FromBody] Contact item) {  
                // set bad request if contact data is not provided in body  
                if (item == null || id == 0) {  
                    return BadRequest();  
                }  
                var contact = _context.Contacts.FirstOrDefault(t => t.contactId == id);  
                if (contact == null) {  
                    return NotFound();  
                }  
                contact.name = item.name;  
                contact.email = item.email;  
                contact.gender = item.gender;  
                contact.birth = item.birth;  
                contact.techno = item.techno;  
                contact.role = item.role;  
                _context.Contacts.Update(contact);  
                _context.SaveChanges();  
                return Ok(new {  
                    message = "Contact is updated successfully."  
                });  
            } 

        [HttpDelete("{id}")]  
        [Route("deleteContact")]  
        public IActionResult Delete(long id) {  
            var contact = _context.Contacts.FirstOrDefault(t => t.contactId == id);  
            if (contact == null) {  
                return NotFound();  
            }  
            _context.Contacts.Remove(contact);  
            _context.SaveChanges();  
            return Ok(new {  
                message = "Contact is deleted successfully."  
            });  
        }  
    }  
}