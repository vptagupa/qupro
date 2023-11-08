<!DOCTYPE html> <html> <head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
@routes
@viteReactRefresh
@vite(['resources/app/js/app.jsx', 'resources/app/assets/scss/app.scss'])
@inertiaHead
</head>

<body
    class="text-slate-500 bg-gradient-to-l from-indigo-400 via-indigo-300 to-purple-400 from-50% via-20% to-30% antialiased">
    @inertia
</body>

</html>