<!DOCTYPE html> 
<html> 
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        @routes
        @viteReactRefresh
        @vite(['resources/app/js/app.jsx', 'resources/app/assets/scss/app.scss'])
        @inertiaHead
    </head>
    <body class="bg-slate-100 text-slate-500 antialiased">
        @inertia
    </body>
</html>