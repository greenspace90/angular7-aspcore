using Microsoft.EntityFrameworkCore.Migrations;

namespace angular7_aspcore.Migrations
{
    public partial class CamelCaseProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Contacts_ContactId",
                table: "Vehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Types_TypeId",
                table: "Vehicles");

            migrationBuilder.RenameColumn(
                name: "Version",
                table: "Vehicles",
                newName: "version");

            migrationBuilder.RenameColumn(
                name: "TypeId",
                table: "Vehicles",
                newName: "typeId");

            migrationBuilder.RenameColumn(
                name: "Registration",
                table: "Vehicles",
                newName: "registration");

            migrationBuilder.RenameColumn(
                name: "Model",
                table: "Vehicles",
                newName: "model");

            migrationBuilder.RenameColumn(
                name: "Make",
                table: "Vehicles",
                newName: "make");

            migrationBuilder.RenameColumn(
                name: "ContactId",
                table: "Vehicles",
                newName: "contactId");

            migrationBuilder.RenameColumn(
                name: "VehicleId",
                table: "Vehicles",
                newName: "vehicleId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_TypeId",
                table: "Vehicles",
                newName: "IX_Vehicles_typeId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_ContactId",
                table: "Vehicles",
                newName: "IX_Vehicles_contactId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Types",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "TypeId",
                table: "Types",
                newName: "typeId");

            migrationBuilder.RenameColumn(
                name: "ContactId",
                table: "Contacts",
                newName: "contactId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Contacts_contactId",
                table: "Vehicles",
                column: "contactId",
                principalTable: "Contacts",
                principalColumn: "contactId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Types_typeId",
                table: "Vehicles",
                column: "typeId",
                principalTable: "Types",
                principalColumn: "typeId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Contacts_contactId",
                table: "Vehicles");

            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Types_typeId",
                table: "Vehicles");

            migrationBuilder.RenameColumn(
                name: "version",
                table: "Vehicles",
                newName: "Version");

            migrationBuilder.RenameColumn(
                name: "typeId",
                table: "Vehicles",
                newName: "TypeId");

            migrationBuilder.RenameColumn(
                name: "registration",
                table: "Vehicles",
                newName: "Registration");

            migrationBuilder.RenameColumn(
                name: "model",
                table: "Vehicles",
                newName: "Model");

            migrationBuilder.RenameColumn(
                name: "make",
                table: "Vehicles",
                newName: "Make");

            migrationBuilder.RenameColumn(
                name: "contactId",
                table: "Vehicles",
                newName: "ContactId");

            migrationBuilder.RenameColumn(
                name: "vehicleId",
                table: "Vehicles",
                newName: "VehicleId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_typeId",
                table: "Vehicles",
                newName: "IX_Vehicles_TypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Vehicles_contactId",
                table: "Vehicles",
                newName: "IX_Vehicles_ContactId");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Types",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "typeId",
                table: "Types",
                newName: "TypeId");

            migrationBuilder.RenameColumn(
                name: "contactId",
                table: "Contacts",
                newName: "ContactId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Contacts_ContactId",
                table: "Vehicles",
                column: "ContactId",
                principalTable: "Contacts",
                principalColumn: "ContactId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Types_TypeId",
                table: "Vehicles",
                column: "TypeId",
                principalTable: "Types",
                principalColumn: "TypeId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
