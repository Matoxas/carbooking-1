<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181111003055 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE rent_date (id INT AUTO_INCREMENT NOT NULL, car_id INT DEFAULT NULL, rented_from DATETIME NOT NULL, rented_until DATETIME NOT NULL, INDEX IDX_DAF49931C3C6F69F (car_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE rent_date ADD CONSTRAINT FK_DAF49931C3C6F69F FOREIGN KEY (car_id) REFERENCES car (id)');
        $this->addSql('DROP TABLE car_available');
        $this->addSql('ALTER TABLE car ADD brand_id INT NOT NULL');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT FK_773DE69D44F5D008 FOREIGN KEY (brand_id) REFERENCES brand (id)');
        $this->addSql('CREATE INDEX IDX_773DE69D44F5D008 ON car (brand_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE car_available (id INT AUTO_INCREMENT NOT NULL, car_id INT DEFAULT NULL, rented_from DATETIME NOT NULL, rented_until DATETIME DEFAULT NULL, INDEX IDX_A26D56A9C3C6F69F (car_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE car_available ADD CONSTRAINT FK_A26D56A9C3C6F69F FOREIGN KEY (car_id) REFERENCES car (id)');
        $this->addSql('DROP TABLE rent_date');
        $this->addSql('ALTER TABLE car DROP FOREIGN KEY FK_773DE69D44F5D008');
        $this->addSql('DROP INDEX IDX_773DE69D44F5D008 ON car');
        $this->addSql('ALTER TABLE car DROP brand_id');
    }
}
