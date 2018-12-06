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
                    residualValue = table.Column<decimal>(nullable: false)
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
                    { 1L, new DateTime(1966, 10, 11, 0, 0, 0, 0, DateTimeKind.Unspecified), "ar.b@isp.com", (byte)0, null, "Developer", "Typescript" },
                    { 2L, new DateTime(1988, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "al.l@mail.com", (byte)1, null, "Front end", "Angular" },
                    { 3L, new DateTime(1975, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), "example@mail.net", (byte)0, null, "Lead developer", "C#" }
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
                columns: new[] { "vehicleId", "contactId", "make", "model", "ownershipPeriod", "purchaseDate", "purchasePrice", "registration", "residualValue", "typeId", "version" },
                values: new object[,]
                {
                    { 1L, 1L, "Ford", "Focus", 0L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0m, "FG53BDA", 0m, 2L, "1.0 EcoBoost" },
                    { 2L, 2L, "Fiat", "500", 0L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0m, "FG18BDE", 0m, 2L, "Abarth" },
                    { 5L, 2L, "Porsche", "Boxster", 0L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0m, "LP67AWE", 0m, 4L, "S" },
                    { 6L, 2L, "Mercedes-Benz", "SL", 0L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0m, "MB66DSA", 0m, 5L, "500" },
                    { 3L, 3L, "Mercedes-Benz", "C-Class", 0L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0m, "VG68BDA", 0m, 1L, "180" },
                    { 4L, 3L, "BMW", "X5", 0L, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 0m, "NH68LKU", 0m, 3L, "5.0 M" }
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
