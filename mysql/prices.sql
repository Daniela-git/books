CREATE TABLE prices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_title VARCHAR(255),
    regular_price INT,
    current_price INT,
    percentage INT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (book_title) REFERENCES books(title)
);