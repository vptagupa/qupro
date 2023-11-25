# QuPro

QuPro, is a queueing system designed to help school institutions efficiently serve their clients by streamlining the process of managing queues. It provides a user-friendly interface for both representative, students and school staff, optimizing wait times, and improving service delivery. With features such as real-time monitoring, and automated notifications, QuPro empowers institutions to create a seamless and organized experience for their clientele.

## Installation

### Requirements

```
PHP 8.1+
MariaDB 8.0+
Composer 2
Node 18.13+
```

### Installation

```
composer install
npm install
php artisan migrate
php artisan db:seed

# for production
npm run build
# for development mode
npm run dev
```

###

## Instructions

To login with default account, locate UserSeeder in database/seeders directory (use for development mode only).

To generate fake Qu's, execute this:

```
php artisan db:seed --class=FakeQuSeeder
```

### Real-Time Updates

Enable Pusher by filling up the Pusher API keys in .env file.

### Enable Print

Printing of tickets are executed through nodejs.

```
cd node
# Open index.js, update site origin of your laravel app hosting url
# Run
node index.js
# The printing service will automatically use the default printer in your computer
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
