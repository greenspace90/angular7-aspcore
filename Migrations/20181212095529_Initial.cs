using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace angular7_aspcore.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Contacts",
                columns: table => new
                {
                    contactId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(nullable: true),
                    email = table.Column<string>(nullable: true),
                    gender = table.Column<byte>(nullable: false),
                    birth = table.Column<DateTime>(nullable: true),
                    techno = table.Column<string>(nullable: true),
                    role = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contacts", x => x.contactId);
                });

            migrationBuilder.CreateTable(
                name: "Settings",
                columns: table => new
                {
                    settingsId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    chartTitleFontSize = table.Column<long>(nullable: true),
                    chartScaleLabelFontSize = table.Column<long>(nullable: true),
                    chartLineWidth = table.Column<double>(nullable: true),
                    chartLineColour = table.Column<string>(nullable: true),
                    chartAreaBackgroundColour = table.Column<string>(nullable: true),
                    chartModalBackgroundColour = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Settings", x => x.settingsId);
                });

            migrationBuilder.CreateTable(
                name: "Types",
                columns: table => new
                {
                    typeId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    name = table.Column<string>(nullable: true),
                    Discriminator = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Types", x => x.typeId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    Username = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Vehicles",
                columns: table => new
                {
                    vehicleId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    make = table.Column<string>(nullable: true),
                    model = table.Column<string>(nullable: true),
                    version = table.Column<string>(nullable: true),
                    registration = table.Column<string>(nullable: true),
                    contactId = table.Column<long>(nullable: true),
                    typeId = table.Column<long>(nullable: true),
                    purchaseDate = table.Column<DateTime>(nullable: false),
                    purchasePrice = table.Column<decimal>(nullable: false),
                    ownershipPeriod = table.Column<long>(nullable: false),
                    residualValue = table.Column<decimal>(nullable: false),
                    imagePath = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vehicles", x => x.vehicleId);
                    table.ForeignKey(
                        name: "FK_Vehicles_Contacts_contactId",
                        column: x => x.contactId,
                        principalTable: "Contacts",
                        principalColumn: "contactId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Vehicles_Types_typeId",
                        column: x => x.typeId,
                        principalTable: "Types",
                        principalColumn: "typeId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Contacts",
                columns: new[] { "contactId", "birth", "email", "gender", "name", "role", "techno" },
                values: new object[,]
                {
                    { 1L, new DateTime(1966, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "ar.b@isp.com", (byte)0, "Andrew", "Developer", "Typescript" },
                    { 2L, new DateTime(1988, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "al.l@mail.com", (byte)1, "Alex", "Front end", "Angular" },
                    { 3L, new DateTime(1975, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "example@mail.net", (byte)0, "Rob", "Lead developer", "C#" }
                });

            migrationBuilder.InsertData(
                table: "Settings",
                columns: new[] { "settingsId", "chartAreaBackgroundColour", "chartLineColour", "chartLineWidth", "chartModalBackgroundColour", "chartScaleLabelFontSize", "chartTitleFontSize" },
                values: new object[] { 1L, "#99ebff", "#ff0000", 0.5, "rgb(169, 247, 208)", 14L, 18L });

            migrationBuilder.InsertData(
                table: "Types",
                columns: new[] { "typeId", "Discriminator", "name" },
                values: new object[,]
                {
                    { 1L, "Bodystyle", "Saloon" },
                    { 2L, "Bodystyle", "Hatchback" },
                    { 3L, "Bodystyle", "SUV" },
                    { 4L, "Bodystyle", "Sports" },
                    { 5L, "Bodystyle", "GT Coupe" }
                });

            migrationBuilder.InsertData(
                table: "Vehicles",
                columns: new[] { "vehicleId", "contactId", "imagePath", "make", "model", "ownershipPeriod", "purchaseDate", "purchasePrice", "registration", "residualValue", "typeId", "version" },
                values: new object[,]
                {
                    { 1L, 1L, null, "Ford", "Focus", 5L, new DateTime(2015, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), 20000m, "FG15BDA", 11000m, 2L, "1.0 EcoBoost" },
                    { 2L, 2L, null, "Fiat", "500", 10L, new DateTime(2014, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 15000m, "FG14BDE", 3000m, 2L, "Abarth" },
                    { 5L, 2L, null, "Porsche", "Boxster", 7L, new DateTime(2010, 6, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 46000m, "LP60AWE", 27000m, 4L, "S" },
                    { 6L, 2L, null, "Mercedes-Benz", "SL", 9L, new DateTime(2012, 2, 17, 0, 0, 0, 0, DateTimeKind.Unspecified), 68000m, "MB62DSA", 21000m, 5L, "500" },
                    { 3L, 3L, null, "Mercedes-Benz", "C-Class", 4L, new DateTime(2017, 9, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), 28000m, "VG67BDA", 20000m, 1L, "180" },
                    { 4L, 3L, null, "BMW", "X5", 6L, new DateTime(2015, 3, 16, 0, 0, 0, 0, DateTimeKind.Unspecified), 55000m, "NH65LKU", 25000m, 3L, "5.0 M" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_contactId",
                table: "Vehicles",
                column: "contactId");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_typeId",
                table: "Vehicles",
                column: "typeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Settings");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Vehicles");

            migrationBuilder.DropTable(
                name: "Contacts");

            migrationBuilder.DropTable(
                name: "Types");
        }
    }
}
