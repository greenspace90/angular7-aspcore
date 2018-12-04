using Microsoft.EntityFrameworkCore.Migrations;

namespace angular7_aspcore.Migrations
{
    public partial class Depreciation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "ownershipPeriod",
                table: "Vehicles",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<decimal>(
                name: "purchasePrice",
                table: "Vehicles",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "residualValue",
                table: "Vehicles",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ownershipPeriod",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "purchasePrice",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "residualValue",
                table: "Vehicles");
        }
    }
}
