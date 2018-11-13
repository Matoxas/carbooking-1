<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181113111054 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, image_id INT DEFAULT NULL, INDEX IDX_C53D045F3DA5256D (image_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE booking (id INT AUTO_INCREMENT NOT NULL, car_id INT DEFAULT NULL, booked_from DATETIME NOT NULL, booked_until DATETIME NOT NULL, INDEX IDX_E00CEDDEC3C6F69F (car_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT FK_C53D045F3DA5256D FOREIGN KEY (image_id) REFERENCES car (id)');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDEC3C6F69F FOREIGN KEY (car_id) REFERENCES car (id)');
        $this->addSql('ALTER TABLE car DROP image');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE image');
        $this->addSql('DROP TABLE booking');
        $this->addSql('ALTER TABLE car ADD image VARCHAR(50) DEFAULT NULL COLLATE utf8mb4_unicode_ci');
    }
}
