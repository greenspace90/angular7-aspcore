﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using angular7_aspcore.Models;

namespace angular7_aspcore.Migrations
{
    [DbContext(typeof(ContactAppContext))]
    [Migration("20181127114019_Depreciation")]
    partial class Depreciation
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("angular7_aspcore.Models.Contact", b =>
                {
                    b.Property<long?>("contactId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("birth");

                    b.Property<string>("email");

                    b.Property<byte>("gender");

                    b.Property<string>("name");

                    b.Property<string>("role");

                    b.Property<string>("techno");

                    b.HasKey("contactId");

                    b.ToTable("Contacts");

                    b.HasData(
                        new { contactId = 1L, birth = new DateTime(1966, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), email = "ar.b@isp.com", gender = (byte)0, role = "Developer", techno = "Typescript" },
                        new { contactId = 2L, birth = new DateTime(1988, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), email = "al.l@mail.com", gender = (byte)1, role = "Front end", techno = "Angular" },
                        new { contactId = 3L, birth = new DateTime(1975, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), email = "example@mail.net", gender = (byte)0, role = "Lead developer", techno = "C#" }
                    );
                });

            modelBuilder.Entity("angular7_aspcore.Models.Type", b =>
                {
                    b.Property<long?>("typeId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("name");

                    b.HasKey("typeId");

                    b.ToTable("Types");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Type");
                });

            modelBuilder.Entity("angular7_aspcore.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<byte[]>("PasswordHash");

                    b.Property<byte[]>("PasswordSalt");

                    b.Property<string>("Username");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("angular7_aspcore.Models.Vehicle", b =>
                {
                    b.Property<long?>("vehicleId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<long?>("contactId");

                    b.Property<string>("make");

                    b.Property<string>("model");

                    b.Property<long>("ownershipPeriod");

                    b.Property<decimal>("purchasePrice");

                    b.Property<string>("registration");

                    b.Property<decimal>("residualValue");

                    b.Property<long?>("typeId");

                    b.Property<string>("version");

                    b.HasKey("vehicleId");

                    b.HasIndex("contactId");

                    b.HasIndex("typeId");

                    b.ToTable("Vehicles");

                    b.HasData(
                        new { vehicleId = 1L, contactId = 1L, make = "Ford", model = "Focus", ownershipPeriod = 0L, purchasePrice = 0m, registration = "FG53BDA", residualValue = 0m, typeId = 2L, version = "1.0 EcoBoost" },
                        new { vehicleId = 2L, contactId = 2L, make = "Fiat", model = "500", ownershipPeriod = 0L, purchasePrice = 0m, registration = "FG18BDE", residualValue = 0m, typeId = 2L, version = "Abarth" },
                        new { vehicleId = 3L, contactId = 3L, make = "Mercedes-Benz", model = "C-Class", ownershipPeriod = 0L, purchasePrice = 0m, registration = "VG68BDA", residualValue = 0m, typeId = 1L, version = "180" },
                        new { vehicleId = 4L, contactId = 3L, make = "BMW", model = "X5", ownershipPeriod = 0L, purchasePrice = 0m, registration = "NH68LKU", residualValue = 0m, typeId = 3L, version = "5.0 M" },
                        new { vehicleId = 5L, contactId = 2L, make = "Porsche", model = "Boxster", ownershipPeriod = 0L, purchasePrice = 0m, registration = "LP67AWE", residualValue = 0m, typeId = 4L, version = "S" },
                        new { vehicleId = 6L, contactId = 2L, make = "Mercedes-Benz", model = "SL", ownershipPeriod = 0L, purchasePrice = 0m, registration = "MB66DSA", residualValue = 0m, typeId = 5L, version = "500" }
                    );
                });

            modelBuilder.Entity("angular7_aspcore.Models.Bodystyle", b =>
                {
                    b.HasBaseType("angular7_aspcore.Models.Type");


                    b.ToTable("Bodystyle");

                    b.HasDiscriminator().HasValue("Bodystyle");

                    b.HasData(
                        new { typeId = 1L, name = "Saloon" },
                        new { typeId = 2L, name = "Hatchback" },
                        new { typeId = 3L, name = "SUV" },
                        new { typeId = 4L, name = "Sports" },
                        new { typeId = 5L, name = "GT Coupe" }
                    );
                });

            modelBuilder.Entity("angular7_aspcore.Models.Vehicle", b =>
                {
                    b.HasOne("angular7_aspcore.Models.Contact", "contact")
                        .WithMany()
                        .HasForeignKey("contactId");

                    b.HasOne("angular7_aspcore.Models.Bodystyle", "bodystyle")
                        .WithMany()
                        .HasForeignKey("typeId");
                });
#pragma warning restore 612, 618
        }
    }
}
