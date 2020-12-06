using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Server.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "movie",
                columns: table => new
                {
                    id_movie = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(maxLength: 255, nullable: true),
                    description = table.Column<string>(maxLength: 1024, nullable: true),
                    picture_url = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movie", x => x.id_movie);
                });

            migrationBuilder.CreateTable(
                name: "movie_tag",
                columns: table => new
                {
                    id_movie_tag = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movie_tag", x => x.id_movie_tag);
                });

            migrationBuilder.CreateTable(
                name: "user_type",
                columns: table => new
                {
                    id_user_type = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user_type", x => x.id_user_type);
                });

            migrationBuilder.CreateTable(
                name: "movie_x_movie_tag",
                columns: table => new
                {
                    id_movie_x_movie_tag = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_movie = table.Column<int>(nullable: false),
                    id_movie_tag = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movie_x_movie_tag", x => x.id_movie_x_movie_tag);
                    table.ForeignKey(
                        name: "FK_movie_x_movie_tag_movie_id_movie",
                        column: x => x.id_movie,
                        principalTable: "movie",
                        principalColumn: "id_movie",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_movie_x_movie_tag_movie_tag_id_movie_tag",
                        column: x => x.id_movie_tag,
                        principalTable: "movie_tag",
                        principalColumn: "id_movie_tag",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    id_user = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_user_type = table.Column<int>(nullable: false),
                    name = table.Column<string>(maxLength: 255, nullable: true),
                    surname = table.Column<string>(maxLength: 255, nullable: true),
                    login = table.Column<string>(maxLength: 255, nullable: false),
                    password = table.Column<string>(maxLength: 255, nullable: false),
                    picture_url = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.id_user);
                    table.ForeignKey(
                        name: "FK_user_user_type_id_user_type",
                        column: x => x.id_user_type,
                        principalTable: "user_type",
                        principalColumn: "id_user_type",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "movie_rating",
                columns: table => new
                {
                    id_movie_rating = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_user = table.Column<int>(nullable: false),
                    id_movie = table.Column<int>(nullable: false),
                    rating = table.Column<float>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movie_rating", x => x.id_movie_rating);
                    table.ForeignKey(
                        name: "FK_movie_rating_movie_id_movie",
                        column: x => x.id_movie,
                        principalTable: "movie",
                        principalColumn: "id_movie",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_movie_rating_user_id_user",
                        column: x => x.id_user,
                        principalTable: "user",
                        principalColumn: "id_user",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "review",
                columns: table => new
                {
                    id_review = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    id_user = table.Column<int>(nullable: false),
                    id_movie = table.Column<int>(nullable: false),
                    text = table.Column<string>(maxLength: 1024, nullable: true),
                    date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_review", x => x.id_review);
                    table.ForeignKey(
                        name: "FK_review_movie_id_movie",
                        column: x => x.id_movie,
                        principalTable: "movie",
                        principalColumn: "id_movie",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_review_user_id_user",
                        column: x => x.id_user,
                        principalTable: "user",
                        principalColumn: "id_user",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "user_type",
                columns: new[] { "name" },
                values: new object[,]
                {
                    { "Admin" },
                    { "User" },
                }
            );

            migrationBuilder.InsertData(
                table: "movie_tag",
                columns: new[] { "name" },
                values: new object[,]
                {
                    { "Детектив" },
                    { "Триллер" },
                    { "Боевик" },
                    { "Ужасы" },
                    { "Фантастика" },
                    { "Комедия" },
                    { "Мелодрама" },
                }
            );

            migrationBuilder.InsertData(
                table: "user",
                columns: new[] { "id_user_type", "name", "login", "password" },
                values: new object[,]
                {
                    { "1", "Andrey", "lordeup", "AQAAAAEAACcQAAAAEE7GtVQHSvnhR0nzVjw19EfPPwT7xPS//kR1JtzmPvS+1b2AGfmRkdV0udRfXSYPWg==" },
                }
            );

            migrationBuilder.CreateIndex(
                name: "IX_movie_rating_id_movie",
                table: "movie_rating",
                column: "id_movie");

            migrationBuilder.CreateIndex(
                name: "IX_movie_rating_id_user",
                table: "movie_rating",
                column: "id_user");

            migrationBuilder.CreateIndex(
                name: "IX_movie_x_movie_tag_id_movie",
                table: "movie_x_movie_tag",
                column: "id_movie");

            migrationBuilder.CreateIndex(
                name: "IX_movie_x_movie_tag_id_movie_tag",
                table: "movie_x_movie_tag",
                column: "id_movie_tag");

            migrationBuilder.CreateIndex(
                name: "IX_review_id_movie",
                table: "review",
                column: "id_movie");

            migrationBuilder.CreateIndex(
                name: "IX_review_id_user",
                table: "review",
                column: "id_user");

            migrationBuilder.CreateIndex(
                name: "IX_user_id_user_type",
                table: "user",
                column: "id_user_type");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "movie_rating");

            migrationBuilder.DropTable(
                name: "movie_x_movie_tag");

            migrationBuilder.DropTable(
                name: "review");

            migrationBuilder.DropTable(
                name: "movie_tag");

            migrationBuilder.DropTable(
                name: "movie");

            migrationBuilder.DropTable(
                name: "user");

            migrationBuilder.DropTable(
                name: "user_type");
        }
    }
}
