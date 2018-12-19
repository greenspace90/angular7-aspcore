using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace angular7_aspcore.Models {
    public class ContactAppContext : DbContext {
        public ContactAppContext (DbContextOptions<ContactAppContext> options) : base (options) { }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Type> Types { get; set; }
        public DbSet<Bodystyle> Bodystyles { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Settings> Settings { get; set; }

        protected override void OnModelCreating (ModelBuilder modelBuilder) {
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

            #region SettingsSeed
            modelBuilder.Entity<Settings> ().HasData (
                new Settings () {settingsId = 1, chartTitleFontSize = 18, chartScaleLabelFontSize = 14, chartLineWidth = 0.5, chartLineColour = "#ff0000", chartAreaBackgroundColour = "#99ebff", chartModalBackgroundColour = "rgb(169, 247, 208)"}
            );
            #endregion

            #region ContactSeed
            modelBuilder.Entity<Contact> ().HasData (
                new Contact () { contactId = 1, name ="Andrew", email = "ar.b@isp.com", gender = 0, birth = new System.DateTime (1966, 10, 11), techno = "Typescript", role = "Developer" },
                new Contact () { contactId = 2, name = "Alex", email = "al.l@mail.com", gender = 1, birth = new System.DateTime (1988, 01, 01), techno = "Angular", role = "Front end" },
                new Contact () { contactId = 3, name = "Rob", email = "example@mail.net", gender = 0, birth = new System.DateTime (1975, 01, 15), techno = "C#", role = "Lead developer" }
            );
            #endregion

            #region BodystyleSeed
            modelBuilder.Entity<Bodystyle> ().HasData (
                new Bodystyle () { typeId = 1, name = "Saloon" },
                new Bodystyle () { typeId = 2, name = "Hatchback" },
                new Bodystyle () { typeId = 3, name = "SUV" },
                new Bodystyle () { typeId = 4, name = "Sports" },
                new Bodystyle () { typeId = 5, name = "GT Coupe" }
            );
            #endregion

            #region VehicleSeed
            modelBuilder.Entity<Vehicle> ().HasData (
                new Vehicle () { vehicleId = 1, make = "Ford", model = "Focus", version = "1.0 EcoBoost", registration = "FG15BDA", contactId = 1, typeId = 2, purchaseDate = new System.DateTime (2015, 10, 11), purchasePrice = 20000, ownershipPeriod = 5, residualValue = 11000 },
                new Vehicle () { vehicleId = 2, make = "Fiat", model = "500", version = "Abarth", registration = "FG14BDE", contactId = 2, typeId = 2, purchaseDate = new System.DateTime (2014, 01, 01), purchasePrice = 15000, ownershipPeriod = 10, residualValue = 3000 },
                new Vehicle () { vehicleId = 3, make = "Mercedes-Benz", model = "C-Class", version = "180", registration = "VG67BDA", contactId = 3, typeId = 1, purchaseDate = new System.DateTime (2017, 09, 25), purchasePrice = 28000, ownershipPeriod = 4, residualValue = 20000 },
                new Vehicle () { vehicleId = 4, make = "BMW", model = "X5", version = "5.0 M", registration = "NH65LKU", contactId = 3, typeId = 3, purchaseDate = new System.DateTime (2015, 03, 16), purchasePrice = 55000, ownershipPeriod = 6, residualValue = 25000 },
                new Vehicle () { vehicleId = 5, make = "Porsche", model = "Boxster", version = "S", registration = "LP60AWE", contactId = 2, typeId = 4, purchaseDate = new System.DateTime (2010, 06, 28), purchasePrice = 46000, ownershipPeriod = 7, residualValue = 27000 },
                new Vehicle () { vehicleId = 6, make = "Mercedes-Benz", model = "SL", version = "500", registration = "MB62DSA", contactId = 2, typeId = 5, purchaseDate = new System.DateTime (2012, 02, 17), purchasePrice = 68000, ownershipPeriod = 9, residualValue = 21000 }
            );
            #endregion
        }
    }
}