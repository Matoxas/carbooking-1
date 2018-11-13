<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181113112456 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE image DROP FOREIGN KEY FK_C53D045F3DA5256D');
        $this->addSql('DROP INDEX IDX_C53D045F3DA5256D ON image');
        $this->addSql('ALTER TABLE image ADD image VARCHAR(50) NOT NULL, CHANGE image_id car_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT FK_C53D045FC3C6F69F FOREIGN KEY (car_id) REFERENCES car (id)');
        $this->addSql('CREATE INDEX IDX_C53D045FC3C6F69F ON image (car_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE image DROP FOREIGN KEY FK_C53D045FC3C6F69F');
        $this->addSql('DROP INDEX IDX_C53D045FC3C6F69F ON image');
        $this->addSql('ALTER TABLE image DROP image, CHANGE car_id image_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT FK_C53D045F3DA5256D FOREIGN KEY (image_id) REFERENCES car (id)');
        $this->addSql('CREATE INDEX IDX_C53D045F3DA5256D ON image (image_id)');
    }
}
