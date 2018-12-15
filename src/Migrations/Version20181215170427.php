<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181215170427 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE brand (id INT AUTO_INCREMENT NOT NULL, brand VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE subscriber (id INT AUTO_INCREMENT NOT NULL, city_id INT DEFAULT NULL, brand_id INT DEFAULT NULL, model_id INT DEFAULT NULL, email VARCHAR(55) NOT NULL, date_from DATETIME DEFAULT NULL, date_until DATETIME DEFAULT NULL, price_from DOUBLE PRECISION DEFAULT NULL, price_until DOUBLE PRECISION DEFAULT NULL, INDEX IDX_AD005B698BAC62AF (city_id), INDEX IDX_AD005B6944F5D008 (brand_id), INDEX IDX_AD005B697975B7E7 (model_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE renting (id INT AUTO_INCREMENT NOT NULL, car_id INT DEFAULT NULL, rented_from DATETIME NOT NULL, rented_until DATETIME NOT NULL, INDEX IDX_13533C0FC3C6F69F (car_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(50) NOT NULL, name VARCHAR(255) DEFAULT NULL, phone INT NOT NULL, password VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE car (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, brand_id INT NOT NULL, model_id INT NOT NULL, city_id INT NOT NULL, price DOUBLE PRECISION NOT NULL, created_at DATETIME NOT NULL, address VARCHAR(255) NOT NULL, latitude DOUBLE PRECISION DEFAULT NULL, longitude DOUBLE PRECISION DEFAULT NULL, token VARCHAR(30) DEFAULT NULL, publish TINYINT(1) NOT NULL, confirmed TINYINT(1) NOT NULL, description LONGTEXT NOT NULL, INDEX IDX_773DE69DA76ED395 (user_id), INDEX IDX_773DE69D44F5D008 (brand_id), INDEX IDX_773DE69D7975B7E7 (model_id), INDEX IDX_773DE69D8BAC62AF (city_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE city (id INT AUTO_INCREMENT NOT NULL, city VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE comment (id INT AUTO_INCREMENT NOT NULL, car_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, comment LONGTEXT NOT NULL, created_at DATETIME NOT NULL, INDEX IDX_9474526CC3C6F69F (car_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE image (id INT AUTO_INCREMENT NOT NULL, car_id INT DEFAULT NULL, image VARCHAR(50) NOT NULL, INDEX IDX_C53D045FC3C6F69F (car_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE booking (id INT AUTO_INCREMENT NOT NULL, car_id INT DEFAULT NULL, users_id INT NOT NULL, booked_from DATETIME NOT NULL, booked_until DATETIME NOT NULL, message LONGTEXT DEFAULT NULL, approved TINYINT(1) NOT NULL, token VARCHAR(255) NOT NULL, INDEX IDX_E00CEDDEC3C6F69F (car_id), INDEX IDX_E00CEDDE67B3B43D (users_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE model (id INT AUTO_INCREMENT NOT NULL, brand_id INT NOT NULL, model VARCHAR(255) NOT NULL, INDEX IDX_D79572D944F5D008 (brand_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE subscriber ADD CONSTRAINT FK_AD005B698BAC62AF FOREIGN KEY (city_id) REFERENCES city (id)');
        $this->addSql('ALTER TABLE subscriber ADD CONSTRAINT FK_AD005B6944F5D008 FOREIGN KEY (brand_id) REFERENCES brand (id)');
        $this->addSql('ALTER TABLE subscriber ADD CONSTRAINT FK_AD005B697975B7E7 FOREIGN KEY (model_id) REFERENCES model (id)');
        $this->addSql('ALTER TABLE renting ADD CONSTRAINT FK_13533C0FC3C6F69F FOREIGN KEY (car_id) REFERENCES car (id)');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT FK_773DE69DA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT FK_773DE69D44F5D008 FOREIGN KEY (brand_id) REFERENCES brand (id)');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT FK_773DE69D7975B7E7 FOREIGN KEY (model_id) REFERENCES model (id)');
        $this->addSql('ALTER TABLE car ADD CONSTRAINT FK_773DE69D8BAC62AF FOREIGN KEY (city_id) REFERENCES city (id)');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CC3C6F69F FOREIGN KEY (car_id) REFERENCES car (id)');
        $this->addSql('ALTER TABLE image ADD CONSTRAINT FK_C53D045FC3C6F69F FOREIGN KEY (car_id) REFERENCES car (id)');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDEC3C6F69F FOREIGN KEY (car_id) REFERENCES car (id)');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDE67B3B43D FOREIGN KEY (users_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE model ADD CONSTRAINT FK_D79572D944F5D008 FOREIGN KEY (brand_id) REFERENCES brand (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE subscriber DROP FOREIGN KEY FK_AD005B6944F5D008');
        $this->addSql('ALTER TABLE car DROP FOREIGN KEY FK_773DE69D44F5D008');
        $this->addSql('ALTER TABLE model DROP FOREIGN KEY FK_D79572D944F5D008');
        $this->addSql('ALTER TABLE car DROP FOREIGN KEY FK_773DE69DA76ED395');
        $this->addSql('ALTER TABLE booking DROP FOREIGN KEY FK_E00CEDDE67B3B43D');
        $this->addSql('ALTER TABLE renting DROP FOREIGN KEY FK_13533C0FC3C6F69F');
        $this->addSql('ALTER TABLE comment DROP FOREIGN KEY FK_9474526CC3C6F69F');
        $this->addSql('ALTER TABLE image DROP FOREIGN KEY FK_C53D045FC3C6F69F');
        $this->addSql('ALTER TABLE booking DROP FOREIGN KEY FK_E00CEDDEC3C6F69F');
        $this->addSql('ALTER TABLE subscriber DROP FOREIGN KEY FK_AD005B698BAC62AF');
        $this->addSql('ALTER TABLE car DROP FOREIGN KEY FK_773DE69D8BAC62AF');
        $this->addSql('ALTER TABLE subscriber DROP FOREIGN KEY FK_AD005B697975B7E7');
        $this->addSql('ALTER TABLE car DROP FOREIGN KEY FK_773DE69D7975B7E7');
        $this->addSql('DROP TABLE brand');
        $this->addSql('DROP TABLE subscriber');
        $this->addSql('DROP TABLE renting');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE car');
        $this->addSql('DROP TABLE city');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE image');
        $this->addSql('DROP TABLE booking');
        $this->addSql('DROP TABLE model');
    }
}
