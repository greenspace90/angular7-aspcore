using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
   
namespace angular7_aspcore.Models
{
    public class ContactAppContext: DbContext {  
        public ContactAppContext(DbContextOptions <ContactAppContext> options): base(options) {}  
        public DbSet <Contact> Contact {  
            get;  
            set;  
        }  
    }
}  