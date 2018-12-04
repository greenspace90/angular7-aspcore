using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace angular7_aspcore.Migrations
{
    public partial class PurchaseDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "purchaseDate",
                table: "Vehicles",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "purchaseDate",
                table: "Vehicles");
        }
    }
}
