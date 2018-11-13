using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
   
namespace angular7_aspcore.Models
{
    public class ContactAppContext: DbContext {  
        public ContactAppContext(DbContextOptions <ContactAppContext> options): base(options) {}  
        public DbSet <Contact> Contacts {  
            get;  
            set;  
        }  
        public DbSet <Type> Types {  
            get;  
            set;  
        }  
        public DbSet <Bodystyle> Bodystyles {  
            get;  
            set;  
        }  
        public DbSet <Vehicle> Vehicles {  
            get;  
            set;  
        } 

         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // modelBuilder.Entity<Blog>(entity =>
            // {
            //     entity.Property(e => e.Url).IsRequired();
            // });

            // #region BlogSeed
            // modelBuilder.Entity<Blog>().HasData(new Blog {BlogId = 1, Url = "http://sample.com"});
            // #endregion

            // modelBuilder.Entity<Post>(entity =>
            // {
            //     entity.HasOne(d => d.Blog)
            //         .WithMany(p => p.Posts)
            //         .HasForeignKey("BlogId");
            // });

            #region ContactSeed
            modelBuilder.Entity<Contact>().HasData(
                new Contact(){ contactId = 1, email = "ar.b@isp.com", gender= 0, birth= new System.DateTime(1966,10,11), techno = "Typescript", role = "Developer" },
                new Contact(){ contactId = 2, email = "al.l@mail.com", gender= 1, birth= new System.DateTime(1988,01,01), techno = "Angular", role = "Front end" },
                new Contact(){ contactId = 3, email = "example@mail.net", gender= 0, birth= new System.DateTime(1975,01,15), techno = "C#", role = "Lead developer" }
                );
            #endregion

            #region BodystyleSeed
            modelBuilder.Entity<Bodystyle>().HasData(
                new Bodystyle() { typeId = 1, name = "Saloon" },
                new Bodystyle() { typeId = 2, name = "Hatchback" },
                new Bodystyle() { typeId = 3, name = "SUV" },
                new Bodystyle() { typeId = 4, name = "Sports" },
                new Bodystyle() { typeId = 5, name = "GT Coupe" }
                );
            #endregion

            #region VehicleSeed
            modelBuilder.Entity<Vehicle>().HasData(
                new Vehicle() { vehicleId = 1, make = "Ford", model = "Focus", version = "1.0 EcoBoost", registration = "FG53BDA", contactId = 1, typeId = 2  },
                new Vehicle() { vehicleId = 2, make = "Fiat", model = "500", version = "Abarth", registration = "FG18BDE", contactId = 2, typeId = 2  },
                new Vehicle() { vehicleId = 3, make = "Mercedes-Benz", model = "C-Class", version = "180", registration = "VG68BDA", contactId = 3, typeId = 1  },
                new Vehicle() { vehicleId = 4, make = "BMW", model = "X5", version = "5.0 M", registration = "NH68LKU", contactId = 3, typeId = 3  },
                new Vehicle() { vehicleId = 5, make = "Porsche", model = "Boxster", version = "S", registration = "LP67AWE", contactId = 2, typeId = 4  },
                new Vehicle() { vehicleId = 6, make = "Mercedes-Benz", model = "SL", version = "500", registration = "MB66DSA", contactId = 2, typeId = 5  }
            );
            #endregion
        } 
    }
}  